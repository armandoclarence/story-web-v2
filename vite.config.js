import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const base = isProduction ? '/story-web-v2/' : '/';
  return {
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'src', 'public'),
    base: base,
    plugins: [
      VitePWA({
        strategies: 'injectManifest',
        filename: 'sw.js',
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Story Web',
          short_name: 'StoryWeb',
          description: 'Platform untuk berbagi cerita dan pengalaman',
          theme_color: '#2193b0',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/#/',
          id: '/#/',
          scope: '/',
          categories: ['social', 'lifestyle'],
          icons: [
            {
              src: 'favicon.ico',
              sizes: '48x48',
              type: 'image/x-icon',
            },
            {
              src: 'icons/apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png',
            },
            {
              src: 'icons/favicon-16x16.png',
              sizes: '16x16',
              type: 'image/png',
            },
            {
              src: 'icons/favicon-32x32.png',
              sizes: '32x32',
              type: 'image/png',
            },
            {
              src: 'icons/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'icons/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'icons/maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            }
          ],
          screenshots: [
            {
              src: 'screenshots/mobile-home.png',
              sizes: '390x844',
              type: 'image/png',
              form_factor: "narrow",
              platform: ["android", "ios", "kaios", "windows", "windows10x", "chrome_web_store", "play", "itunes", "microsoft-inbox", "microsoft-store"]
            },
            {
              src: 'screenshots/mobile-story.png',
              sizes: '390x844',
              type: 'image/png',
              form_factor: "narrow",
              platform: ["android", "ios", "kaios", "windows", "windows10x", "chrome_web_store", "play", "itunes", "microsoft-inbox", "microsoft-store"]
            },
            {
              src: 'screenshots/desktop-home.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: "wide",
              platform: ["windows", "windows10x", "macos", "chrome_web_store", "microsoft-inbox", "microsoft-store"]
            },
            {
              src: 'screenshots/desktop-story.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: "wide",
              platform: ["windows", "windows10x", "macos", "chrome_web_store", "microsoft-inbox", "microsoft-store"]
            }
          ],
          shortcuts: [
            {
              name: 'New Story',
              short_name: 'New',
              description: 'Tulis cerita baru sebagai pengguna',
              url: '/?source=pwa#/new',
              icons: [{ src: 'icons/book.png', sizes: '128x128', type: 'image/png' }]
            },
            {
              name: 'New Story (Guest)',
              short_name: 'Guest',
              description: 'Tulis cerita sebagai tamu',
              url: '/?source=pwa#/new-guest',
              icons: [{ src: 'icons/book.png', sizes: '128x128', type: 'image/png' }]
            },
            {
              "name": "Favorite",
              "short_name": "Favorite",
              "description": "Lihat daftar cerita favorit.",
              "url": "/#?source=pwa/favorites",
              "icons": [
                {
                  "src": "icons/heart.png",
                  "type": "image/png",
                  "sizes": "512x512"
                }
              ]
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
          navigateFallback: isProduction ? '/story-web-v2/index.html' : '/index.html',
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/story-api\.dicoding\.dev\/v1\//,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 24 * 60 * 60
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true,
          type: 'module'
        }
      })
    ],
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'src/index.html')
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      allowedHosts: ["1f90-182-253-124-97.ngrok-free.app"],
      host: true, // Allow external access
      port: 5173,
    },
    worker: {
      format: 'es',
    },
  }
});
