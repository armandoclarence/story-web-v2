import { DB_CONFIG, initDB } from '../data/db';

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
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);

      const favorite = {
        storyId: story.id,
        story: story,
        timestamp: Date.now(),
        updatedAt: new Date().toISOString()
      };

      const request = store.put(favorite);

      request.onsuccess = () => {
        this.broadcastChange({ type: 'add', storyId: story.id });
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  static async removeFromFavorites(storyId) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);

      const request = store.delete(storyId);

      request.onsuccess = () => {
        this.broadcastChange({ type: 'remove', storyId });
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  static async getFavorites() {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readonly');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);

      const request = store.getAll();

      request.onsuccess = () => {
        const favorites = request.result.map(item => item.story);
        resolve(favorites);
      };
      request.onerror = () => reject(request.error);
    });
  }

  static async isFavorite(storyId) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readonly');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);

      const request = store.get(storyId);

      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => reject(request.error);
    });
  }

  static broadcastChange(change) {
    const bc = new BroadcastChannel('favorites-sync');
    bc.postMessage(change);
  }

  static async clearOldCache() {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readwrite');
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

  static async cacheAPIResponse(url, data, type = 'story') {
    const db = await this.init();
    
    try {
      // Store in IndexedDB first (always available)
      const transaction = db.transaction([DB_CONFIG.stores.apiCache], 'readwrite');
      const store = transaction.objectStore(DB_CONFIG.stores.apiCache);

      const entry = {
        url,
        data,
        type,
        timestamp: Date.now()
      };

      await new Promise((resolve, reject) => {
      const request = store.put(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Try Cache Storage if available
      if (this.#isCacheSupported()) {
        try {
          const cache = await caches.open(this.#CACHE_NAME);
          const response = new Response(JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'max-age=86400'
            }
          });
          await cache.put(url, response);
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
      const db = await this.init();
      const data = await new Promise((resolve, reject) => {
        const transaction = db.transaction([DB_CONFIG.stores.apiCache], 'readonly');
        const store = transaction.objectStore(DB_CONFIG.stores.apiCache);
      const request = store.get(url);

        request.onsuccess = () => resolve(request.result?.data || null);
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

  static async clearAPICache(maxAge = 24 * 60 * 60 * 1000) { // 24 hours by default
    try {
      const db = await this.init();
      
      // Clear old entries from IndexedDB
      const transaction = db.transaction([DB_CONFIG.stores.apiCache], 'readwrite');
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

  // Helper method to fetch with cache
  static async fetchWithCache(url, options = {}) {
    try {
      // Try to get from cache first
      const cachedData = await this.getFromAPICache(url);
      if (cachedData) {
        return cachedData;
      }

      // If not in cache, fetch from network
      const response = await fetch(url, options);
      const data = await response.json();

      // Cache the response
      await this.cacheAPIResponse(url, data);

      return data;
    } catch (error) {
      console.error('Error fetching with cache:', error);
      throw error;
    }
  }

  // Add this method to your IndexedDBManager class
  static async getAllFavorites() {
    try {
      const db = await this.init();
      
      // Get all favorites from IndexedDB
      const favorites = await new Promise((resolve, reject) => {
        const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readonly');
        const store = transaction.objectStore(DB_CONFIG.stores.favorites);
        const request = store.getAll();

        request.onsuccess = () => {
          const results = request.result.map(item => ({
            id: item.storyId,
            ...item.story,
            isFavorite: true,
            timestamp: item.timestamp,
            updatedAt: item.updatedAt
          }));

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

  // Add a method to sync favorites with server data
  static async syncFavorites(serverStories = []) {
    try {
      const favorites = await this.getAllFavorites();
      
      // Update existing favorites with server data
      const updatePromises = serverStories.map(async (serverStory) => {
        const existingFavorite = favorites.find(fav => fav.id === serverStory.id);
        if (existingFavorite) {
          return this.cacheAPIResponse(
            `https://story-api.dicoding.dev/v1/stories/${serverStory.id}`,
            {
              ...serverStory,
              isFavorite: true,
              favoriteTimestamp: existingFavorite.favoriteTimestamp,
              updatedAt: new Date().toISOString()
            }
          );
        }
      });

      await Promise.all(updatePromises);
      console.log('Favorites synced with server data');
    } catch (error) {
      console.error('Error syncing favorites:', error);
    }
  }

  static async getFavorite(storyId) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readonly');
      const store = transaction.objectStore(DB_CONFIG.stores.favorites);
      
      const request = store.get(storyId);

      request.onsuccess = () => {
        if (request.result) {
          resolve({
            id: request.result.storyId,
            ...request.result.story,
            isFavorite: true,
            timestamp: request.result.timestamp,
            updatedAt: request.result.updatedAt
          });
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }
}