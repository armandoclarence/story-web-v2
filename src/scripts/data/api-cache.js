import IndexedDBManager from '../utils/indexed-db-manager';
import { getAccessToken } from '../utils/auth';
import CONFIG from '../config';

const BASE_URL = CONFIG.BASE_URL;

export const fetchWithCache = async (endpoint, options = {}) => {
  const url = `${BASE_URL}/${endpoint}`;
  const token = getAccessToken();

  try {
    // Try network request
    const cache = await caches.open('api-cache-v1');
    await cache.delete(url);
    const tryResponse = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      cache: 'reload',
    });

    if (!tryResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const tryData = await tryResponse.json();
    // Cache successful response

    console.log('Caching successful response for:', url);
    let source;
    if(tryData.data) {
      source = {
        url,
        ...tryData,
        data: {
          ...tryData.data,
          listStory: tryData?.listStory?.map((story) => {
            const cachedStory = localStorage.getItem('favorites');
            const parseStory = JSON.parse(cachedStory);
            const isFavorite = parseStory ? !!parseStory.find((item) => item.id === story.id) : false;
            console.log(isFavorite);
            return { ...story, isFavorite };
          })
        },
        timestamp: Date.now(),
        type: 'story',
      }
    } else {
      source = {
        url,
        data: {
          ...tryData,
          listStory: tryData?.listStory?.map((story) =>({ ...story, isFavorite: false }))
        },
        timestamp: Date.now(),
        type: 'story',
      }
    }
    console.log(source);
    await IndexedDBManager.cacheAPIResponse(url, source);

    return { ok: true, ...source };
  } catch (error) {
    if (!navigator.onLine) {
      console.log('Offline - using cache for:', url);
      const cachedData = await IndexedDBManager.getFromAPICache(url);
      if (cachedData) {
        console.log('Found cached data after error for:', url);
        return { ok: true, ...cachedData, isFromCache: true };
      }
    }
    console.error('Fetch error:', error);
    return { ok: false, data: {error: error.message} };
  }
};
