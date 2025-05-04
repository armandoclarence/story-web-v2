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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration()
    .then((registration) => {
      if (registration) {
        // Unregister the existing service worker if it exists
        registration.unregister().then(() => {
          console.log('Service worker unregistered');

          // Now register a new service worker immediately after unregistering
          navigator.serviceWorker.register(swUrl).then(reg => {
            console.log('Service worker registered:', reg);
            // Optional: subscribe to push notifications here
          }).catch(err => {
            console.error('Service worker registration failed:', err);
          });

          // Clear caches (delete all named caches)
          caches.keys()
            .then((names) => {
              for (const name of names) {
                caches.delete(name);
              }
            });
        });
      } else {
        console.log('No service worker registered yet.');

        // If no service worker was registered, just register a new one
        navigator.serviceWorker.register(swUrl).then(reg => {
          console.log('Service worker registered:', reg);
        }).catch(err => {
          console.error('Service worker registration failed:', err);
        });
      }
    })
    .catch(err => {
      console.error('Failed to get service worker registration:', err);
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