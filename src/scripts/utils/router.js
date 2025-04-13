import routes from '../routes/routes';
import { getActiveRoute, parseActivePathname } from '../routes/url-parser';
import { getAccessToken } from './auth';
import IndexedDBManager from './indexed-db-manager';
import { transitionHelper } from '../utils';

class Router {
  constructor() {
    this.lastAttemptedHash = null;
    this.hashChangeCallbacks = [];
    this.content = null;
    this.app = null;
  }

  // Method to set the app instance
  setApp(app) {
    this.app = app;
    this.content = app.getContent();
  }

  init() {
    window.addEventListener('load', () => {
      this.handleRoute();
    });

    window.addEventListener('hashchange', async (event) => {
      event.preventDefault();
      await this.handleRoute();
      this.hashChangeCallbacks.forEach(callback => callback());
    });

    window.addEventListener('online', () => {
      document.body.classList.remove('offline-mode');
      if (this.lastAttemptedHash) {
        window.location.hash = this.lastAttemptedHash;
        this.lastAttemptedHash = null;
      }
    });

    window.addEventListener('offline', () => {
      document.body.classList.add('offline-mode');
      this.lastAttemptedHash = window.location.hash;
    });

    // Register service worker for both development and production
    this.registerServiceWorker();
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./sw.js', {
          scope: '/',
        });

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (confirm('Ada konten baru tersedia! Klik OK untuk memperbarui.')) {
                window.location.reload();
              }
            }
          });
        });

        console.log('Service Worker berhasil didaftarkan');
      } catch (error) {
        console.error('Gagal mendaftarkan Service Worker:', error);
      }
    }
  }

  // Method to register hash change callbacks
  onHashChange(callback) {
    this.hashChangeCallbacks.push(callback);
  }

  async handleRoute() {
    const url = getActiveRoute();
    const urlSegments = parseActivePathname();
    
    try {
      const route = routes[url];
      if (!route) {
        window.location.hash = '#/404';
        return;
      }

      const page = await route();
      if (!page) {
        window.location.hash = '#/404';
        return;
      }

      if (!navigator.onLine) {
        await this.handleOfflineRoute(urlSegments, page);
        return;
      }

      const isAuthenticated = !!getAccessToken();
      if (page.requiresAuth && !isAuthenticated) {
        window.location.hash = '#/login';
        return;
      }

      if (page.requiresUnauth && isAuthenticated) {
        window.location.hash = '#/';
        return;
      }

      await this.renderPageWithTransition(page);
      // Let the app handle navigation updates
      if (this.app) {
        this.app.updateNavigation();
      }

    } catch (error) {
      console.error('Route handling error:', error);
      window.location.hash = '#/404';
    }
  }

  async renderPageWithTransition(page, cachedData = null) {
    if (!this.content) return;

    if (navigator.onLine) {
      const banner = document.querySelector('.offline-banner');
      if (banner) banner.remove();
    }

    const transition = transitionHelper({
      updateDOM: async () => {
        window.scrollTo(0, 0);
        
        try {
          this.content.style.opacity = '0';
          this.content.innerHTML = await page.render(cachedData);
          
          requestAnimationFrame(() => {
            this.content.style.opacity = '1';
          });
          
          if (page.afterRender) {
            await page.afterRender();
          }
        } catch (error) {
          console.error('Error rendering page:', error);
          this.content.innerHTML = '<h1>Error loading page</h1>';
        }
      }
    });

    transition.ready.catch(console.error);
    return transition.updateCallbackDone;
  }

  async handleOfflineRoute(urlSegments, page) {
    // Check if page can work offline
    if (page.requiresOnline !== false) {
      // Check for cached data
      const cachedData = await this.checkCachedData(urlSegments);
      if (cachedData) {
        await this.renderWithOfflineIndicator(page, cachedData);
      }
      return;
    }

    // Page works offline, render normally
    await this.renderPageWithTransition(page);
  }

  async checkCachedData(urlSegments) {
    try {
      if (urlSegments.resource === 'stories' && urlSegments.id) {
        return await IndexedDBManager.getFavorite(urlSegments.id);
      }
      
      if (urlSegments.resource === 'favorites') {
        return await IndexedDBManager.getAllFavorites();
      }

      return true;
    } catch (error) {
      console.error('Error checking cached data:', error);
      return null;
    }
  }

  async renderWithOfflineIndicator(page, cachedData) {
    this.showOfflineBanner();
    await this.renderPageWithTransition(page, cachedData);
  }

  showOfflineBanner() {
    if (!document.querySelector('.offline-banner')) {
      const banner = document.createElement('div');
      banner.className = 'offline-banner';
      banner.innerHTML = `
        <div class="offline-banner__content">
          <i class="fas fa-wifi-slash"></i>
          <span>Anda sedang offline. Menampilkan konten tersimpan.</span>
          <button class="offline-banner__retry">Coba Lagi</button>
        </div>
      `;

      banner.querySelector('.offline-banner__retry').addEventListener('click', () => {
        window.location.reload();
      });

      document.body.insertBefore(banner, document.body.firstChild);
    }
  }
}

// Add styles
const styles = `
.offline-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f8d7da;
  padding: 12px;
  z-index: 1000;
  animation: slideDown 0.3s ease-out;
}

.offline-banner__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.offline-banner__retry {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.offline-banner__retry:hover {
  background-color: #c82333;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.offline-mode .online-only {
  display: none;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default new Router();