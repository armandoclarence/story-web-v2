import 'tiny-slider/dist/tiny-slider.css';
import 'leaflet/dist/leaflet.css';

import App from './pages/app';
import Camera from './utils/camera';
import Navigation from './utils/navigation';
import IndexedDBManager from './utils/indexed-db-manager';
import Router from "./utils/router";

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
    Camera.stopAllStreams();
  });

  // Initialize IndexedDB
  await IndexedDBManager.init();
});