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
    this.isGitHubPages = window.location.hostname.includes('github.io');
    this.basePath = this.isGitHubPages ? '/story-web-v2' : '';
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

    this.registerServiceWorker();
    this.setupNavigationHandlers();
  }

    registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }

  // Method to register hash change callbacks
  onHashChange(callback) {
    this.hashChangeCallbacks.push(callback);
  }

  async handleRoute() {
    const url = getActiveRoute();
    const urlSegments = parseActivePathname();
    const isAuthenticated = !!getAccessToken();
    
    try {
      if (!isAuthenticated && url !== '/login') {
        window.location.hash = '#/login';
        return;
      }
      
      // If already authenticated and on login page, redirect to home
      if (isAuthenticated && url === '/login') {
        window.location.hash = '#/';
        return;
      }
      
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

      // Add touch event handling for mobile
      this.setupMobileNavigation();

      // Check authentication before offline check
      if (page.requiresAuth && !isAuthenticated) {
        window.location.hash = '#/login';
        return;
      }

      if (page.requiresUnauth && isAuthenticated) {
        window.location.hash = '#/';
        return;
      }

      if (!isAuthenticated && window.location.hash == '#/') {
        window.location.hash = '#/login';
        return;
      }

      if (!navigator.onLine) {
        // Only handle offline for authenticated pages that support it
        if (isAuthenticated && page.offlineSupport) {
          await this.handleOfflineRoute(urlSegments, page);
          return;
        }
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

  // Add this new method for mobile navigation
  setupMobileNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      // Remove existing listeners
      link.removeEventListener('touchstart', this.handleTouchStart);
      link.removeEventListener('touchend', this.handleTouchEnd);
      
      // Add touch event listeners
      link.addEventListener('touchstart', this.handleTouchStart);
      link.addEventListener('touchend', this.handleTouchEnd);
    });
  }

  handleTouchStart = (event) => {
    event.target.classList.add('active');
  };

  handleTouchEnd = (event) => {
    event.target.classList.remove('active');
    
    // Get the href or trigger click for buttons
    const link = event.target.closest('.nav-link');
    if (link) {
      event.preventDefault();
      if (link.tagName === 'A') {
        window.location.href = link.href;
      } else if (link.tagName === 'BUTTON') {
        link.click();
      }
    }
  };

  setupNavigationHandlers() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a, button.nav-link');
      if (!link) return;

      if (link.tagName === 'A' && link.getAttribute('href')?.startsWith('#')) {
        event.preventDefault();
        const hash = link.getAttribute('href');
        window.location.hash = hash;
      } else if (link.id === 'logout-button') {
        event.preventDefault();
        if (confirm('Apakah Anda yakin ingin keluar?')) {
          this.handleLogout();
        }
      }
    });
  }

  handleLogout() {
    // Implementasi handleLogout
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

/* Add these new styles */
.nav-link {
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  touch-action: manipulation;
}

.nav-link.active {
  opacity: 0.7;
}

@media (hover: none) {
  .nav-link:hover {
    opacity: 1;
  }
}

/* Fix for iOS devices */
.nav-item {
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default new Router();