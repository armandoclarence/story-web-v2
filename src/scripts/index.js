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
import { setupAuthSync } from './utils/auth';

setupAuthSync((type) => {
  if (type == 'login') {
    console.log('Login detected in another tab');
    window.location.hash = '/';
  } else if (type === 'logout') {
    console.log('Logout detected in another tab');
    window.location.hash = '/login';
  }
})

document.addEventListener('DOMContentLoaded', async () => {
  
  const app = new App({
    content: document.getElementById('main-content'),
    skipLinkButton: document.getElementById('skip-link'),
  });
  
  // Initialize the app
  await app.initializeApp();
  
  // Initialize IndexedDB
  await IndexedDBManager.init();

  // Initialize navigation
  Navigation.init();
  
  // Use the singleton Router to handle hash changes
  Router.onHashChange(() => {
    Navigation.init();
    Camera.stopAllStreams();
  });

});