importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js'
);

workbox.setConfig({
  debug: false
});

const { registerRoute, setCatchHandler } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { precacheAndRoute } = workbox.precaching;
const { ExpirationPlugin } = workbox.expiration;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

// Precache all assets generated by Vite
precacheAndRoute(self.__WB_MANIFEST || []);

// Register routes
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ],
  })
);

// API routes with Network First strategy
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      }),
      new BackgroundSyncPlugin('apiQueue', {
        maxRetentionTime: 24 * 60 // Retry for up to 24 hours
      })
    ],
  })
);

// Handle offline page for navigation requests
setCatchHandler(async ({ request }) => {
  if (request.mode === 'navigate') {
    // Check if it's an auth page
    if (request.url.includes('/login') || request.url.includes('/register')) {
      return new Response(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Offline - Story Web</title>
          <link rel="stylesheet" href="/css/style.css">
          <link rel="stylesheet" href="/css/offline.css">
          <link rel="manifest" href="/manifest.json">
          <meta name="theme-color" content="#2193b0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        </head>
        <body>
          <nav class="navbar">
            <div class="container">
              <a href="/" class="navbar-brand">
                <img src="/images/logo.png" alt="Story Web Logo" class="navbar-logo">
              </a>
              <ul class="navbar-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/favorites">Favorites</a></li>
                <li><a href="/login" class="active">Login</a></li>
              </ul>
            </div>
          </nav>

          <main>
            <section class="container">
              <div class="auth-container">
                <div class="offline-notice">
                  <div class="offline-icon">
                    <i class="fas fa-wifi-slash"></i>
                  </div>
                  <p class="offline-message">Anda sedang offline. Silakan periksa koneksi internet Anda untuk login atau register.</p>
                </div>
                <div class="auth-form">
                  <h2 class="auth-title">Login</h2>
                  <p class="auth-subtitle">Silakan periksa koneksi internet Anda untuk melanjutkan.</p>
                </div>
              </div>
            </section>
          </main>

          <footer class="footer">
            <div class="container">
              <p>&copy; 2024 Story Web. All rights reserved.</p>
            </div>
          </footer>
        </body>
        </html>
        `,
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }
    // For other pages, return the offline page
    return caches.match('/offline.html');
  }
  return Response.error();
});

// Background sync for failed requests
const bgSyncPlugin = new BackgroundSyncPlugin('storyWebQueue', {
  maxRetentionTime: 24 * 60, // Retry for up to 24 hours
});

// Handle push notifications
self.addEventListener('push', (event) => {
  let notificationData;
  try {
    notificationData = event.data.json();
  } catch (e) {
    notificationData = {
      title: 'New Story',
      options: {
        body: 'Someone shared a new story'
      }
    };
  }
  
  const options = {
    body: notificationData.options.body,
    icon: '/icon.png',
    badge: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'close',
        title: 'Tutup'
      }
    ],
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    event.notification.close();
  } else {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if ('focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow('/');
      })
    );
  }
});

// Add offline fallback
self.addEventListener('install', (event) => {
  const files = ['/offline.html'];
  event.waitUntil(
    caches.open('offline-cache').then((cache) => cache.addAll(files))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open('offline-cache').then((cache) => {
          return cache.match('/offline.html');
        });
      })
    );
  }
});

// Skip waiting and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!['stories-cache', 'images-cache', 'offline-cache'].includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
    ])
  );
});