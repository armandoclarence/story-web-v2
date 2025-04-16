const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/js/home-page.js","assets/js/api-mapper.js","assets/js/map.js","assets/js/ui-templates.js","assets/js/new-page.js","assets/js/form-templates.js","assets/js/new-guest-page.js","assets/js/story-detail-page.js","assets/js/favorites-page.js"])))=>i.map(i=>d[i]);
var qt=Object.defineProperty;var ft=r=>{throw TypeError(r)};var xt=(r,t,e)=>t in r?qt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var ot=(r,t,e)=>xt(r,typeof t!="symbol"?t+"":t,e),it=(r,t,e)=>t.has(r)||ft("Cannot "+e);var n=(r,t,e)=>(it(r,t,"read from private field"),e?e.call(r):t.get(r)),h=(r,t,e)=>t.has(r)?ft("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(r):t.set(r,e),g=(r,t,e,s)=>(it(r,t,"write to private field"),s?s.call(r,e):t.set(r,e),e),p=(r,t,e)=>(it(r,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();const Ut="modulepreload",zt=function(r){return"/story-web-v2/"+r},pt={},P=function(t,e,s){let o=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));o=Promise.allSettled(e.map(l=>{if(l=zt(l),l in pt)return;pt[l]=!0;const u=l.endsWith(".css"),S=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${S}`))return;const y=document.createElement("link");if(y.rel=u?"stylesheet":Ut,u||(y.as="script"),y.crossOrigin="",y.href=l,c&&y.setAttribute("nonce",c),document.head.appendChild(y),u)return new Promise((rt,M)=>{y.addEventListener("load",rt),y.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return o.then(a=>{for(const c of a||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})};function yt(r){const t=r.split("/");return{resource:t[1]||null,id:t[2]||null}}function Ht(r){let t="";return r.resource&&(t=t.concat(`/${r.resource}`)),r.id&&(t=t.concat("/:id")),t||"/"}function vt(){return location.hash.replace("#","")||"/"}function wt(){const r=vt(),t=yt(r);return Ht(t)}function Wt(){const r=vt();return yt(r)}const b={BASE_URL:"https://story-api.dicoding.dev/v1",ACCESS_TOKEN_KEY:"accessToken",MAP_SERVICE_API_KEY:"VKEpsF8VPnGlVLwqQkzA",VAPID_PUBLIC_KEY:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"};function L(){try{const r=localStorage.getItem(b.ACCESS_TOKEN_KEY);return r==="null"||r==="undefined"?null:r}catch(r){return console.error("getAccessToken: error:",r),null}}function Gt(r){try{return localStorage.setItem(b.ACCESS_TOKEN_KEY,r),!0}catch(t){return console.error("putAccessToken: error:",t),!1}}function bt(){try{return localStorage.removeItem(b.ACCESS_TOKEN_KEY),!0}catch(r){return console.error("getLogout: error:",r),!1}}const Vt=["/login","/register"];function G(r){const t=wt(),e=!!L();return Vt.includes(t)&&e?(location.hash="/",null):r}function V(r){return!L()?(location.hash="/login",null):r}function St(){bt()}const Ee=Object.freeze(Object.defineProperty({__proto__:null,checkAuthenticatedRoute:V,checkUnauthenticatedRouteOnly:G,getAccessToken:L,getLogout:St,putAccessToken:Gt,removeAccessToken:bt},Symbol.toStringTag,{value:"Module"}));function _t(r,t="en-US",e={}){return new Date(r).toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric",...e})}async function ke(r,t={}){const{tns:e}=await P(async()=>{const{tns:s}=await import("./tiny-slider.js").then(o=>o.t);return{tns:s}},[]);return e({container:r,mouseDrag:!0,swipeAngle:!1,speed:600,nav:!0,navPosition:"bottom",autoplay:!1,controls:!1,...t})}function Ae(r,t="",e=512){const s=atob(r),o=[];for(let i=0;i<s.length;i+=e){const a=s.slice(i,i+e),c=new Array(a.length);for(let u=0;u<a.length;u++)c[u]=a.charCodeAt(u);const l=new Uint8Array(c);o.push(l)}return new Blob(o,{type:t})}function Kt(r){const t="=".repeat((4-r.length%4)%4),e=(r+t).replace(/-/g,"+").replace(/_/g,"/"),s=atob(e),o=new Uint8Array(s.length);for(let i=0;i<s.length;i++)o[i]=s.charCodeAt(i);return o}function Yt(r,t){r==null||r.addEventListener("click",()=>t==null?void 0:t.focus())}function Jt({skipTransition:r=!1,updateDOM:t}){if(r||!document.startViewTransition){const e=Promise.resolve(t()).then(()=>{});return{ready:Promise.reject(Error("View transitions unsupported")),updateCallbackDone:e,finished:e}}return document.startViewTransition(t)}const I=async(r,t)=>{const e=await r();return t(new e.default)},Xt={"/login":()=>I(()=>P(()=>import("./login-page.js"),[]),G),"/register":()=>I(()=>P(()=>import("./register-page.js"),[]),G),"/":()=>I(()=>P(()=>import("./home-page.js"),__vite__mapDeps([0,1,2,3])),V),"/new":()=>I(()=>P(()=>import("./new-page.js"),__vite__mapDeps([4,5,3,2])),V),"/new-guest":()=>I(()=>P(()=>import("./new-guest-page.js"),__vite__mapDeps([6,5,3,2])),G),"/stories/:id":()=>I(()=>P(()=>import("./story-detail-page.js"),__vite__mapDeps([7,3,1,2])),V),"/favorites":()=>I(()=>P(()=>import("./favorites-page.js"),__vite__mapDeps([8,1,2])),V),"/404":()=>I(()=>P(()=>import("./not-found-page.js"),[]),G)},d={name:"StoryAppDB",version:2,stores:{favorites:"favorites",apiCache:"apiCache"}};function Qt(){return new Promise((r,t)=>{console.log("Opening IndexedDB...");const e=indexedDB.open(d.name,d.version);e.onupgradeneeded=s=>{console.log("Database upgrade needed...");const o=s.target.result;if(console.log("Existing stores:",Array.from(o.objectStoreNames)),o.objectStoreNames.contains(d.stores.favorites)||(console.log("Creating favorites store..."),o.createObjectStore(d.stores.favorites,{keyPath:"storyId"}).createIndex("updatedAt","updatedAt",{unique:!1})),!o.objectStoreNames.contains(d.stores.apiCache)){console.log("Creating apiCache store...");const i=o.createObjectStore(d.stores.apiCache,{keyPath:"url"});i.createIndex("timestamp","timestamp",{unique:!1}),i.createIndex("type","type",{unique:!1})}console.log("Final stores:",Array.from(o.objectStoreNames))},e.onsuccess=s=>{const o=s.target.result;console.log("Database opened successfully. Available stores:",Array.from(o.objectStoreNames)),r(o)},e.onerror=s=>{console.error("Error initializing IndexedDB:",s.target.error),t(s.target.error)},e.onblocked=s=>{console.warn("Database opening blocked. Please close other tabs and reload."),alert("Please close all other tabs with this site open and reload this page.")}})}function st(){return new Promise((r,t)=>{const e=indexedDB.open(d.name,d.version);e.onupgradeneeded=s=>{const o=s.target.result;o.objectStoreNames.contains(d.stores.favorites)||o.createObjectStore(d.stores.favorites,{keyPath:"id"})},e.onsuccess=()=>r(e.result),e.onerror=()=>t(e.error)})}async function Zt(r){return new Promise(async(t,e)=>{const i=(await st()).transaction([d.stores.favorites],"readwrite").objectStore(d.stores.favorites),a={...r,updatedAt:new Date().toISOString(),createdAt:new Date().toISOString()},c=i.put(a);c.onsuccess=async()=>{try{const l=await caches.open("api-cache-v1"),u=new Response(JSON.stringify({story:r}),{headers:{"Content-Type":"application/json"}});await l.put(`https://story-api.dicoding.dev/v1/stories/${r.id}`,u)}catch(l){console.warn("Failed to cache story:",l)}t()},c.onerror=l=>{console.error("Error adding favorite:",l.target.error),e(l.target.error)}})}async function te(r){return new Promise(async(t,e)=>{const i=(await st()).transaction([d.stores.favorites],"readwrite").objectStore(d.stores.favorites),a=i.get(r);a.onsuccess=async()=>{if(a.result){const c=i.delete(a.result.id);c.onsuccess=async()=>{try{await(await caches.open("api-cache-v1")).delete(`/api/stories/${r}`),m.broadcastChange({type:"remove",storyId:r}),t()}catch(l){console.warn("Failed to remove from cache:",l),t()}},c.onerror=l=>{console.error("Error deleting from IndexedDB:",l.target.error),e(l.target.error)}}else t()},a.onerror=c=>{console.error("Error accessing IndexedDB:",c.target.error),e(c.target.error)}})}async function ee(){return new Promise(async(r,t)=>{const e=await st(),i=await e.transaction(d.stores.favorites,"readonly").objectStore(d.stores.favorites).getAll();e.close(),i.onsuccess=()=>{console.log("stories",i.result),r(i.result)},i.onerror=a=>{console.error("Error getting all stories:",a.target.error),t(a.target.error)}})}async function se(r){return new Promise(async(t,e)=>{const a=(await st()).transaction(d.stores.favorites,"readonly").objectStore(d.stores.favorites).get(r);a.onsuccess=()=>{console.log("story",a.result),t(a.result)},a.onerror=c=>{console.error("Error getting story by id:",c.target.error),e(c.target.error)}})}async function re(r){return await se(r)!==void 0}var q,K,x,Y,at;class m{static async init(){if(n(this,K))return n(this,q);try{return g(this,q,await Qt()),g(this,K,!0),n(this,q)}catch(t){throw console.error("Failed to initialize IndexedDB:",t),t}}static async addToFavorites(t){const e=await this.init();return new Promise((s,o)=>{const a=e.transaction([d.stores.favorites],"readwrite").objectStore(d.stores.favorites),c={storyId:t.id,story:t,timestamp:Date.now(),updatedAt:new Date().toISOString()},l=a.put(c);l.onsuccess=()=>{this.broadcastChange({type:"add",storyId:t.id}),s()},l.onerror=()=>o(l.error)})}static async removeFromFavorites(t){const e=await this.init();return new Promise((s,o)=>{const c=e.transaction([d.stores.favorites],"readwrite").objectStore(d.stores.favorites).delete(t);c.onsuccess=()=>{this.broadcastChange({type:"remove",storyId:t}),s()},c.onerror=()=>o(c.error)})}static async getFavorites(){const t=await this.init();return new Promise((e,s)=>{const a=t.transaction([d.stores.favorites],"readonly").objectStore(d.stores.favorites).getAll();a.onsuccess=()=>{const c=a.result.map(l=>l.story);e(c)},a.onerror=()=>s(a.error)})}static async isFavorite(t){const e=await this.init();return new Promise((s,o)=>{const c=e.transaction([d.stores.favorites],"readonly").objectStore(d.stores.favorites).get(t);c.onsuccess=()=>s(!!c.result),c.onerror=()=>o(c.error)})}static broadcastChange(t){new BroadcastChannel("favorites-sync").postMessage(t)}static async clearOldCache(){const t=await this.init();return new Promise((e,s)=>{const o=t.transaction([d.stores.favorites],"readwrite"),i=o.objectStore(d.stores.favorites),a=Date.now()-30*24*60*60*1e3,c=i.openCursor();c.onsuccess=l=>{const u=l.target.result;u&&(u.value.timestamp<a&&u.delete(),u.continue())},o.oncomplete=()=>e(),o.onerror=()=>s(o.error)})}static listenToChanges(t){const e=new BroadcastChannel("favorites-sync");return e.onmessage=s=>{t(s.data)},()=>e.close()}static async cacheAPIResponse(t,e,s="story"){const o=await this.init();try{const a=o.transaction([d.stores.apiCache],"readwrite").objectStore(d.stores.apiCache),c={url:t,data:e,type:s,timestamp:Date.now()};if(await new Promise((l,u)=>{const S=a.put(c);S.onsuccess=()=>l(),S.onerror=()=>u(S.error)}),p(this,Y,at).call(this))try{const l=await caches.open(n(this,x)),u=new Response(JSON.stringify(e),{headers:{"Content-Type":"application/json","Cache-Control":"max-age=86400"}});await l.put(t,u),console.log("Cached in both IndexedDB and Cache Storage:",t)}catch(l){console.warn("Cache Storage failed, using IndexedDB only:",l)}else console.log("Cache Storage not available, using IndexedDB only")}catch(i){throw console.error("Error caching API response:",i),i}}static async getFromAPICache(t){try{if(p(this,Y,at).call(this))try{const i=await(await caches.open(n(this,x))).match(t);if(i){const a=await i.json();return console.log("Found in Cache Storage:",t),a}}catch(o){console.warn("Cache Storage access failed:",o)}const e=await this.init(),s=await new Promise((o,i)=>{const l=e.transaction([d.stores.apiCache],"readonly").objectStore(d.stores.apiCache).get(t);l.onsuccess=()=>{var u;return o(((u=l.result)==null?void 0:u.data)||null)},l.onerror=()=>i(l.error)});return s?(console.log("Found in IndexedDB:",t),s):null}catch(e){return console.error("Error fetching from cache:",e),null}}static async clearAPICache(t=24*60*60*1e3){try{const o=(await this.init()).transaction([d.stores.apiCache],"readwrite").objectStore(d.stores.apiCache),i=Date.now()-t;await new Promise((u,S)=>{const y=o.openCursor();y.onsuccess=rt=>{const M=rt.target.result;M?(M.value.timestamp<i&&M.delete(),M.continue()):u()},y.onerror=()=>S(y.error)});const a=await caches.open(n(this,x)),l=(await a.keys()).map(async u=>{const S=await a.match(u);if(new Date(S.headers.get("date")).getTime()<i)return a.delete(u)});await Promise.all(l),console.log("API cache cleared successfully")}catch(e){console.error("Error clearing API cache:",e)}}static async fetchWithCache(t,e={}){try{const s=await this.getFromAPICache(t);if(s)return s;const i=await(await fetch(t,e)).json();return await this.cacheAPIResponse(t,i),i}catch(s){throw console.error("Error fetching with cache:",s),s}}static async getAllFavorites(){try{const t=await this.init();return await new Promise((s,o)=>{const c=t.transaction([d.stores.favorites],"readonly").objectStore(d.stores.favorites).getAll();c.onsuccess=()=>{const l=c.result.map(u=>({id:u.storyId,...u.story,isFavorite:!0,timestamp:u.timestamp,updatedAt:u.updatedAt}));l.sort((u,S)=>S.timestamp-u.timestamp),s(l)},c.onerror=()=>o(c.error)})}catch(t){return console.error("Error getting all favorites:",t),[]}}static async syncFavorites(t=[]){try{const e=await this.getAllFavorites(),s=t.map(async o=>{const i=e.find(a=>a.id===o.id);if(i)return this.cacheAPIResponse(`https://story-api.dicoding.dev/v1/stories/${o.id}`,{...o,isFavorite:!0,favoriteTimestamp:i.favoriteTimestamp,updatedAt:new Date().toISOString()})});await Promise.all(s),console.log("Favorites synced with server data")}catch(e){console.error("Error syncing favorites:",e)}}static async getFavorite(t){const e=await this.init();return new Promise((s,o)=>{const c=e.transaction([d.stores.favorites],"readonly").objectStore(d.stores.favorites).get(t);c.onsuccess=()=>{c.result?s({id:c.result.storyId,...c.result.story,isFavorite:!0,timestamp:c.result.timestamp,updatedAt:c.result.updatedAt}):s(null)},c.onerror=()=>o(c.error)})}}q=new WeakMap,K=new WeakMap,x=new WeakMap,Y=new WeakSet,at=function(){return"caches"in window&&window.isSecureContext},h(m,Y),h(m,q,null),h(m,K,!1),h(m,x,"api-cache-v1");class oe{constructor(){ot(this,"handleTouchStart",t=>{t.target.classList.add("active")});ot(this,"handleTouchEnd",t=>{t.target.classList.remove("active");const e=t.target.closest(".nav-link");e&&(t.preventDefault(),e.tagName==="A"?window.location.href=e.href:e.tagName==="BUTTON"&&e.click())});this.lastAttemptedHash=null,this.hashChangeCallbacks=[],this.content=null,this.app=null,this.isGitHubPages=window.location.hostname.includes("github.io"),this.basePath=this.isGitHubPages?"/story-web-v2":""}setApp(t){this.app=t,this.content=t.getContent()}init(){window.addEventListener("load",()=>{this.handleRoute()}),window.addEventListener("hashchange",async t=>{t.preventDefault(),await this.handleRoute(),this.hashChangeCallbacks.forEach(e=>e())}),window.addEventListener("online",()=>{document.body.classList.remove("offline-mode"),this.lastAttemptedHash&&(window.location.hash=this.lastAttemptedHash,this.lastAttemptedHash=null)}),window.addEventListener("offline",()=>{document.body.classList.add("offline-mode"),this.lastAttemptedHash=window.location.hash}),this.registerServiceWorker(),this.setupNavigationHandlers()}registerServiceWorker(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/story-web-v2/sw.js").then(t=>{console.log("Service Worker registered with scope:",t.scope)}).catch(t=>{console.error("Service Worker registration failed:",t)})})}onHashChange(t){this.hashChangeCallbacks.push(t)}async handleRoute(){const t=wt(),e=Wt();try{const s=Xt[t];if(!s){window.location.hash="#/404";return}const o=await s();if(!o){window.location.hash="#/404";return}this.setupMobileNavigation();const i=!!L();if(o.requiresAuth&&!i){window.location.hash="#/login";return}if(o.requiresUnauth&&i){window.location.hash="#/";return}if(!navigator.onLine&&i&&o.offlineSupport){await this.handleOfflineRoute(e,o);return}await this.renderPageWithTransition(o),this.app&&this.app.updateNavigation()}catch(s){console.error("Route handling error:",s),window.location.hash="#/404"}}async renderPageWithTransition(t,e=null){if(!this.content)return;if(navigator.onLine){const o=document.querySelector(".offline-banner");o&&o.remove()}const s=Jt({updateDOM:async()=>{window.scrollTo(0,0);try{this.content.style.opacity="0",this.content.innerHTML=await t.render(e),requestAnimationFrame(()=>{this.content.style.opacity="1"}),t.afterRender&&await t.afterRender()}catch(o){console.error("Error rendering page:",o),this.content.innerHTML="<h1>Error loading page</h1>"}}});return s.ready.catch(console.error),s.updateCallbackDone}async handleOfflineRoute(t,e){if(e.requiresOnline!==!1){const s=await this.checkCachedData(t);s&&await this.renderWithOfflineIndicator(e,s);return}await this.renderPageWithTransition(e)}async checkCachedData(t){try{return t.resource==="stories"&&t.id?await m.getFavorite(t.id):t.resource==="favorites"?await m.getAllFavorites():!0}catch(e){return console.error("Error checking cached data:",e),null}}async renderWithOfflineIndicator(t,e){this.showOfflineBanner(),await this.renderPageWithTransition(t,e)}showOfflineBanner(){if(!document.querySelector(".offline-banner")){const t=document.createElement("div");t.className="offline-banner",t.innerHTML=`
        <div class="offline-banner__content">
          <i class="fas fa-wifi-slash"></i>
          <span>Anda sedang offline. Menampilkan konten tersimpan.</span>
          <button class="offline-banner__retry">Coba Lagi</button>
        </div>
      `,t.querySelector(".offline-banner__retry").addEventListener("click",()=>{window.location.reload()}),document.body.insertBefore(t,document.body.firstChild)}}setupMobileNavigation(){document.querySelectorAll(".nav-link").forEach(e=>{e.removeEventListener("touchstart",this.handleTouchStart),e.removeEventListener("touchend",this.handleTouchEnd),e.addEventListener("touchstart",this.handleTouchStart),e.addEventListener("touchend",this.handleTouchEnd)})}setupNavigationHandlers(){document.addEventListener("click",t=>{var s;const e=t.target.closest("a, button.nav-link");if(e)if(e.tagName==="A"&&((s=e.getAttribute("href"))!=null&&s.startsWith("#"))){t.preventDefault();const o=e.getAttribute("href");window.location.hash=o}else e.id==="logout-button"&&(t.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&this.handleLogout())})}handleLogout(){}}const ie=`
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
`,Et=document.createElement("style");Et.textContent=ie;document.head.appendChild(Et);const nt=new oe;var U,_,E,kt,At,Lt,ct;class Z{static async init(t){if(!n(this,_))try{g(this,U,t),await m.init(),p(this,E,kt).call(this),p(this,E,At).call(this),g(this,_,!0),console.log("FavoriteManager initialized successfully")}catch(e){throw console.error("Error initializing FavoriteManager:",e),e}}static async refreshFavorites(t=null){try{const e=await this.getAllFavorites();if(console.log("Refreshed favorites:",e),t){const s=await this.isFavorite(t);if(document.querySelectorAll(`[data-story-id="${t}"]`).forEach(i=>p(this,E,ct).call(this,i,s)),!s){const i=document.getElementById("favorites-list");if(i){const a=i.querySelector(`[data-story-id="${t}"]`).closest(".story-item");if(a&&(a.classList.add("removing"),await new Promise(l=>{a.addEventListener("transitionend",()=>{a.remove(),l()},{once:!0})}),i.querySelectorAll(".story-item").length===0)){i.innerHTML="<p>Belum ada cerita favorit.</p>";const l=document.getElementById("pagination-container");l&&(l.innerHTML="")}}}}else if(document.getElementById("favorites-list")){const o=new CustomEvent("favorites-updated",{detail:{favorites:e,currentPage:1,pageSize:10}});document.dispatchEvent(o)}}catch(e){console.error("Error refreshing favorites:",e);const s=new CustomEvent("favorites-update-error",{detail:e});document.dispatchEvent(s)}}static async addFavorite(t){if(!n(this,_))throw new Error("FavoriteManager not initialized");try{await m.addToFavorites(t),console.log("Story added to favorites:",t.id),await this.refreshFavorites()}catch(e){throw console.error("Error adding favorite:",e),e}}static async removeFavorite(t){if(!n(this,_))throw new Error("FavoriteManager not initialized");try{await m.removeFromFavorites(t),console.log("Story removed from favorites:",t),await this.refreshFavorites(t)}catch(e){throw console.error("Error removing favorite:",e),e}}static async isFavorite(t){if(!n(this,_))throw new Error("FavoriteManager not initialized");try{return await m.isFavorite(t)}catch(e){return console.error("Error checking favorite status:",e),!1}}static async getAllFavorites(){if(!n(this,_))throw new Error("FavoriteManager not initialized");try{return await m.getAllFavorites()}catch(t){return console.error("Error getting all favorites:",t),[]}}static async toggleFavorite(t){try{const e=await m.isFavorite(t.id);return e?await m.removeFromFavorites(t.id):await m.addToFavorites(t),!e}catch(e){throw console.error("Error toggling favorite:",e),e}}static async getFavorites(t){try{return await m.getFavorites(t)}catch(e){return console.error("Error getting favorites:",e),[]}}}U=new WeakMap,_=new WeakMap,E=new WeakSet,kt=function(){const t=new BroadcastChannel("favorites-sync");t.onmessage=async e=>{const s=e.data;(s.type==="remove"||s.type==="add"||s.type==="update")&&(await this.refreshFavorites(),document.querySelectorAll(`[data-story-id="${s.storyId}"]`).forEach(async i=>{const a=await this.isFavorite(s.storyId);p(this,E,ct).call(this,i,a)}))}},At=function(){document.addEventListener("click",async t=>{const e=t.target.closest(".story-item__favorite, .story-detail__favorite");if(e){const s=e.dataset.storyId,o=e.classList.contains("active");try{if(!n(this,_))throw new Error("FavoriteManager not initialized");if(o)await this.removeFavorite(s);else{const i=await p(this,E,Lt).call(this,s);i&&await this.addFavorite(i)}}catch(i){console.error("Error toggling favorite:",i),alert("Gagal mengubah status favorit.")}}})},Lt=async function(t){if(!n(this,_))throw new Error("FavoriteManager not initialized");try{const e=await m.getFavorite(t);if(e)return e;if(!n(this,U))throw new Error("API model not initialized");const s=await n(this,U).getStoryById(t);if(!s.ok)throw new Error("Failed to fetch story");return s.story}catch(e){throw console.error("Error fetching story:",e),e}},ct=function(t,e){const s=t.querySelector("i");e?(t.classList.add("active"),s==null||s.classList.remove("far"),s==null||s.classList.add("fas"),t.setAttribute("aria-label","Remove from favorites")):(t.classList.remove("active"),s==null||s.classList.remove("fas"),s==null||s.classList.add("far"),t.setAttribute("aria-label","Add to favorites"))},h(Z,E),h(Z,U,null),h(Z,_,!1);const ae=b.BASE_URL,Pt=async(r,t={})=>{const e=`${ae}/${r}`,s=L();if(!navigator.onLine){console.log("Offline - checking cache for:",e);const o=await m.getFromAPICache(e);return o?(console.log("Found cached data for:",e),{ok:!0,...o,isFromCache:!0}):{ok:!1,error:"Offline and no cached data available"}}try{const o=await fetch(e,{...t,headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{},...t.headers}});if(!o.ok)throw new Error("Network response was not ok");const i=await o.json();return console.log("Caching successful response for:",e),await m.cacheAPIResponse(e,i),{ok:!0,...i}}catch(o){console.error("Fetch error:",o),console.log("Trying cache after fetch error for:",e);const i=await m.getFromAPICache(e);return i?(console.log("Found cached data after error for:",e),{ok:!0,...i,isFromCache:!0}):{ok:!1,error:o.message}}},W={REGISTER:`${b.BASE_URL}/register`,LOGIN:`${b.BASE_URL}/login`,STORE_NEW_STORY:`${b.BASE_URL}/stories`,STORE_NEW_STORY_GUEST:`${b.BASE_URL}/stories/guest`,SUBSCRIBE:`${b.BASE_URL}/notifications/subscribe`,UNSUBSCRIBE:`${b.BASE_URL}/notifications/subscribe`};async function ne({name:r,email:t,password:e}){const s=JSON.stringify({name:r,email:t,password:e}),o=await fetch(W.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:s});return{...await o.json(),ok:o.ok}}async function ce({email:r,password:t}){const e=JSON.stringify({email:r,password:t}),s=await fetch(W.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:e});return{...await s.json(),ok:s.ok}}const le=async({page:r=1,size:t=10}={})=>Pt(`stories?page=${r}&size=${t}`),Tt=async r=>Pt(`stories/${r}`);async function de({description:r,photo:t,lat:e,lon:s}){const o=L(),i=new FormData;i.set("description",r),i.set("photo",t[0].blob),i.set("lat",e),i.set("lon",s);const a=await fetch(W.STORE_NEW_STORY,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:i});return{...await a.json(),ok:a.ok}}async function ue({description:r,photo:t,lat:e,lon:s}){const o=L(),i=new FormData;i.set("description",r),i.set("photo",t[0].blob),i.set("lat",e),i.set("lon",s);const a=await fetch(W.STORE_NEW_STORY_GUEST,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:i});return{...await a.json(),ok:a.ok}}async function he({endpoint:r,keys:{p256dh:t,auth:e}}){const s=L(),o=JSON.stringify({endpoint:r,keys:{p256dh:t,auth:e}}),i=await fetch(W.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:o});return{...await i.json(),ok:i.ok}}async function fe({endpoint:r}){const t=L(),e=JSON.stringify({endpoint:r}),s=await fetch(W.UNSUBSCRIBE,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:e});return{...await s.json(),ok:s.ok}}async function pe(r){try{const t=await Tt(r);return await Zt(t.story),t}catch(t){return{ok:!1,message:t.message}}}async function ge(r){try{return await te(r),{ok:!0}}catch(t){return{ok:!1,message:t.message}}}async function me(){try{return{ok:!0,stories:await ee()}}catch(r){return{ok:!1,message:r.message}}}async function ye(r){return await re(r)}const gt=Object.freeze(Object.defineProperty({__proto__:null,getLogin:ce,getRegistered:ne,getSavedStories:me,getStories:le,getStoryById:Tt,isStorySaved:ye,removeStory:ge,saveStory:pe,storeNewStory:de,storeNewStoryGuest:ue,subscribePushNotification:he,unsubscribePushNotification:fe},Symbol.toStringTag,{value:"Module"}));function Le(){return`
    <div id="stories-list-empty" class="stories-list__empty">
      <h2>Tidak ada story yang tersedia</h2>
      <p>Saat ini, tidak ada story yang dapat ditampilkan.</p>
    </div>
  `}function Pe(r){return`
    <div id="stories-list-error" class="stories-list__error">
      <h2>Terjadi kesalahan pengambilan daftar story</h2>
      <p>${r||"Gunakan jaringan lain atau laporkan error ini."}</p>
    </div>
  `}function Te(r){return`
    <div id="stories-detail-error" class="stories-detail__error">
      <h2>Terjadi kesalahan pengambilan detail story</h2>
      <p>${r||"Gunakan jaringan lain atau laporkan error ini."}</p>
    </div>
  `}const Ce=({id:r,description:t,photoUrl:e,createdAt:s,name:o,placeName:i,isFavorited:a,isOffline:c=!1})=>`
  <article class="story-item ${c?"offline":""}" id="story-${r}">
    <div class="story-item__image-container">
      <img class="story-item__image" src="${e}" alt="${t}" loading="lazy">
      ${i?`<div class="story-item__location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${i}</span>
            </div>`:""}
    </div>
    <div class="story-item__content">
      <div class="story-item__header">
        <span class="story-item__title">${o}</span>
        <span class="story-item__date">${_t(s)}</span>
      </div>
      <p class="story-item__description">${t}</p>
      <div class="story-item__actions">
        <a href="#/stories/${r}" class="story-item__read-more">
          <span>Baca Selengkapnya</span>
          <i class="fas fa-arrow-right"></i>
        </a>
        <button 
          class="story-item__favorite ${a?"active":""}" 
          data-story-id="${r}" 
          aria-label="${a?"Remove from favorites":"Add to favorites"}"
        >
          <i class="${a?"fas":"far"} fa-heart"></i>
        </button>
      </div>
    </div>
  </article>
`;function Ie(r){return`
    <div class="story-detail__header">
      <h1 class="story-detail__description">${r.description}</h1>
      <div class="story-detail__more-info">
        <div class="story-detail__more-info__inline">
          <span class="story-detail__createdat">
            <i class="fas fa-calendar"></i>
            ${_t(r.createdAt)}
          </span>
          ${r.location?`<span class="story-detail__location__place-name">
                  <i class="fas fa-map-marker-alt"></i>
                  ${r.location}
                </span>`:""}
        </div>
        <span class="story-detail__author">
          <i class="fas fa-user"></i>
          ${r.name}
        </span>
      </div>
    </div>

    <div class="story-detail__images__container">
      <div class="story-detail__images" id="images">
        <div class="story-detail__image-wrapper">
          <img src="${Array.isArray(r.photoUrl)?r.photoUrl[0]:r.photoUrl}" alt="${r.description}" loading="lazy">
        </div>
      </div>
    </div>

    <div class="story-detail__body">
      <div class="story-detail__body__description__container">
        <h2 class="story-detail__description__title">Deskripsi</h2>
        <p class="story-detail__description__body">${r.description}</p>
      </div>

      ${r.lat&&r.lon?`
        <div class="story-detail__body__map__container">
          <h2 class="story-detail__map__title">Lokasi</h2>
          <div class="story-detail__map__wrapper">
            <div id="map" class="story-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
          <div class="story-detail__location__coordinate">
            <span class="story-detail__location__latitude">
              <i class="fas fa-map-marker-alt"></i>
              Latitude: ${r.lat}
            </span>
            <span class="story-detail__location__longitude">
              <i class="fas fa-map-marker-alt"></i>
              Longitude: ${r.lon}
            </span>
          </div>
        </div>
      `:""}
    </div>

    <div class="story-detail__body__actions__container">
      <h2>Aksi</h2>
      <div class="story-detail__actions__buttons">
        <div id="save-actions-container"></div>
      </div>
    </div>
  `}function tt(){return`
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `}function mt(){return`
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `}const Be=(r=!1)=>`
  <button 
    id="story-detail-favorite" 
    class="story-detail__favorite ${r?"active":""}"
    aria-label="${r?"Remove from favorites":"Add to favorites"}"
  >
    <i class="${r?"fas":"far"} fa-heart"></i>
    <span>${r?"Hapus dari Favorit":"Tambah ke Favorit"}</span>
  </button>
`,ve=()=>`
  <li>
    <a href="#/" class="nav-menu__link" id="story-list-button">
      <i class="fas fa-home"></i>
      <span>Daftar Cerita</span>
    </a>
  </li>
  <li>
    <a href="#/favorites" class="nav-menu__link" id="favorites-button">
      <i class="fas fa-heart"></i>
      <span>Favorit</span>
    </a>
  </li>
  <li>
    <a href="#/new" class="nav-menu__link" id="new-story-button">
      <i class="fas fa-plus"></i>
      <span>Buat Story</span>
    </a>
  </li>
`,we=()=>`
  <li id="push-notification-container" class="push-notification-container">
    ${tt()}
  </li>
  <li>
    <button class="nav-menu__logout" id="logout-button">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </button>
  </li>
`,be=()=>`
  <li>
    <a href="#/login" class="nav-menu__link" id="login-button">
      <i class="fas fa-sign-in-alt"></i>
      <span>Login</span>
    </a>
  </li>
  <li>
    <a href="#/register" class="nav-menu__link" id="register-button">
      <i class="fas fa-user-plus"></i>
      <span>Register</span>
    </a>
  </li>
  <li>
    <a href="#/new-guest" class="nav-menu__link" id="new-story-button">
      <i class="fas fa-plus"></i>
      <span>Buat Cerita Guest</span>
    </a>
  </li>
`;var z,N,Ct,It,Bt;class lt{static async init(t){if(g(this,z,t),!await p(this,N,Ct).call(this))return p(this,N,It).call(this),!1;let s=0;const o=5,i=async()=>{if(s>=o){console.log("Failed to find notification container after maximum attempts");return}await p(this,N,Bt).call(this),document.getElementById("push-notification-container")||(s++,setTimeout(i,1e3))};await i()}static async checkSubscription(){var t;try{const e=await((t=navigator.serviceWorker)==null?void 0:t.ready),s=await(e==null?void 0:e.pushManager.getSubscription());return console.log("Current subscription:",s),s?(localStorage.setItem("pushSubscription",JSON.stringify(s)),!0):(localStorage.removeItem("pushSubscription"),!1)}catch(e){return console.error("Error checking subscription status:",e),!1}}static async requestPermission(){const t=await Notification.requestPermission();return t==="denied"?(console.log("Notifikasi tidak diizinkan"),!1):t==="default"?(console.log("Pengguna menutup kotak dialog permintaan izin"),!1):!0}static async subscribePushMessage(t){var e;console.log("Subscribing to push messages");try{const s=await((e=navigator.serviceWorker)==null?void 0:e.ready),o=await(s==null?void 0:s.pushManager.getSubscription());if(o)return localStorage.setItem("pushSubscription",JSON.stringify(o)),this.updateSubscribeButtonState(t,!0),o;console.log("Creating new push subscription...");const i=await(s==null?void 0:s.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Kt(b.VAPID_PUBLIC_KEY)})),a=i.toJSON();console.log("Push subscription created:",a),console.log("Sending subscription to server...");const c=await n(this,z).subscribePushNotification({endpoint:a.endpoint,keys:{p256dh:a.keys.p256dh,auth:a.keys.auth}});return console.log("Server response:",c),localStorage.setItem("pushSubscription",JSON.stringify(i)),this.updateSubscribeButtonState(t,!0),console.log("Successfully subscribed to push messages"),i}catch(s){throw console.error("Failed to subscribe:",s),localStorage.removeItem("pushSubscription"),s}}static async unsubscribePushMessage(t){var e;try{const s=localStorage.getItem("pushSubscription");if(s){const a=JSON.parse(s);await n(this,z).unsubscribePushNotification({endpoint:a.endpoint})}const o=await((e=navigator.serviceWorker)==null?void 0:e.ready),i=await(o==null?void 0:o.pushManager.getSubscription());i&&await i.unsubscribe(),localStorage.removeItem("pushSubscription"),this.updateSubscribeButtonState(t,!1)}catch(s){throw console.error("Failed to unsubscribe:",s),s}}static async updateSubscribeButtonState(t,e){if(console.log(t),!!t)if(console.log(e),e){t.innerHTML=mt();const s=t.querySelector("#unsubscribe-button");s&&s.addEventListener("click",async()=>{await this.unsubscribePushMessage(t)})}else{t.innerHTML=tt();const s=t.querySelector("#subscribe-button");s&&s.addEventListener("click",async()=>{await this.requestPermission()&&await this.subscribePushMessage(t)})}}}z=new WeakMap,N=new WeakSet,Ct=async function(){var s;const t=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),e=/iPhone|iPad|iPod/i.test(navigator.userAgent);if(!("Notification"in window))return console.log("Browser tidak mendukung notifikasi"),!1;if(!("serviceWorker"in navigator))return console.log("Browser tidak mendukung service worker"),!1;if(e)return console.log("Push notifications tidak didukung di iOS"),!1;if(t&&!("PushManager"in window))return console.log("Push notifications tidak didukung di perangkat ini"),!1;try{console.log("Registering service worker...");const o=await((s=navigator.serviceWorker)==null?void 0:s.ready);return console.log("Service Worker ready:",o),console.log("VAPID Key:",b.VAPID_PUBLIC_KEY),!0}catch(o){return console.error("Service Worker not ready:",o),!1}},It=function(){const t=document.getElementById("push-notification-container");if(!t)return;t.innerHTML=`
      <button class="notification-button" disabled title="Notifikasi tidak didukung di perangkat ini">
        <i class="fas fa-bell-slash"></i>
        <span>Notifikasi Tidak Didukung</span>
      </button>
    `;const e=`
      .notification-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        opacity: 0.7;
      }
    `,s=document.createElement("style");s.textContent=e,document.head.appendChild(s)},Bt=async function(){const t=document.getElementById("push-notification-container");if(console.log("Notification container:",t),!t){console.log("Notification container not found");return}console.log("Setting up notification button"),t.innerHTML="";try{const e=await this.checkSubscription();if(console.log("Is subscribed:",e),e){t.innerHTML=mt();const s=t.querySelector("#unsubscribe-button");s&&s.addEventListener("click",async()=>{try{console.log("Unsubscribe clicked"),await this.unsubscribePushMessage(t)}catch(o){console.error("Error unsubscribing:",o),alert("Gagal berhenti berlangganan. Silakan coba lagi.")}})}else{t.innerHTML=tt();const s=t.querySelector("#subscribe-button");s&&s.addEventListener("click",async()=>{try{console.log("Subscribe clicked"),await this.requestPermission()?await this.subscribePushMessage(t):alert("Mohon izinkan notifikasi untuk mendapatkan pemberitahuan.")}catch(o){console.error("Error subscribing:",o),o.name==="NotAllowedError"?alert("Mohon izinkan notifikasi di pengaturan browser Anda."):alert("Gagal berlangganan. Silakan coba lagi.")}})}}catch(e){console.error("Error setting up notification button:",e),t.innerHTML=tt()}},h(lt,N),h(lt,z,null);var H,J,R,Dt,et;class Se{constructor({content:t,skipLinkButton:e}){h(this,R);h(this,H);h(this,J);g(this,H,t),g(this,J,e),nt.setApp(this),p(this,R,Dt).call(this)}getContent(){return n(this,H)}updateNavigation(){p(this,R,et).call(this)}async initializeApp(){await Z.init(gt),await p(this,R,et).call(this),setInterval(()=>{m.clearOldCache()},60*60*1e3)}}H=new WeakMap,J=new WeakMap,R=new WeakSet,Dt=function(){Yt(n(this,J),n(this,H)),p(this,R,et).call(this),nt.init()},et=async function(){const t=!!L(),e=document.getElementById("navigation-drawer"),s=e==null?void 0:e.children.namedItem("navlist-main"),o=e==null?void 0:e.children.namedItem("navlist");if(!t){s&&(s.innerHTML=""),o&&(o.innerHTML=be());return}s&&o&&(s.innerHTML=ve(),o.innerHTML=we());const i=document.getElementById("logout-button");i&&i.addEventListener("click",a=>{a.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&(St(),location.hash="/login")}),t&&await lt.init(gt)};var B,$,D,O,w,F,v,X,k,Ot,Ft,Rt,ut;const ht=class ht{constructor({video:t,cameraSelect:e,canvas:s,options:o={}}){h(this,k);h(this,B);h(this,$,!1);h(this,D,640);h(this,O,0);h(this,w);h(this,F);h(this,v);h(this,X);g(this,w,t),g(this,F,e),g(this,v,s),p(this,k,Ot).call(this)}static addNewStream(t){if(!Array.isArray(window.currentStreams)){window.currentStreams=[t];return}window.currentStreams=[...window.currentStreams,t]}static stopAllStreams(){if(!Array.isArray(window.currentStreams)){window.currentStreams=[];return}window.currentStreams.forEach(t=>{t.active&&t.getTracks().forEach(e=>e.stop())})}async launch(){g(this,B,await p(this,k,Rt).call(this)),ht.addNewStream(n(this,B)),n(this,w).srcObject=n(this,B),n(this,w).play(),p(this,k,ut).call(this)}stop(){n(this,w)&&(n(this,w).srcObject=null,g(this,$,!1)),n(this,B)instanceof MediaStream&&n(this,B).getTracks().forEach(t=>{t.stop()}),p(this,k,ut).call(this)}async takePicture(){if(!(n(this,D)&&n(this,O)))return null;const t=n(this,v).getContext("2d");return n(this,v).width=n(this,D),n(this,v).height=n(this,O),t.drawImage(n(this,w),0,0,n(this,D),n(this,O)),await new Promise(e=>{n(this,v).toBlob(s=>e(s))})}addCheeseButtonListener(t,e){g(this,X,document.querySelector(t)),n(this,X).onclick=e}};B=new WeakMap,$=new WeakMap,D=new WeakMap,O=new WeakMap,w=new WeakMap,F=new WeakMap,v=new WeakMap,X=new WeakMap,k=new WeakSet,Ot=function(){n(this,w).oncanplay=()=>{n(this,$)||(g(this,O,n(this,w).videoHeight*n(this,D)/n(this,w).videoWidth),n(this,v).setAttribute("width",n(this,D)),n(this,v).setAttribute("height",n(this,O)),g(this,$,!0))},n(this,F).onchange=async()=>{await this.stop(),await this.launch()}},Ft=async function(t){try{if(!(t instanceof MediaStream))return Promise.reject(Error("MediaStream not found!"));const{deviceId:e}=t.getVideoTracks()[0].getSettings(),i=(await navigator.mediaDevices.enumerateDevices()).filter(a=>a.kind==="videoinput").reduce((a,c,l)=>a.concat(`
          <option
            value="${c.deviceId}"
            ${e===c.deviceId?"selected":""}
          >
            ${c.label||`Camera ${l+1}`}
          </option>
        `),"");n(this,F).innerHTML=i}catch(e){console.error("#populateDeviceList: error:",e)}},Rt=async function(){try{const t=!n(this,$)&&!n(this,F).value?void 0:{exact:n(this,F).value},e=await navigator.mediaDevices.getUserMedia({video:{aspectRatio:4/3,deviceId:t}});return await p(this,k,Ft).call(this,e),e}catch(t){return console.error("#getStream: error:",t),null}},ut=function(){const t=n(this,v).getContext("2d");t.fillStyle="#AAAAAA",t.fillRect(0,0,n(this,v).width,n(this,v).height)};let dt=ht;var T,f,Q,C,A,Nt,jt,$t,Mt;class j{static init(){g(this,T,document.getElementById("drawer-button")),g(this,f,document.getElementById("navigation-drawer")),g(this,Q,!1),g(this,C,!1),!n(this,Q)&&(p(this,A,Nt).call(this),p(this,A,jt).call(this),this.initialized=!0)}static isDrawerOpen(){return n(this,f).classList.contains("open")}static toggleDrawer(){window.innerWidth>768||(this.isDrawerOpen()?this.closeDrawer():this.openDrawer())}static openDrawer(){n(this,C)||window.innerWidth>768||(n(this,f).style.visibility="visible",requestAnimationFrame(()=>{n(this,T).classList.add("open"),n(this,f).classList.remove("closing"),n(this,f).classList.add("open"),n(this,f).style.transform="translateX(0%)",document.body.classList.add("drawer-open"),setTimeout(()=>{document.body.classList.add("overlay-visible")},50)}))}static closeDrawer(){n(this,C)||window.innerWidth>768||(g(this,C,!0),n(this,T).classList.remove("open"),n(this,f).classList.add("closing"),requestAnimationFrame(()=>{n(this,f).classList.remove("open"),n(this,f).style.transform="translateX(100%)",document.body.classList.remove("overlay-visible"),setTimeout(()=>{document.body.classList.remove("drawer-open"),n(this,f).style.visibility="visible",g(this,C,!1)},300)}))}static updateActiveLink(){const t=window.location.hash||"#/";n(this,f).querySelectorAll("a").forEach(s=>{s.getAttribute("href")===t?s.classList.add("active"):s.classList.remove("active")})}}T=new WeakMap,f=new WeakMap,Q=new WeakMap,C=new WeakMap,A=new WeakSet,Nt=function(){window.innerWidth<=768&&(n(this,f).style.visibility="hidden",n(this,f).style.transform="translateX(100%)")},jt=function(){var t;(t=n(this,T))==null||t.addEventListener("click",e=>{e.stopPropagation(),console.log(e),this.toggleDrawer()}),window.addEventListener("resize",()=>{p(this,A,$t).call(this)}),document.addEventListener("click",e=>{this.isDrawerOpen()&&!n(this,f).contains(e.target)&&!n(this,T).contains(e.target)&&this.closeDrawer()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isDrawerOpen()&&this.closeDrawer()}),n(this,f).addEventListener("transitionend",e=>{p(this,A,Mt).call(this,e)}),window.addEventListener("hashchange",()=>{window.innerWidth<=768&&this.closeDrawer()})},$t=function(){window.innerWidth>768?(n(this,f).style.visibility="visible",n(this,f).classList.remove("open","closing"),n(this,T).classList.remove("open"),document.body.classList.remove("drawer-open","overlay-visible"),n(this,f).style.transform="none"):this.isDrawerOpen()||(n(this,f).style.visibility="hidden",n(this,f).style.transform="translateX(100%)")},Mt=function(t){t.propertyName==="transform"&&!this.isDrawerOpen()&&window.innerWidth<=768&&(n(this,f).style.visibility="hidden",n(this,f).classList.remove("closing"),g(this,C,!1))},h(j,A),h(j,T),h(j,f),h(j,Q),h(j,C);document.addEventListener("DOMContentLoaded",async()=>{await new Se({content:document.getElementById("main-content"),skipLinkButton:document.getElementById("skip-link")}).initializeApp(),j.init(),nt.onHashChange(()=>{j.init(),dt.stopAllStreams()}),await m.init()});export{Ee as A,dt as C,Z as F,m as I,gt as S,Le as a,Pe as b,Ae as c,Ie as d,ke as e,Te as f,Ce as g,Be as h,b as i,Wt as p};
