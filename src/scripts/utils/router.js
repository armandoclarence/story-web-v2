import CONFIG from '../config';
import routes from '../routes/routes';
import { getActiveRoute, parseActivePathname } from '../routes/url-parser';
import { getAccessToken } from './auth';
import IndexedDBManager from './indexed-db-manager';

class Router {
  constructor() {
    this.lastAttemptedHash = null;
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      this.handleRoute();
    });

    window.addEventListener('hashchange', () => {
      this.handleRoute();
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
  }

  async handleRoute() {
    const url = getActiveRoute();
    const urlSegments = parseActivePathname();
    
    try {
      // Check if route exists
      const route = routes[url];
      if (!route) {
        window.location.hash = '#/404';
        return;
      }

      const page = route();
      if (!page) {
        window.location.hash = '#/404';
        return;
      }

      // Handle offline state
      if (!navigator.onLine) {
        await this.handleOfflineRoute(urlSegments, page);
        return;
      }

      // Handle authentication
      const isAuthenticated = !!getAccessToken();
      if (page.requiresAuth && !isAuthenticated) {
        window.location.hash = '#/login';
        return;
      }

      if (page.requiresUnauth && isAuthenticated) {
        window.location.hash = '#/';
        return;
      }

      // Render page
      await this.renderPage(page);

    } catch (error) {
      console.error('Route handling error:', error);
      window.location.hash = '#/404';
    }
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
    await this.renderPage(page);
  }

  async checkCachedData(urlSegments) {
    try {
      if (urlSegments.resource === 'stories' && urlSegments.id) {
        return await IndexedDBManager.getFavorite(urlSegments.id);
      }
      
      if (urlSegments.resource === 'favorites') {
        return await IndexedDBManager.getAllFavorites();
      }

      return null;
    } catch (error) {
      console.error('Error checking cached data:', error);
      return null;
    }
  }

  async renderWithOfflineIndicator(page, cachedData) {
    this.showOfflineBanner();
    await this.renderPage(page, cachedData);
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

  async renderPage(page, cachedData = null) {
    const content = document.querySelector('#mainContent');
    if (!content) return;

    // Remove offline banner if online
    if (navigator.onLine) {
      const banner = document.querySelector('.offline-banner');
      if (banner) banner.remove();
    }

    // Use transition helper from your app.js
    content.style.opacity = '0';
    
    try {
      content.innerHTML = await page.render(cachedData);
      requestAnimationFrame(() => {
        content.style.opacity = '1';
      });
      
      if (page.afterRender) {
        await page.afterRender();
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      content.innerHTML = '<h1>Error loading page</h1>';
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