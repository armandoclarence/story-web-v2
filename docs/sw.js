importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js");workbox.setConfig({debug:!0});const{registerRoute:n,setCatchHandler:g}=workbox.routing,{CacheFirst:i,NetworkFirst:r,StaleWhileRevalidate:h}=workbox.strategies,{precacheAndRoute:d}=workbox.precaching,{ExpirationPlugin:o}=workbox.expiration,{CacheableResponsePlugin:a}=workbox.cacheableResponse,{BackgroundSyncPlugin:f}=workbox.backgroundSync;d([{"revision":null,"url":"assets/api-mapper-CQB0irkl.js"},{"revision":null,"url":"assets/favorites-page-JTTTVq1s.js"},{"revision":null,"url":"assets/form-templates-CE6QAyK3.js"},{"revision":null,"url":"assets/home-page-BCqDnYCC.js"},{"revision":null,"url":"assets/index-BJyeh9m-.css"},{"revision":null,"url":"assets/index-DuSjLy-A.js"},{"revision":null,"url":"assets/login-page-CrpfHlnK.js"},{"revision":null,"url":"assets/map-BAMOfZFV.js"},{"revision":null,"url":"assets/new-guest-page-BEWpNUic.js"},{"revision":null,"url":"assets/new-page-Cg2mzRWF.js"},{"revision":null,"url":"assets/not-found-page-BfB1IYE1.js"},{"revision":null,"url":"assets/register-page-D2l72Dii.js"},{"revision":null,"url":"assets/story-detail-page-M1Etcs-9.js"},{"revision":null,"url":"assets/tiny-slider-vO41T4hq.js"},{"revision":null,"url":"assets/ui-templates-4hofMUCo.js"},{"revision":"2e1423769784db6e4329bf88f2653f4a","url":"css/offline.css"},{"revision":"d52adcf6b14b9c8de529b9a95dbbf676","url":"css/styles/common.css"},{"revision":"1f36c68756656310292a7993023dfd3a","url":"css/styles/main.css"},{"revision":"e2cccd5984b51e00e2864d005540aba6","url":"css/styles/new-form.css"},{"revision":"5c662b755531d7523065aafe9ecc3954","url":"css/styles/story-detail.css"},{"revision":"8c9635c8cceb026b1d012077244e4f1e","url":"css/styles/story-item.css"},{"revision":"ebd07dbe02a5dceb799e0a7e7cfadba7","url":"index.html"},{"revision":"fdff27119fda49bcac2e1cad043e89bf","url":"offline.html"},{"revision":"7e45f2b0faf02ed5eec9220cb8895871","url":"registerSW.js"},{"revision":"601020486b75a486ca1c8a8f245a818b","url":"favicon.ico"},{"revision":"cc72d67b74d815c4464cbda906464295","url":"icons/android-chrome-192x192.png"},{"revision":"d9522cb7d7717a41b621e54e1c4b498a","url":"icons/android-chrome-512x512.png"},{"revision":"ad07f67ec56aaf0929c1b2c91203e003","url":"icons/apple-touch-icon.png"},{"revision":"04f47bdebf2cd9a3836628b0e509b5bf","url":"icons/book.png"},{"revision":"37f98a2e3c07fcdda6510fade8f1f792","url":"icons/favicon-16x16.png"},{"revision":"9add44bb126590e6c7562bc14a83fb2c","url":"icons/favicon-32x32.png"},{"revision":"8fb1ce30b70f7ce4564e1cd600db4304","url":"icons/heart.png"},{"revision":"f7a08d52b181802ca9db806fd32e8aeb","url":"icons/maskable.png"},{"revision":"8f4af871f00e22680f1536f302e08cf1","url":"manifest.webmanifest"}]||[]);n(({request:e})=>e.destination==="image",new i({cacheName:"images",plugins:[new o({maxEntries:60,maxAgeSeconds:30*24*60*60}),new a({statuses:[0,200]})]}));n(({request:e})=>e.destination==="style"||e.destination==="script",new h({cacheName:"static-resources",plugins:[new a({statuses:[0,200]})]}));n(({request:e})=>e.destination==="font",new i({cacheName:"fonts",plugins:[new o({maxEntries:30,maxAgeSeconds:60*60*24*365}),new a({statuses:[0,200]})]}));n(({url:e})=>e.pathname.startsWith("/api/"),new r({cacheName:"api-cache",networkTimeoutSeconds:3,plugins:[new a({statuses:[0,200]}),new o({maxEntries:100,maxAgeSeconds:24*60*60}),new f("apiQueue",{maxRetentionTime:24*60})]}));g(async({request:e})=>e.mode==="navigate"?e.url.includes("/login")||e.url.includes("/register")?new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Offline - Story Web</title>
          <link rel="stylesheet" href="/css/styles/main.css">
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
                <li><a href="/#">Home</a></li>
                <li><a href="/#/favorites">Favorites</a></li>
                <li><a href="/#/login" class="active">Login</a></li>
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
        `,{headers:{"Content-Type":"text/html"}}):caches.match("/offline.html"):Response.error());new f("storyWebQueue",{maxRetentionTime:24*60});self.addEventListener("push",e=>{var l;console.log("Push event received:",e);let t;try{t=e.data.json(),console.log("Notification data:",t)}catch(c){console.error("Error parsing push data:",c),t={title:"New Story",options:{body:"Someone shared a new story"}}}const s={body:((l=t.options)==null?void 0:l.body)||"New content available",icon:"/icon.png",badge:"/icon.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1},actions:[{action:"close",title:"Tutup"}],requireInteraction:!0};console.log("Showing notification with options:",s),e.waitUntil(self.registration.showNotification(t.title,s).then(()=>console.log("Notification shown successfully")).catch(c=>console.error("Error showing notification:",c)))});self.addEventListener("notificationclick",e=>{e.notification.close(),e.action==="close"?e.notification.close():e.waitUntil(clients.matchAll({type:"window"}).then(t=>{for(const s of t)if("focus"in s)return s.focus();return clients.openWindow("/")}))});self.addEventListener("install",e=>{console.log("Service Worker installed");const t=["/offline.html"];e.waitUntil(caches.open("offline-cache").then(s=>s.addAll(t)))});self.addEventListener("fetch",e=>{e.request.mode==="navigate"&&e.respondWith(fetch(e.request).catch(()=>caches.open("offline-cache").then(t=>t.match("/offline.html"))))});self.addEventListener("activate",e=>{console.log("Service Worker activated"),e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(t=>Promise.all(t.map(s=>{if(!["stories-cache","images-cache","offline-cache"].includes(s))return caches.delete(s)})))]))});importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");n(/^https:\/\/fonts\.googleapis\.com/,new h({cacheName:"google-fonts-stylesheets"}));n(/^https:\/\/fonts\.gstatic\.com/,new i({cacheName:"google-fonts-webfonts",plugins:[new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]}),new o({maxAgeSeconds:60*60*24*365,maxEntries:30})]}));n(/\.(?:png|gif|jpg|jpeg|webp|svg)$/,new i({cacheName:"images",plugins:[new o({maxEntries:60,maxAgeSeconds:30*24*60*60})]}));n(({request:e})=>e.mode==="navigate",new r({cacheName:"pages",plugins:[new o({maxEntries:50})]}));
