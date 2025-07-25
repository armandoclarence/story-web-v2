import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const isProduction = mode === 'production';
  const base = isProduction ? '/story-web-v2/' : '/';

  return {
    server: {
      open: false, // Ensure the dev server opens automatically in the browser
      cors: true, // Allow cross-origin requests if necessary
      hmr: false,
      allowedHosts: [
        ".ngrok-free.app"
      ]
    },
    base,
    root: '.', // Set root to current directory
    build: {
      outDir: 'docs',
      emptyOutDir: true,
      cssCodeSplit: false, // This will combine all CSS into one file
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          filename: 'index.html'
        },
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.')[1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }
            return `assets/${extType}/[name][extname]`;
          },
          chunkFileNames: 'assets/js/[name].js',
          entryFileNames: 'assets/js/[name].js',
        },
      }
    },
    css: {
      // Generate a single CSS file
      postcss: {
        plugins: []
      }
    },
    optimizeDeps: {
      include: ['leaflet', 'tiny-slider']
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      VitePWA({
        strategies: 'injectManifest',
        injectRegister: 'auto',
        registerType: 'autoUpdate',
        filename: 'sw.js',
        devOptions: {
          enabled: true,
          type: 'module'
        },
        includeAssets: ['favicon.ico', 'robots.txt'],
        injectManifest: {
          globPatterns: [
            '**/*.{html,js,css,png,jpg,json,webmanifest}',
          ],
        },
        manifest: {
          name: 'Story Web',
          short_name: 'StoryWeb',
          start_url: base,
          id: base,
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#2193b0',
          scope: base,
          icons: [
            {
              src: `${base}favicon.ico`,
              sizes: '48x48',
              type: 'image/x-icon',
            },
            {
              src: `${base}icons/apple-touch-icon.png`,
              sizes: '180x180',
              type: 'image/png',
            },
            {
              src: `${base}icons/favicon-16x16.png`,
              sizes: '16x16',
              type: 'image/png',
            },
            {
              src: `${base}icons/favicon-32x32.png`,
              sizes: '32x32',
              type: 'image/png',
            },
            {
              src: `${base}icons/android-chrome-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: `${base}icons/android-chrome-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: `${base}icons/maskable.png`,
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
              form_factor: 'narrow',
              platform: ['android', 'ios', 'kaios', 'windows', 'windows10x', 'chrome_web_store', 'play', 'itunes', 'microsoft-inbox', 'microsoft-store']
            },
            {
              src: 'screenshots/mobile-story.png',
              sizes: '390x844',
              type: 'image/png',
              form_factor: 'narrow',
              platform: ['android', 'ios', 'kaios', 'windows', 'windows10x', 'chrome_web_store', 'play', 'itunes', 'microsoft-inbox', 'microsoft-store']
            },
            {
              src: 'screenshots/desktop-home.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              platform: ['windows', 'windows10x', 'macos', 'chrome_web_store', 'microsoft-inbox', 'microsoft-store']
            },
            {
              src: 'screenshots/desktop-story.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              platform: ['windows', 'windows10x', 'macos', 'chrome_web_store', 'microsoft-inbox', 'microsoft-store']
            }
          ],
          shortcuts: [
            {
              name: 'New Story',
              short_name: 'New',
              description: 'Tulis cerita baru sebagai pengguna',
              url: `${base}?source=pwa#/new`,
              icons: [{ src: 'icons/book.png', sizes: '128x128', type: 'image/png' }]
            },
            {
              name: 'New Story (Guest)',
              short_name: 'Guest',
              description: 'Tulis cerita sebagai tamu',
              url: `${base}?source=pwa#/new-guest`,
              icons: [{ src: 'icons/book.png', sizes: '128x128', type: 'image/png' }]
            },
            {
              'name': 'Favorite',
              'short_name': 'Favorite',
              'description': 'Lihat daftar cerita favorit.',
              'url': `${base}#?source=pwa/favorites`,
              'icons': [
                {
                  'src': 'icons/heart.png',
                  'type': 'image/png',
                  'sizes': '512x512'
                }
              ]
            }
          ]
        },
      })
    ]
  };
});