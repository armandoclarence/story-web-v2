import IndexedDBManager from "../utils/indexed-db-manager";

const DB_NAME = 'StoryAppDB';
const STORE_NAME = 'favorites';
const DB_VERSION = 2;
const API_CACHE_STORE_NAME = 'apiCache';
const CACHE_NAME = 'api-cache-v1';

export function initDB() {
  return new Promise((resolve, reject) => {
    console.log('Opening IndexedDB...'); // Debug log
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      console.log('Database upgrade needed...'); // Debug log
      const db = event.target.result;
      
      // Log existing object stores
      console.log('Existing stores:', Array.from(db.objectStoreNames));
      
      // Create favorites store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        console.log('Creating favorites store...'); // Debug log
        const favoritesStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        favoritesStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }

      // Create apiCache store if it doesn't exist
      if (!db.objectStoreNames.contains(API_CACHE_STORE_NAME)) {
        console.log('Creating apiCache store...'); // Debug log
        try {
          const apiStore = db.createObjectStore(API_CACHE_STORE_NAME, { 
            keyPath: 'url' 
          });
          apiStore.createIndex('timestamp', 'timestamp', { unique: false });
          apiStore.createIndex('type', 'type', { unique: false });
          console.log('API Cache store created successfully');
        } catch (error) {
          console.error('Error creating apiCache store:', error);
        }
      }

      // Verify stores after creation
      console.log('Final stores:', Array.from(db.objectStoreNames));
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      // Verify stores are present
      const stores = Array.from(db.objectStoreNames);
      console.log('Database opened successfully. Available stores:', stores);
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
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function addStory(story) {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
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
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.get(id);
    
    request.onsuccess = async () => {
      if (request.result) {
        const deleteRequest = store.delete(request.result.id);
        
        deleteRequest.onsuccess = async () => {
          try {
            // Remove from Workbox cache
            const cache = await caches.open(CACHE_NAME);
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
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
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
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
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