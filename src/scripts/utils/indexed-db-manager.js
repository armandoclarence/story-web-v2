import { DB_CONFIG, initDB, syncStoriesFromApiCache } from '../data/db';

export default class IndexedDBManager {
  static #db = null;
  static #initialized = false;
  static #CACHE_NAME = 'api-cache-v1';

  static async init() {
    if (this.#initialized) return this.#db;
    
    try {
      this.#db = await initDB();
      this.#initialized = true;
      return this.#db;
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
      throw error;
    }
  }

  static async addToFavorites(story) {
    return new Promise(async (resolve, reject) => {
      const transaction = this.#db.transaction([DB_CONFIG.stores.favorites, DB_CONFIG.stores.apiCache], 'readwrite');
      const storeStories = transaction.objectStore(DB_CONFIG.stores.favorites);
      const storeCache = transaction.objectStore(DB_CONFIG.stores.apiCache);
      console.log(story);
      const favorite = {
        ...story,
        storyId: story.id,
        isFavorite: true,
        timestamp: Date.now(),
        updatedAt: new Date().toISOString()
      };

      const request = storeStories.put(favorite);

      request.onsuccess = () => {
        this.broadcastChange({ type: 'add', storyId: story.id });
        resolve(request.result);
      };
      request.onerror = () => reject(request.error);
      
      const cachedEntries = await new Promise((resolve, reject) => {
        const request = storeCache.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
      });
      
      for (const entry of cachedEntries) {
        try {
          if (entry.url.includes('/v1/stories')) {
            this.cacheAPIResponse(entry.url, entry, favorite.storyId);
          }
        } catch (err) {
          console.warn(`Failed to process apiCache entry ${entry.url}:`, err);
        }
      }
    });
  }
  
  static async removeFromFavorites(storyId) {
    return new Promise(async (resolve, reject) => {
      const transaction = this.#db.transaction([DB_CONFIG.stores.favorites, DB_CONFIG.stores.apiCache], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);
      const cacheStore = transaction.objectStore(DB_CONFIG.stores.apiCache);

      console.log(storyId);
      const exist = await store.get(storyId);

      exist.onsuccess = async () => {
        const cachedEntries = await new Promise((resolve, reject) => {
          const request = cacheStore.getAll();
          request.onsuccess = () => resolve(request.result);
          request.onerror = (event) => reject(event.target.error);
        });
        console.log(exist);
        const result = exist.result;
        const newStory = {
          ...result,
          isFavorite: false,
        }
        console.log(newStory);
        const request = store.put(newStory);
        request.onsuccess = () => {
          this.broadcastChange({ type: 'remove', storyId });
          resolve(request.result);
        };
        request.onerror = () => reject(request.error);
        for (const entry of cachedEntries) {
          try {
            if (entry.url.includes('/v1/stories')) {
              this.cacheAPIResponse(entry.url, entry, storyId);
            }
          } catch (err) {
            console.warn(`Failed to process apiCache entry ${entry.url}:`, err);
          }
        }
      }
    });
  }

  static async isFavorite(storyId) {
    return new Promise((resolve, reject) => {
      console.log(storyId);
      const transaction = this.#db.transaction([DB_CONFIG.stores.favorites], 'readonly');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);
      const request = store.get(storyId);

      request.onsuccess = () => {
        console.log(request.result);
        resolve(request.result.isFavorite)
      };
      request.onerror = () => reject(request.error);
    });
  }

  static broadcastChange(change) {
    const bc = new BroadcastChannel('favorites-sync');
    bc.postMessage(change);
  }

  static async clearOldCache() {
    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction([DB_CONFIG.stores.favorites], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);

      // Keep favorites for 30 days
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

      const request = store.openCursor();

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.timestamp < thirtyDaysAgo) {
            cursor.delete();
          }
          cursor.continue();
        }
      };

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Add method to listen for changes
  static listenToChanges(callback) {
    const bc = new BroadcastChannel('favorites-sync');
    bc.onmessage = (event) => {
      callback(event.data);
    };
    return () => bc.close(); // Return cleanup function
  }

  static #isCacheSupported() {
    return 'caches' in window && window.isSecureContext;
  }

  static async cacheAPIResponse(url, source, storyId = '', type = 'story') {
    
    try {
      // Store in IndexedDB first (always available)
      const transaction = this.#db.transaction([DB_CONFIG.stores.apiCache], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.apiCache);

      if(storyId) {
        source.data.listStory = source.data?.listStory.map((story) => storyId === story.id ? ({ ...story, isFavorite: !story.isFavorite }) : story);
      }
      
      const entry = {
        url,
        data: {
          ...source.data,
          listStory: source.data.listStory
        },
        type,
        timestamp: Date.now()
      };

      console.log(entry);
      if(entry.data?.listStory?.length === 0) return;

      await new Promise((resolve, reject) => {
        const request = store.put(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Try Cache Storage if available
      if (this.#isCacheSupported()) {
        try {
          const cache = await caches.open(this.#CACHE_NAME);
          const response = new Response(JSON.stringify(entry), {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'max-age=86400'
            }
          });
          console.log(response);
          await cache.put(url, response);
          await syncStoriesFromApiCache(this.#db);
          console.log('Cached in both IndexedDB and Cache Storage:', url);
        } catch (cacheError) {
          console.warn('Cache Storage failed, using IndexedDB only:', cacheError);
        }
      } else {
        console.log('Cache Storage not available, using IndexedDB only');
      }
    } catch (error) {
        console.error('Error caching API response:', error);
      throw error;
    }
  }

  static async getFromAPICache(url) {
    try {
      // Try Cache Storage if available
      if (this.#isCacheSupported()) {
        try {
          const cache = await caches.open(this.#CACHE_NAME);
          const response = await cache.match(url);
          
          if (response) {
            const data = await response.json();
            console.log('Found in Cache Storage:', url);
            return data;
          }
        } catch (cacheError) {
          console.warn('Cache Storage access failed:', cacheError);
        }
      }

      // Fallback to IndexedDB
      const data = await new Promise((resolve, reject) => {
        const transaction = this.#db.transaction([DB_CONFIG.stores.apiCache], 'readonly');
        const store = transaction.objectStore(DB_CONFIG.stores.apiCache);
        const request = store.get(url);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });

      if (data) {
        console.log('Found in IndexedDB:', url);
        return data;
      }

      return null;
    } catch (error) {
      console.error('Error fetching from cache:', error);
      return null;
    }
  }

  static async clearAPICache(hours = 24) { // 24 hours by default
    try {
      const maxAge = hours * 60 * 60 * 1000;
      // Clear old entries from IndexedDB
      const transaction = this.#db.transaction([DB_CONFIG.stores.apiCache], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.apiCache);
      const oldestAllowed = Date.now() - maxAge;

      await new Promise((resolve, reject) => {
        const request = store.openCursor();

        request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.timestamp < oldestAllowed) {
            cursor.delete();
          }
          cursor.continue();
          } else {
            resolve();
          }
        };

        request.onerror = () => reject(request.error);
      });

      // Clear Cache Storage
      const cache = await caches.open(this.#CACHE_NAME);
      const keys = await cache.keys();
      const deletePromises = keys.map(async (request) => {
        const response = await cache.match(request);
        const cacheDate = new Date(response.headers.get('date'));
        if (cacheDate.getTime() < oldestAllowed) {
          return cache.delete(request);
        }
      });

      await Promise.all(deletePromises);
      console.log('API cache cleared successfully');
    } catch (error) {
      console.error('Error clearing API cache:', error);
    }
  }

  // Add this method to your IndexedDBManager class
  static async getAllFavorites() {
    try {
      
      // Get all favorites from IndexedDB
      const favorites = await new Promise((resolve, reject) => {
        const transaction = this.#db.transaction([DB_CONFIG.stores.favorites], 'readonly');
        const store = transaction.objectStore(DB_CONFIG.stores.favorites);
        const request = store.getAll();

        request.onsuccess = () => {
          console.log(request.result);
          const results = request.result.filter(item => item.isFavorite);

          // Sort by timestamp, newest first
          results.sort((a, b) => b.timestamp - a.timestamp);
          resolve(results);
        };
        request.onerror = () => reject(request.error);
      });

      return favorites;
    } catch (error) {
      console.error('Error getting all favorites:', error);
      return [];
    }
  }

  static async getFavorite(storyId) {
    return new Promise((resolve, reject) => {
      console.log("DB instance:", this.#db);
      console.log("Favorites store:", DB_CONFIG.stores.favorites);
      const transaction = this.#db.transaction([DB_CONFIG.stores.favorites], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);
      
      console.log(storyId);
      const request = store.get(storyId);
  
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          resolve({
            ...result,
            timestamp: result.timestamp,
            updatedAt: result.updatedAt
          });
        } else {
          resolve(null); // Not found
        }
      };
  
      request.onerror = () => reject(request.error);
    });
  }
}