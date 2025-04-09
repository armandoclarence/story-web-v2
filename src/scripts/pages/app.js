import { getActiveRoute } from '../routes/url-parser';
import {
  generateAuthenticatedNavigationListTemplate,
  generateMainNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
} from '../templates';
import { setupSkipToContent, transitionHelper } from '../utils';
import { getAccessToken, getLogout } from '../utils/auth';
import routes from '../routes/routes';
import Router from '../utils/router';
import FavoriteManager from '../utils/favorite-manager';
import NotificationManager from '../utils/notification-manager';
import { Workbox } from 'workbox-window';
import IndexedDBManager from '../utils/indexed-db-manager';
import * as StoryAPI from '../data/api';

export default class App {
  #content;
  #skipLinkButton;

  constructor({ content, skipLinkButton }) {
    this.#content = content;
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupNavigationList();
    this.#setupNotificationButton();
    NotificationManager.init(StoryAPI);
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navigationDrawer = document.getElementById('navigation-drawer');
    const navListMain = navigationDrawer?.children.namedItem('navlist-main');
    const navList = navigationDrawer?.children.namedItem('navlist');

    if (!isLogin) {
      if (navListMain) navListMain.innerHTML = '';
      if (navList) navList.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    }

    if (navListMain && navList) {
      navListMain.innerHTML = generateMainNavigationListTemplate();
      navList.innerHTML = generateAuthenticatedNavigationListTemplate();
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (confirm('Apakah Anda yakin ingin keluar?')) {
          getLogout();
          location.hash = '/login';
        }
      });
    }
  }

  async #setupNotificationButton() {
    const notificationContainer = document.getElementById('push-notification-container');
    if (!notificationContainer) return;

    const isSubscribed = await NotificationManager.checkSubscription();

    await NotificationManager.updateSubscribeButtonState(notificationContainer, isSubscribed);
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    const page = await route();
    if (!page) {
      this.#content.innerHTML = '<h1>404 Not Found</h1>';
      return;
    }

    // Prevent layout shifts during page transitions
    this.#content.style.opacity = '0';
    
    const transition = transitionHelper({
      updateDOM: async () => {
        // Scroll to top before content changes
        window.scrollTo(0, 0);
        
        // Update content
        this.#content.innerHTML = await page?.render();
        
        // Show content with smooth transition
        requestAnimationFrame(() => {
          this.#content.style.opacity = '1';
        });
        
        await page?.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(async () => {
      this.#setupNavigationList();
      await this.#setupNotificationButton();
    });
  }

  async initializeApp() {
    if ('serviceWorker' in navigator) {
      try {
        const wb = new Workbox('/sw.js', {
          scope: '/',
          type: 'module',
        });
        
        wb.addEventListener('waiting', () => {
          if (confirm('Ada konten baru tersedia! Klik OK untuk memperbarui.')) {
            wb.messageSkipWaiting();
            window.location.reload();
          }
        });

        await wb.register();
        console.log('Service Worker berhasil didaftarkan');
      } catch (error) {
        console.error('Gagal mendaftarkan Service Worker:', error);
      }
    }

    // Initialize FavoriteManager globally for offline access
    await FavoriteManager.init();

    // Initialize router
    this.router = Router;

    // Clear old cache entries periodically
    setInterval(() => {
      IndexedDBManager.clearOldCache();
    }, 60 * 60 * 1000); // Check every hour
  }
}