import { getAccessToken } from '../utils/auth';
import CONFIG from '../config';
import { fetchWithCache } from './api-cache';
import * as DB from './db';
import IndexedDBManager from '../utils/indexed-db-manager';
import { createFormData } from '../utils';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,

  STORY_LIST: `${CONFIG.BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
  STORE_NEW_STORY: `${CONFIG.BASE_URL}/stories`,
  STORE_NEW_STORY_GUEST: `${CONFIG.BASE_URL}/stories/guest`,

  SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export const getStories = async ({ page = 1, size = 10 } = {}) => {
  return fetchWithCache(`stories?page=${page}&size=${size}`);
};

export const getStoryById = async (db, storyId) => {
  try {
    console.log(storyId);
    const accessToken = getAccessToken();
    let response;
    response = await DB.getStoryById(db, storyId);
    if (!response) {
      response = await fetch(ENDPOINTS.STORY_DETAIL(storyId), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
    console.log(response);
    return { ok: true, story: response};
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

export async function storeNewStory(data) {
  const accessToken = getAccessToken();

  const formData = createFormData({
    description: data.description,
    photo: data.photo,
    lat: data?.lat,
    lon: data?.lon,
  })

  const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_STORY, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function storeNewStoryGuest(data) {
  const accessToken = getAccessToken();

  const formData = createFormData({
    description: data.description,
    photo: data.photo,
    lat: data?.lat,
    lon: data?.lon,
  })

  const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_STORY_GUEST, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const accessToken = getAccessToken();
  const subscriptionData = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: subscriptionData,
  });

  const json = await fetchResponse.json();
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
  });

  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function saveStory(db, storyId) {
  try {
    console.log(storyId);
    const response = await getStoryById(db, storyId);
    console.log(response);
    await IndexedDBManager.addToFavorites(response.story);

    return { ok: true, response};
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function removeStory(storyId) {
  try {
    console.log(storyId);
    await IndexedDBManager.removeFromFavorites(storyId);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}