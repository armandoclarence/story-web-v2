import IndexedDBManager from "../utils/indexed-db-manager";

export const DB_CONFIG = {
  name: 'StoryAppDB',
  version: 2,
  stores: {
    favorites: 'favorites',
    apiCache: 'apiCache'
  }
};

export function initDB() {
  return new Promise((resolve, reject) => {
    console.log('Opening IndexedDB...');
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

    request.onupgradeneeded = (event) => {
      console.log('Database upgrade needed...');
      const db = event.target.result;
      
      // Log existing object stores
      console.log('Existing stores:', Array.from(db.objectStoreNames));
      
      // Create favorites store if it doesn't exist
      if (!db.objectStoreNames.contains(DB_CONFIG.stores.favorites)) {
        console.log('Creating favorites store...');
        const favoritesStore = db.createObjectStore(DB_CONFIG.stores.favorites, { 
          keyPath: 'storyId'
        });
        favoritesStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }

      // Create apiCache store if it doesn't exist
      if (!db.objectStoreNames.contains(DB_CONFIG.stores.apiCache)) {
        console.log('Creating apiCache store...');
        const apiStore = db.createObjectStore(DB_CONFIG.stores.apiCache, { 
          keyPath: 'url' 
        });
        apiStore.createIndex('timestamp', 'timestamp', { unique: false });
        apiStore.createIndex('type', 'type', { unique: false });
      }

      console.log('Final stores:', Array.from(db.objectStoreNames));
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log('Database opened successfully. Available stores:', Array.from(db.objectStoreNames));
      resolve(db);
    };

    request.onerror = (event) => {
      console.error('Error initializing IndexedDB:', event.target.error);
      reject(event.target.error);
    };

    request.onblocked = (event) => {
      console.warn('Database opening blocked. Please close other tabs and reload.');
      alert('Please close all other tabs with this site open and reload this page.');
    };
  });
}

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(DB_CONFIG.stores.favorites)) {
        db.createObjectStore(DB_CONFIG.stores.favorites, { keyPath: 'storyId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function addStory(story) {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readwrite');
    const store = transaction.objectStore(DB_CONFIG.stores.favorites);
    
    // Store complete story data
    const favoriteEntry = {
      ...story,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const request = store.put(favoriteEntry);

    request.onsuccess = async () => {
      // Also cache in the service worker cache
      try {
        const cache = await caches.open('api-cache-v1');
        const response = new Response(JSON.stringify({ story }), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await cache.put(`https://story-api.dicoding.dev/v1/stories/${story.id}`, response);
      } catch (error) {
        console.warn('Failed to cache story:', error);
      }
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error adding favorite:', event.target.error);
      reject(event.target.error);
    };
  });
}

export async function removeStoryById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const transaction = db.transaction([DB_CONFIG.stores.favorites], 'readwrite');
    const store = transaction.objectStore(DB_CONFIG.stores.favorites);
    
    const request = store.get(id);
    
    request.onsuccess = async () => {
      if (request.result) {
        const deleteRequest = store.delete(request.result.id);
        
        deleteRequest.onsuccess = async () => {
          try {
            // Remove from Workbox cache
            const cache = await caches.open('api-cache-v1');
            await cache.delete(`/api/stories/${id}`);
            
            // Broadcast the change
            IndexedDBManager.broadcastChange({
              type: 'remove',
              storyId: id
            });
            
            resolve();
          } catch (error) {
            console.warn('Failed to remove from cache:', error);
            resolve(); // Still resolve as IndexedDB operation succeeded
          }
        };

        deleteRequest.onerror = (event) => {
          console.error('Error deleting from IndexedDB:', event.target.error);
          reject(event.target.error);
        };
      } else {
        resolve();
      }
    };
    
    request.onerror = (event) => {
      console.error('Error accessing IndexedDB:', event.target.error);
      reject(event.target.error);
    };
  });
}

export async function getAllStories() {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const tx = db.transaction(DB_CONFIG.stores.favorites, 'readonly');
    const store = tx.objectStore(DB_CONFIG.stores.favorites);
    const stories = await store.getAll();
    db.close();
    stories.onsuccess = () => {
      console.log('stories', stories.result);
      resolve(stories.result);
    }

    stories.onerror = (event) => {
      console.error('Error getting all stories:', event.target.error);
      reject(event.target.error);
    }
  });
}

export async function getStoryById(id) {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const tx = db.transaction(DB_CONFIG.stores.favorites, 'readonly');
    const store = tx.objectStore(DB_CONFIG.stores.favorites);
    
    const request = store.get(id);
    
    request.onsuccess = () => {
      console.log('story', request.result);
      resolve(request.result);
    };
    
    request.onerror = (event) => {
      console.error('Error getting story by id:', event.target.error);
      reject(event.target.error);
    };
  });
}

export async function isFavorite(id) {
  return (await getStoryById(id)) !== undefined;
}

export async function toggleFavorite(story) {
  if (await isFavorite(story.id)) {
    await removeStoryById(story.id);
  } else {
    await addStory(story);
  }
}