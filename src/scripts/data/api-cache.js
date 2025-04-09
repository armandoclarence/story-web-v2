import IndexedDBManager from '../utils/indexed-db-manager';
import { getAccessToken } from '../utils/auth';
import CONFIG from '../config';

const BASE_URL = CONFIG.BASE_URL;

export const fetchWithCache = async (endpoint, options = {}) => {
  const url = `${BASE_URL}/${endpoint}`;
  const token = getAccessToken();

  // If offline, try cache first
  if (!navigator.onLine) {
    console.log('Offline - checking cache for:', url);
    const cachedData = await IndexedDBManager.getFromAPICache(url);
    if (cachedData) {
      console.log('Found cached data for:', url);
      return { ok: true, ...cachedData, isFromCache: true };
    }
    return { ok: false, error: 'Offline and no cached data available' };
  }

  try {
    // Try network request
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Cache successful response
    console.log('Caching successful response for:', url);
    await IndexedDBManager.cacheAPIResponse(url, data);

    return { ok: true, ...data };
  } catch (error) {
    console.error('Fetch error:', error);
    
    // On error, try cache
    console.log('Trying cache after fetch error for:', url);
    const cachedData = await IndexedDBManager.getFromAPICache(url);
    if (cachedData) {
      console.log('Found cached data after error for:', url);
      return { ok: true, ...cachedData, isFromCache: true };
    }
    
    return { ok: false, error: error.message };
  }
};
