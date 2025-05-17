import { getActiveRoute } from '../routes/url-parser';
import CONFIG from '../config';

export function getAccessToken() {
  try {
    const accessToken = localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);

    if (accessToken === null || accessToken === 'undefined') {
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error('getAccessToken: error:', error);
    return null;
  }
}

export function putAccessToken(token) {
  try {
    localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('putAccessToken: error:', error);
    return false;
  }
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('getLogout: error:', error);
    return false;
  }
}

const unauthenticatedRoutesOnly = ['/login', '/register'];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getAccessToken();

  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    location.hash = '/';
    return null;
  }

  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getAccessToken();
  if (!isLogin) {
    location.hash = '/login';
    return null;
  }

  return page;
}

export function getLogout() {
  removeAccessToken();
  window.broadcastAuth('logout');
}

export function setupAuthSync(onAuthChange) {
  const handleMessage = (type) => {
    if (type === 'login' || type === 'logout') {
      onAuthChange(type);
    }
  }

  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel('auth');
    channel.onmessage = (event) => handleMessage(event.data);

    return (type) => channel.postMessage(type);
  } else {
    window.addEventListener('storage', (event) => {
      if (event.key === 'auth-event') {
        handleMessage(event.newValue);
      }
    });

    return (type) => localStorage.setItem('auth-event', type);
  }
}

const broadcastAuth = setupAuthSync ((type) => {
  if (type == 'login') {
    console.log('Login detected in another tab');
    window.location.reload();
  } else if (type === 'logout') {
    console.log('Logout detected in another tab');
    window.location.hash = '/login';
  }
});

window.broadcastAuth = broadcastAuth;