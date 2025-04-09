import 'tiny-slider/dist/tiny-slider.css';
import 'leaflet/dist/leaflet.css';

import App from './pages/app';
import Camera from './utils/camera';
import Navigation from './utils/navigation';
import IndexedDBManager from './utils/indexed-db-manager';
import * as StoryAPI from './data/api';
import NotificationManager from './utils/notification-manager';
document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    skipLinkButton: document.getElementById('skip-link'),
  });

  await app.renderPage(); 

  Navigation.init();
  NotificationManager.init(StoryAPI);

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
    Navigation.updateActiveLink();
    Camera.stopAllStreams();
  });

  await IndexedDBManager.init();
});