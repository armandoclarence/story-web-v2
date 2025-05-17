export const pages = import.meta.glob('../pages/**/*.js');

export const routes = {
  '/login': {
    file: '../pages/auth/login/login-page.js',
    protected: false,
  },
  '/register': {
    file: '../pages/auth/register/register-page.js',
    protected: false,
  },
  '/': {
    file: '../pages/home/home-page.js',
    protected: true,
  },
  '/new': {
    file: '../pages/new/new-page.js',
    protected: true,
  },
  '/new-guest': {
    file: '../pages/new-guest/new-guest-page.js',
    protected: false,
  },
  '/stories/:id': {
    file: '../pages/story-detail/story-detail-page.js',
    protected: true,
  },
  '/favorites': {
    file: '../pages/favorites/favorites-page.js',
    protected: true,
  },
  '/404': {
    file: '../pages/not-found/not-found-page.js',
    protected: false,
  },
};

export function preloadRoutes(routePaths) {
  for (const path of routePaths) {
    const route = routes[path];
    if(route && pages[route.file]) {
      pages[route.file]();
    }
  }
}