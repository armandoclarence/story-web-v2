import 'tiny-slider/dist/tiny-slider.css';
import 'leaflet/dist/leaflet.css';
import '../styles/main.css';
/* Import other stylesheets */
import '../styles/common.css';
import '../styles/story-item.css';
import '../styles/story-detail.css';
import '../styles/new-form.css';

import App from './pages/app';
import Camera from './utils/camera';
import Navigation from './utils/navigation';
import IndexedDBManager from './utils/indexed-db-manager';
import Router from "./utils/router";

// Check if Service Worker is supported in the browser
const swUrl = `${import.meta.env.BASE_URL}sw.js`;

async function resetAndRegisterServiceWorker() {
  if(!('serviceWorker' in navigator)) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(reg => reg.update()));
    console.log('All service workers updated.');

    const registration = await navigator.serviceWorker.register(swUrl);
    await registration.update();
    console.log('New service worker registered:', registration);
  } catch (err) {
    console.error('Service worker reset failed:', err);
  }
}

resetAndRegisterServiceWorker();

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    skipLinkButton: document.getElementById('skip-link'),
  });
  // Initialize IndexedDB
  await IndexedDBManager.init();
  await IndexedDBManager.clearAPICache();

  // Initialize the app
  await app.initializeApp();

  // Initialize navigation
  Navigation.init();
  
  // Use the singleton Router to handle hash changes
  Router.onHashChange(() => {
    Navigation.init();
    Camera.stopAllStreams();
  });

});