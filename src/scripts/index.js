import 'tiny-slider/dist/tiny-slider.css';
import 'leaflet/dist/leaflet.css';
import '../styles/main.css';

import App from './pages/app';
import Camera from './utils/camera';
import Navigation from './utils/navigation';
import IndexedDBManager from './utils/indexed-db-manager';
import Router from "./utils/router";

// Check if Service Worker is supported in the browser
const swUrl = `${import.meta.env.BASE_URL}sw.js`;

if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then(reg => {
      console.log('SW registered:', reg);

      // Optional: subscribe to push notifications here
    }).catch(err => {
      console.error('Service worker registration failed:', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    skipLinkButton: document.getElementById('skip-link'),
  });

  // Initialize the app
  await app.initializeApp();

  // Initialize navigation
  Navigation.init();
  
  // Use the singleton Router to handle hash changes
  Router.onHashChange(() => {
    Navigation.init();
    Camera.stopAllStreams();
  });

  // Initialize IndexedDB
  await IndexedDBManager.init();
});