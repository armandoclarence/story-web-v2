import * as DB from '../data/db';

export default class IndexedDBManager {
  static #dbName = 'StoryAppDB';
  static #dbVersion = 2;
  static #stores = {
    favorites: 'favorites',
    apiCache: 'apiCache' // New store for API cache
  };
  static #db = null;
  static #initialized = false;
  static #CACHE_NAME = 'api-cache-v1';

  static async init() {
    if (this.#initialized) return;

    await this.#initializeIndexedDB();
    this.#initialized = true;
  }

  static async #initializeIndexedDB() {
    this.#db = await DB.initDB();
  }

  static async #syncWithCache() {
    try {
      const cache = await caches.open(this.#CACHE_NAME);
      const cachedRequests = await cache.keys();
      
      for (const request of cachedRequests) {
        const transaction = this.#db.transaction([this.#stores.favorites], 'readonly');
        const store = transaction.objectStore(this.#stores.favorites);
        const storyId = request.url.split('/').pop();
        const dbRequest = await new Promise(async (resolve, reject) => {
          const req = store.get(storyId);
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(req.error);
        });


        if (!dbRequest) {
          await cache.delete(request);
        }
      }
    } catch (error) {
      console.warn('Failed to sync cache with IndexedDB:', error);
    }
  }

  static async addFavorite(story) {
    if (!this.#initialized) {
      await this.init();
    }
    
    try {
      await DB.addStory(story);
      await this.#syncWithCache();
      console.log('Story added to favorites:', story);
      return true; // Return true to confirm deletion
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  static async removeFavorite(storyId) {
    if (!this.#initialized) {
      await this.init();
    }
    
    try {
      await DB.removeStoryById(storyId);
      await this.#syncWithCache();
      console.log('Story removed from favorites:', storyId);
      return true; // Return true to confirm deletion
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  static broadcastChange(change) {
    // Use BroadcastChannel to notify other tabs/windows
    const bc = new BroadcastChannel('favorites-sync');
    bc.postMessage(change);
  }

  static async getAllFavorites() {
    if (!this.#initialized) {
      await this.init();
    }
    
    try {
      // Get from IndexedDB first
      const favorites = await DB.getAllStories();
      
      // If online, try to sync with server
      if (navigator.onLine) {
        try {
          await this.#syncWithCache();
        } catch (error) {
          console.warn('Failed to sync with cache:', error);
        }
      }
      
      return favorites || [];
    } catch (error) {
      console.error('Error getting all favorites:', error);
      return [];
    }
  }

  static async isFavorite(storyId) {
    if (!this.#initialized) {
      await this.init();
    }
    return await DB.isFavorite(storyId);
  }

  static async getFavorite(storyId) {
    if (!this.#initialized) {
      await this.init();
    }

    try {
      // Try IndexedDB first
      const favorite = await this.#getFromIndexedDB(storyId);
      console.log('favorite', favorite);
      if (favorite) return favorite;

      // If online, try cache
      if (navigator.onLine) {
        const cache = await caches.open(this.#CACHE_NAME);
        const response = await cache.match(`/api/stories/${storyId}`);
        if (response) {
          const story = await response.json();
          return story;
        }
      }

      return null;
    } catch (error) {
      console.error('Error getting favorite:', error);
      return null;
    }
  }

  static async #getFromIndexedDB(storyId) {
    return await DB.getStoryById(storyId);
  }

  // New methods for API caching
  static async cacheAPIResponse(url, data, type = 'story') {
    if (!this.#initialized) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction([this.#stores.apiCache], 'readwrite');
      const store = transaction.objectStore(this.#stores.apiCache);

      const entry = {
        url,
        data,
        type,
        timestamp: new Date().toISOString()
      };

      console.log('Caching API response:', entry); // Debug log

      const request = store.put(entry);

      request.onsuccess = () => {
        console.log('Successfully cached API response for:', url);
        resolve();
      };
      request.onerror = (error) => {
        console.error('Error caching API response:', error);
        reject(error);
      };
    });
  }

  static async getFromAPICache(url) {
    if (!this.#initialized) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction([this.#stores.apiCache], 'readonly');
      const store = transaction.objectStore(this.#stores.apiCache);
      
      console.log('Fetching from API cache:', url); // Debug log

      const request = store.get(url);

      request.onsuccess = () => {
        const result = request.result?.data || null;
        console.log('API cache result for', url, ':', result ? 'Found' : 'Not found');
        resolve(result);
      };
      request.onerror = (error) => {
        console.error('Error fetching from API cache:', error);
        reject(error);
      };
    });
  }

  // Method to clear old cache entries
  static async clearOldCache(maxAge = 24 * 60 * 60 * 1000) { // Default 24 hours
    if (!this.#initialized) await this.init();

    const transaction = this.#db.transaction([this.#stores.apiCache], 'readwrite');
    const store = transaction.objectStore(this.#stores.apiCache);
    const index = store.index('timestamp');
    const oldDate = new Date(Date.now() - maxAge).toISOString();

    const request = index.openCursor(IDBKeyRange.upperBound(oldDate));

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        store.delete(cursor.primaryKey);
        cursor.continue();
      }
    };
  }

  static async verifyDatabaseStructure() {
    if (!this.#initialized) {
      await this.init();
    }
    
    return new Promise((resolve) => {
      const transaction = this.#db.transaction([this.#stores.apiCache], 'readonly');
      const store = transaction.objectStore(this.#stores.apiCache);
      
      console.log('Database structure verification:');
      console.log('- Database name:', this.#dbName);
      console.log('- Database version:', this.#dbVersion);
      console.log('- Available stores:', Array.from(this.#db.objectStoreNames));
      console.log('- ApiCache store indexes:', Array.from(store.indexNames));
      
      resolve(true);
    }).catch(error => {
      console.error('Database verification failed:', error);
      return false;
    });
  }

  static async forceUpgrade() {
    // First, delete the existing database
    await new Promise((resolve) => {
      const deleteRequest = indexedDB.deleteDatabase(this.#dbName);
      deleteRequest.onsuccess = () => {
        console.log('Database deleted successfully');
        resolve();
      };
      deleteRequest.onerror = () => {
        console.error('Error deleting database');
        resolve();
      };
    });

    // Reinitialize with new version
    this.#initialized = false;
    await this.init();
    return this.verifyDatabaseStructure();
  }
}