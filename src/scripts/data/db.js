import { storeNewStory, storeNewStoryGuest } from "./api";
import { getAccessToken } from "../utils/auth";

export const DB_CONFIG = {
  name: 'StoryAppDB',
  version: 4,
  stores: {
    favorites: 'favorites',
    apiCache: 'apiCache',
    postQueue: 'postQueue',
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

      if (!db.objectStoreNames.contains(DB_CONFIG.stores.postQueue)) {
        console.log('Creating postQueue store...');
        db.createObjectStore(DB_CONFIG.stores.postQueue, {
          keyPath: 'id',
          autoIncrement: true,
        });
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

export async function getStoryById(db, storyId) {
  const tx = db.transaction([DB_CONFIG.stores.favorites], 'readonly');
  const store = tx.objectStore(DB_CONFIG.stores.favorites);
  const request = store.get(storyId);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      console.log(request);
      resolve(request.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function syncStoriesFromApiCache(db) {
  const tx = db.transaction([DB_CONFIG.stores.apiCache], 'readonly');
  const cacheStore = tx.objectStore(DB_CONFIG.stores.apiCache);

  const cachedEntries = await new Promise((resolve, reject) => {
    const request = cacheStore.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });

  for (const entry of cachedEntries) {
    try {
      if (entry.url.includes('/v1/stories')) {
        const json = typeof entry.data === 'string' ? JSON.parse(entry.data) : entry.data;
        const stories = json.listStory;
        await saveStoriesToStore(db, stories);
      }
    } catch (err) {
      console.warn(`Failed to process apiCache entry ${entry.url}:`, err);
    }
  }

  console.log('All data moved from cache to stories store');
}

export async function queuePost(db, postData) {
  const tx = db.transaction([DB_CONFIG.stores.postQueue], 'readwrite');
  const store = tx.objectStore(DB_CONFIG.stores.postQueue);
  store.add(postData);
  await tx.oncomplete;
}

export async function retryQueuedPosts(db) {
  const tx = db.transaction([DB_CONFIG.stores.postQueue], 'readwrite');
  const store = tx.objectStore(DB_CONFIG.stores.postQueue);

  const accessToken = getAccessToken();

  const posts = await new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  if(posts.length === 0) return;

  for (const post of posts) {
    try {
      let response = {};
      if(accessToken) {
        if (post.type === 'new') {
          response = await storeNewStory(post);
        }
      }
      
      if(!accessToken) {
        response.ok = false;
      }

      if (post.type === 'new-guest') {
        response = await storeNewStoryGuest(post);
      } 
      console.log(response);
      if (response.ok) {
        await deleteQueuePost(db, post.id); // this still works because `tx` is open
      }
    } catch (error) {
      console.error('Retry post error:', error);
    }
  }

  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = (event) => reject(event.target.error);
  });
}

async function deleteQueuePost(db, id) {
  const tx = db.transaction([DB_CONFIG.stores.postQueue], 'readwrite');
  const store = tx.objectStore(DB_CONFIG.stores.postQueue);

  store.delete(id);

  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = (event) => reject(event.target.error);
  });
}

async function saveStoriesToStore(db, stories = []) {
  const tx = db.transaction([DB_CONFIG.stores.favorites], 'readwrite');
  const store = tx.objectStore(DB_CONFIG.stores.favorites);

  for (const story of stories) {
    store.put({...story, storyId: story.id});
  }

  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = (event) => reject(event.target.error);
  });
}