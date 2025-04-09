import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from '../utils/auth';
import { loadPage } from '../utils';

const routes = {
  '/login': () => loadPage(() => import('../pages/auth/login/login-page'), checkUnauthenticatedRouteOnly),
  '/register': () => loadPage(() => import('../pages/auth/register/register-page'), checkUnauthenticatedRouteOnly),

  '/': () => loadPage(() => import('../pages/home/home-page'), checkAuthenticatedRoute),
  '/new': () => loadPage(() => import('../pages/new/new-page'), checkAuthenticatedRoute),
  '/new-guest': () => loadPage(() => import('../pages/new-guest/new-guest-page'), checkUnauthenticatedRouteOnly),
  '/stories/:id': () => loadPage(() => import('../pages/story-detail/story-detail-page'), checkAuthenticatedRoute),
  '/favorites': () => loadPage(() => import('../pages/favorites/favorites-page'), checkAuthenticatedRoute),
  '/404': () => loadPage(() => import('../pages/not-found/not-found-page'), checkUnauthenticatedRouteOnly),
};

export default routes;
