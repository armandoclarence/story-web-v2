const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/js/home-page.js","assets/js/api-mapper.js","assets/js/map.js","assets/js/ui-templates.js","assets/js/new-page.js","assets/js/form-templates.js","assets/js/new-guest-page.js","assets/js/story-detail-page.js","assets/js/favorites-page.js"])))=>i.map(i=>d[i]);
var xt=Object.defineProperty;var ht=r=>{throw TypeError(r)};var Ut=(r,t,e)=>t in r?xt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var rt=(r,t,e)=>Ut(r,typeof t!="symbol"?t+"":t,e),ot=(r,t,e)=>t.has(r)||ht("Cannot "+e);var a=(r,t,e)=>(ot(r,t,"read from private field"),e?e.call(r):t.get(r)),u=(r,t,e)=>t.has(r)?ht("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(r):t.set(r,e),p=(r,t,e,s)=>(ot(r,t,"write to private field"),s?s.call(r,e):t.set(r,e),e),f=(r,t,e)=>(ot(r,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();const zt="modulepreload",Ht=function(r){return"/story-web-v2/"+r},ft={},P=function(t,e,s){let o=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),c=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));o=Promise.allSettled(e.map(l=>{if(l=Ht(l),l in ft)return;ft[l]=!0;const m=l.endsWith(".css"),q=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${q}`))return;const E=document.createElement("link");if(E.rel=m?"stylesheet":zt,m||(E.as="script"),E.crossOrigin="",E.href=l,c&&E.setAttribute("nonce",c),document.head.appendChild(E),m)return new Promise((x,qt)=>{E.addEventListener("load",x),E.addEventListener("error",()=>qt(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(n){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=n,window.dispatchEvent(c),!c.defaultPrevented)throw n}return o.then(n=>{for(const c of n||[])c.status==="rejected"&&i(c.reason);return t().catch(i)})};function yt(r){const t=r.split("/");return{resource:t[1]||null,id:t[2]||null}}function Wt(r){let t="";return r.resource&&(t=t.concat(`/${r.resource}`)),r.id&&(t=t.concat("/:id")),t||"/"}function vt(){return location.hash.replace("#","")||"/"}function wt(){const r=vt(),t=yt(r);return Wt(t)}function Gt(){const r=vt();return yt(r)}const b={BASE_URL:"https://story-api.dicoding.dev/v1",ACCESS_TOKEN_KEY:"accessToken",MAP_SERVICE_API_KEY:"VKEpsF8VPnGlVLwqQkzA",VAPID_PUBLIC_KEY:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"};function L(){try{const r=localStorage.getItem(b.ACCESS_TOKEN_KEY);return r==="null"||r==="undefined"?null:r}catch(r){return console.error("getAccessToken: error:",r),null}}function Vt(r){try{return localStorage.setItem(b.ACCESS_TOKEN_KEY,r),!0}catch(t){return console.error("putAccessToken: error:",t),!1}}function bt(){try{return localStorage.removeItem(b.ACCESS_TOKEN_KEY),!0}catch(r){return console.error("getLogout: error:",r),!1}}const Kt=["/login","/register"];function G(r){const t=wt(),e=!!L();return Kt.includes(t)&&e?(location.hash="/",null):r}function V(r){return!L()?(location.hash="/login",null):r}function St(){bt()}const Ee=Object.freeze(Object.defineProperty({__proto__:null,checkAuthenticatedRoute:V,checkUnauthenticatedRouteOnly:G,getAccessToken:L,getLogout:St,putAccessToken:Vt,removeAccessToken:bt},Symbol.toStringTag,{value:"Module"}));function _t(r,t="en-US",e={}){return new Date(r).toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric",...e})}async function Ae(r,t={}){const{tns:e}=await P(async()=>{const{tns:s}=await import("./tiny-slider.js").then(o=>o.t);return{tns:s}},[]);return e({container:r,mouseDrag:!0,swipeAngle:!1,speed:600,nav:!0,navPosition:"bottom",autoplay:!1,controls:!1,...t})}function Le(r,t="",e=512){const s=atob(r),o=[];for(let i=0;i<s.length;i+=e){const n=s.slice(i,i+e),c=new Array(n.length);for(let m=0;m<n.length;m++)c[m]=n.charCodeAt(m);const l=new Uint8Array(c);o.push(l)}return new Blob(o,{type:t})}function Yt(r){const t="=".repeat((4-r.length%4)%4),e=(r+t).replace(/-/g,"+").replace(/_/g,"/"),s=atob(e),o=new Uint8Array(s.length);for(let i=0;i<s.length;i++)o[i]=s.charCodeAt(i);return o}function Jt(r,t){r==null||r.addEventListener("click",()=>t==null?void 0:t.focus())}function Xt({skipTransition:r=!1,updateDOM:t}){if(r||!document.startViewTransition){const e=Promise.resolve(t()).then(()=>{});return{ready:Promise.reject(Error("View transitions unsupported")),updateCallbackDone:e,finished:e}}return document.startViewTransition(t)}const I=async(r,t)=>{const e=await r();return t(new e.default)},Qt={"/login":()=>I(()=>P(()=>import("./login-page.js"),[]),G),"/register":()=>I(()=>P(()=>import("./register-page.js"),[]),G),"/":()=>I(()=>P(()=>import("./home-page.js"),__vite__mapDeps([0,1,2,3])),V),"/new":()=>I(()=>P(()=>import("./new-page.js"),__vite__mapDeps([4,5,3,2])),V),"/new-guest":()=>I(()=>P(()=>import("./new-guest-page.js"),__vite__mapDeps([6,5,3,2])),G),"/stories/:id":()=>I(()=>P(()=>import("./story-detail-page.js"),__vite__mapDeps([7,3,1,2])),V),"/favorites":()=>I(()=>P(()=>import("./favorites-page.js"),__vite__mapDeps([8,1,2])),V),"/404":()=>I(()=>P(()=>import("./not-found-page.js"),[]),G)},d={name:"StoryAppDB",version:2,stores:{favorites:"favorites",apiCache:"apiCache"}};function Zt(){return new Promise((r,t)=>{console.log("Opening IndexedDB...");const e=indexedDB.open(d.name,d.version);e.onupgradeneeded=s=>{console.log("Database upgrade needed...");const o=s.target.result;if(console.log("Existing stores:",Array.from(o.objectStoreNames)),o.objectStoreNames.contains(d.stores.favorites)||(console.log("Creating favorites store..."),o.createObjectStore(d.stores.favorites,{keyPath:"storyId"}).createIndex("updatedAt","updatedAt",{unique:!1})),!o.objectStoreNames.contains(d.stores.apiCache)){console.log("Creating apiCache store...");const i=o.createObjectStore(d.stores.apiCache,{keyPath:"url"});i.createIndex("timestamp","timestamp",{unique:!1}),i.createIndex("type","type",{unique:!1})}console.log("Final stores:",Array.from(o.objectStoreNames))},e.onsuccess=s=>{const o=s.target.result;console.log("Database opened successfully. Available stores:",Array.from(o.objectStoreNames)),r(o)},e.onerror=s=>{console.error("Error initializing IndexedDB:",s.target.error),t(s.target.error)},e.onblocked=s=>{console.warn("Database opening blocked. Please close other tabs and reload."),alert("Please close all other tabs with this site open and reload this page.")}})}function st(){return new Promise((r,t)=>{const e=indexedDB.open(d.name,d.version);e.onupgradeneeded=s=>{const o=s.target.result;o.objectStoreNames.contains(d.stores.favorites)||o.createObjectStore(d.stores.favorites,{keyPath:"storyId"})},e.onsuccess=()=>r(e.result),e.onerror=()=>t(e.error)})}async function te(r){return new Promise(async(t,e)=>{const i=(await st()).transaction([d.stores.favorites],"readwrite").objectStore(d.stores.favorites),n={...r,updatedAt:new Date().toISOString(),createdAt:new Date().toISOString()},c=i.put(n);c.onsuccess=async()=>{try{const l=await caches.open("api-cache-v1"),m=new Response(JSON.stringify({story:r}),{headers:{"Content-Type":"application/json"}});await l.put(`https://story-api.dicoding.dev/v1/stories/${r.id}`,m)}catch(l){console.warn("Failed to cache story:",l)}t()},c.onerror=l=>{console.error("Error adding favorite:",l.target.error),e(l.target.error)}})}async function ee(r){return new Promise(async(t,e)=>{const i=(await st()).transaction([d.stores.favorites],"readwrite").objectStore(d.stores.favorites),n=i.get(r);n.onsuccess=async()=>{if(n.result){const c=i.delete(n.result.id);c.onsuccess=async()=>{try{await(await caches.open("api-cache-v1")).delete(`/api/stories/${r}`),g.broadcastChange({type:"remove",storyId:r}),t()}catch(l){console.warn("Failed to remove from cache:",l),t()}},c.onerror=l=>{console.error("Error deleting from IndexedDB:",l.target.error),e(l.target.error)}}else t()},n.onerror=c=>{console.error("Error accessing IndexedDB:",c.target.error),e(c.target.error)}})}async function se(){return new Promise(async(r,t)=>{const e=await st(),i=await e.transaction(d.stores.favorites,"readonly").objectStore(d.stores.favorites).getAll();e.close(),i.onsuccess=()=>{console.log("stories",i.result),r(i.result)},i.onerror=n=>{console.error("Error getting all stories:",n.target.error),t(n.target.error)}})}async function re(r){return new Promise(async(t,e)=>{const n=(await st()).transaction(d.stores.favorites,"readonly").objectStore(d.stores.favorites).get(r);n.onsuccess=()=>{console.log("story",n.result),t(n.result)},n.onerror=c=>{console.error("Error getting story by id:",c.target.error),e(c.target.error)}})}async function oe(r){return await re(r)!==void 0}var y,K,U,Y,it;class g{static async init(){if(a(this,K))return a(this,y);try{return p(this,y,await Zt()),p(this,K,!0),a(this,y)}catch(t){throw console.error("Failed to initialize IndexedDB:",t),t}}static async addToFavorites(t){return new Promise((e,s)=>{const i=a(this,y).transaction([d.stores.favorites],"readwrite").objectStore(d.stores.favorites),n={storyId:t.id,story:t,timestamp:Date.now(),updatedAt:new Date().toISOString()},c=i.put(n);c.onsuccess=()=>{this.broadcastChange({type:"add",storyId:t.id}),e()},c.onerror=()=>s(c.error)})}static async removeFromFavorites(t){return new Promise((e,s)=>{const n=a(this,y).transaction([d.stores.favorites],"readwrite").objectStore(d.stores.favorites).delete(t);n.onsuccess=()=>{this.broadcastChange({type:"remove",storyId:t}),e()},n.onerror=()=>s(n.error)})}static async getFavorites(){return new Promise((t,e)=>{const i=a(this,y).transaction([d.stores.favorites],"readonly").objectStore(d.stores.favorites).getAll();i.onsuccess=()=>{const n=i.result.map(c=>c.story);t(n)},i.onerror=()=>e(i.error)})}static async isFavorite(t){return new Promise((e,s)=>{const n=a(this,y).transaction([d.stores.favorites],"readonly").objectStore(d.stores.favorites).get(t);n.onsuccess=()=>e(!!n.result),n.onerror=()=>s(n.error)})}static broadcastChange(t){new BroadcastChannel("favorites-sync").postMessage(t)}static async clearOldCache(){return new Promise((t,e)=>{const s=a(this,y).transaction([d.stores.favorites],"readwrite"),o=s.objectStore(d.stores.favorites),i=Date.now()-30*24*60*60*1e3,n=o.openCursor();n.onsuccess=c=>{const l=c.target.result;l&&(l.value.timestamp<i&&l.delete(),l.continue())},s.oncomplete=()=>t(),s.onerror=()=>e(s.error)})}static listenToChanges(t){const e=new BroadcastChannel("favorites-sync");return e.onmessage=s=>{t(s.data)},()=>e.close()}static async cacheAPIResponse(t,e,s="story"){try{const i=a(this,y).transaction([d.stores.apiCache],"readwrite").objectStore(d.stores.apiCache),n={url:t,data:e,type:s,timestamp:Date.now()};if(await new Promise((c,l)=>{const m=i.put(n);m.onsuccess=()=>c(),m.onerror=()=>l(m.error)}),f(this,Y,it).call(this))try{const c=await caches.open(a(this,U)),l=new Response(JSON.stringify(e),{headers:{"Content-Type":"application/json","Cache-Control":"max-age=86400"}});await c.put(t,l),console.log("Cached in both IndexedDB and Cache Storage:",t)}catch(c){console.warn("Cache Storage failed, using IndexedDB only:",c)}else console.log("Cache Storage not available, using IndexedDB only")}catch(o){throw console.error("Error caching API response:",o),o}}static async getFromAPICache(t){try{if(f(this,Y,it).call(this))try{const o=await(await caches.open(a(this,U))).match(t);if(o){const i=await o.json();return console.log("Found in Cache Storage:",t),i}}catch(s){console.warn("Cache Storage access failed:",s)}const e=await new Promise((s,o)=>{const c=a(this,y).transaction([d.stores.apiCache],"readonly").objectStore(d.stores.apiCache).get(t);c.onsuccess=()=>{var l;return s(((l=c.result)==null?void 0:l.data)||null)},c.onerror=()=>o(c.error)});return e?(console.log("Found in IndexedDB:",t),e):null}catch(e){return console.error("Error fetching from cache:",e),null}}static async clearAPICache(t=24*60*60*1e3){try{const s=a(this,y).transaction([d.stores.apiCache],"readwrite").objectStore(d.stores.apiCache),o=Date.now()-t;await new Promise((l,m)=>{const q=s.openCursor();q.onsuccess=E=>{const x=E.target.result;x?(x.value.timestamp<o&&x.delete(),x.continue()):l()},q.onerror=()=>m(q.error)});const i=await caches.open(a(this,U)),c=(await i.keys()).map(async l=>{const m=await i.match(l);if(new Date(m.headers.get("date")).getTime()<o)return i.delete(l)});await Promise.all(c),console.log("API cache cleared successfully")}catch(e){console.error("Error clearing API cache:",e)}}static async fetchWithCache(t,e={}){try{const s=await this.getFromAPICache(t);if(s)return s;const i=await(await fetch(t,e)).json();return await this.cacheAPIResponse(t,i),i}catch(s){throw console.error("Error fetching with cache:",s),s}}static async getAllFavorites(){try{return await new Promise((e,s)=>{const n=a(this,y).transaction([d.stores.favorites],"readonly").objectStore(d.stores.favorites).getAll();n.onsuccess=()=>{const c=n.result.map(l=>({id:l.storyId,...l.story,isFavorite:!0,timestamp:l.timestamp,updatedAt:l.updatedAt}));c.sort((l,m)=>m.timestamp-l.timestamp),e(c)},n.onerror=()=>s(n.error)})}catch(t){return console.error("Error getting all favorites:",t),[]}}static async syncFavorites(t=[]){try{const e=await this.getAllFavorites(),s=t.map(async o=>{const i=e.find(n=>n.id===o.id);if(i)return this.cacheAPIResponse(`https://story-api.dicoding.dev/v1/stories/${o.id}`,{...o,isFavorite:!0,favoriteTimestamp:i.favoriteTimestamp,updatedAt:new Date().toISOString()})});await Promise.all(s),console.log("Favorites synced with server data")}catch(e){console.error("Error syncing favorites:",e)}}static async getFavorite(t){return new Promise((e,s)=>{const n=a(this,y).transaction([d.stores.favorites],"readonly").objectStore(d.stores.favorites).get(t);n.onsuccess=()=>{n.result?e({id:n.result.storyId,...n.result.story,isFavorite:!0,timestamp:n.result.timestamp,updatedAt:n.result.updatedAt}):e(null)},n.onerror=()=>s(n.error)})}}y=new WeakMap,K=new WeakMap,U=new WeakMap,Y=new WeakSet,it=function(){return"caches"in window&&window.isSecureContext},u(g,Y),u(g,y,null),u(g,K,!1),u(g,U,"api-cache-v1");class ie{constructor(){rt(this,"handleTouchStart",t=>{t.target.classList.add("active")});rt(this,"handleTouchEnd",t=>{t.target.classList.remove("active");const e=t.target.closest(".nav-link");e&&(t.preventDefault(),e.tagName==="A"?window.location.href=e.href:e.tagName==="BUTTON"&&e.click())});this.lastAttemptedHash=null,this.hashChangeCallbacks=[],this.content=null,this.app=null,this.isGitHubPages=window.location.hostname.includes("github.io"),this.basePath=this.isGitHubPages?"/story-web-v2":""}setApp(t){this.app=t,this.content=t.getContent()}init(){window.addEventListener("load",()=>{this.handleRoute()}),window.addEventListener("hashchange",async t=>{t.preventDefault(),await this.handleRoute(),this.hashChangeCallbacks.forEach(e=>e())}),window.addEventListener("online",()=>{document.body.classList.remove("offline-mode"),this.lastAttemptedHash&&(window.location.hash=this.lastAttemptedHash,this.lastAttemptedHash=null)}),window.addEventListener("offline",()=>{document.body.classList.add("offline-mode"),this.lastAttemptedHash=window.location.hash}),this.setupNavigationHandlers()}onHashChange(t){this.hashChangeCallbacks.push(t)}async handleRoute(){const t=wt(),e=Gt(),s=!!L();try{if(!s&&t==="/"){window.location.hash="#/login",await this.handleRoute();return}if(!navigator.onLine&&s&&["/login","/register","/new-guest"].includes(t)){window.location.hash="#/";return}if(!navigator.onLine&&!s&&["/","/favorites","/new"].includes(t)){window.location.hash="#/login";return}const o=Qt[t];if(!o){window.location.hash="#/404";return}const i=await o();if(!i){window.location.hash="#/404";return}if(this.setupMobileNavigation(),i.requiresAuth&&!s){window.location.hash="#/login";return}if(i.requiresUnauth&&s){window.location.hash="#/";return}if(!s&&window.location.hash=="#/"){window.location.hash="#/login";return}if(!navigator.onLine&&s&&i.offlineSupport){await this.handleOfflineRoute(e,i);return}await this.renderPageWithTransition(i),this.app&&this.app.updateNavigation()}catch(o){console.error("Route handling error:",o),window.location.hash="#/404"}}async renderPageWithTransition(t,e=null){if(!this.content)return;if(navigator.onLine){const o=document.querySelector(".offline-banner");o&&o.remove()}const s=Xt({updateDOM:async()=>{window.scrollTo(0,0);try{this.content.style.opacity="0",this.content.innerHTML=await t.render(e),requestAnimationFrame(()=>{this.content.style.opacity="1"}),t.afterRender&&await t.afterRender()}catch(o){console.error("Error rendering page:",o),this.content.innerHTML="<h1>Error loading page</h1>"}}});return s.ready.catch(console.error),s.updateCallbackDone}async handleOfflineRoute(t,e){if(e.requiresOnline!==!1){const s=await this.checkCachedData(t);s&&await this.renderWithOfflineIndicator(e,s);return}await this.renderPageWithTransition(e)}async checkCachedData(t){try{return t.resource==="stories"&&t.id?await g.getFavorite(t.id):t.resource==="favorites"?await g.getAllFavorites():!0}catch(e){return console.error("Error checking cached data:",e),null}}async renderWithOfflineIndicator(t,e){this.showOfflineBanner(),await this.renderPageWithTransition(t,e)}showOfflineBanner(){if(!document.querySelector(".offline-banner")){const t=document.createElement("div");t.className="offline-banner",t.innerHTML=`
        <div class="offline-banner__content">
          <i class="fas fa-wifi-slash"></i>
          <span>Anda sedang offline. Menampilkan konten tersimpan.</span>
          <button class="offline-banner__retry">Coba Lagi</button>
        </div>
      `,t.querySelector(".offline-banner__retry").addEventListener("click",()=>{window.location.reload()}),document.body.insertBefore(t,document.body.firstChild)}}setupMobileNavigation(){document.querySelectorAll(".nav-link").forEach(e=>{e.removeEventListener("touchstart",this.handleTouchStart),e.removeEventListener("touchend",this.handleTouchEnd),e.addEventListener("touchstart",this.handleTouchStart),e.addEventListener("touchend",this.handleTouchEnd)})}setupNavigationHandlers(){document.addEventListener("click",t=>{var s;const e=t.target.closest("a, button.nav-link");if(e)if(e.tagName==="A"&&((s=e.getAttribute("href"))!=null&&s.startsWith("#"))){t.preventDefault();const o=e.getAttribute("href");window.location.hash=o}else e.id==="logout-button"&&(t.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&this.handleLogout())})}}const ne=`
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
`,kt=document.createElement("style");kt.textContent=ne;document.head.appendChild(kt);const nt=new ie;var z,S,_,Et,At,Lt,at;class Z{static async init(t){if(!a(this,S))try{p(this,z,t),await g.init(),f(this,_,Et).call(this),f(this,_,At).call(this),p(this,S,!0),console.log("FavoriteManager initialized successfully")}catch(e){throw console.error("Error initializing FavoriteManager:",e),e}}static async refreshFavorites(t=null){try{const e=await this.getAllFavorites();if(console.log("Refreshed favorites:",e),t){const s=await this.isFavorite(t);if(document.querySelectorAll(`[data-story-id="${t}"]`).forEach(i=>f(this,_,at).call(this,i,s)),!s){const i=document.getElementById("favorites-list");if(i){const n=i.querySelector(`[data-story-id="${t}"]`).closest(".story-item");if(n&&(n.classList.add("removing"),await new Promise(l=>{n.addEventListener("transitionend",()=>{n.remove(),l()},{once:!0})}),i.querySelectorAll(".story-item").length===0)){i.innerHTML="<p>Belum ada cerita favorit.</p>";const l=document.getElementById("pagination-container");l&&(l.innerHTML="")}}}}else if(document.getElementById("favorites-list")){const o=new CustomEvent("favorites-updated",{detail:{favorites:e,currentPage:1,pageSize:10}});document.dispatchEvent(o)}}catch(e){console.error("Error refreshing favorites:",e);const s=new CustomEvent("favorites-update-error",{detail:e});document.dispatchEvent(s)}}static async addFavorite(t){if(!a(this,S))throw new Error("FavoriteManager not initialized");try{await g.addToFavorites(t),console.log("Story added to favorites:",t.id),await this.refreshFavorites()}catch(e){throw console.error("Error adding favorite:",e),e}}static async removeFavorite(t){if(!a(this,S))throw new Error("FavoriteManager not initialized");try{await g.removeFromFavorites(t),console.log("Story removed from favorites:",t),await this.refreshFavorites(t)}catch(e){throw console.error("Error removing favorite:",e),e}}static async isFavorite(t){if(!a(this,S))throw new Error("FavoriteManager not initialized");try{return await g.isFavorite(t)}catch(e){return console.error("Error checking favorite status:",e),!1}}static async getAllFavorites(){if(!a(this,S))throw new Error("FavoriteManager not initialized");try{return await g.getAllFavorites()}catch(t){return console.error("Error getting all favorites:",t),[]}}static async toggleFavorite(t){try{const e=await g.isFavorite(t.id);return e?await g.removeFromFavorites(t.id):await g.addToFavorites(t),!e}catch(e){throw console.error("Error toggling favorite:",e),e}}static async getFavorites(t){try{return await g.getFavorites(t)}catch(e){return console.error("Error getting favorites:",e),[]}}}z=new WeakMap,S=new WeakMap,_=new WeakSet,Et=function(){const t=new BroadcastChannel("favorites-sync");t.onmessage=async e=>{const s=e.data;(s.type==="remove"||s.type==="add"||s.type==="update")&&(await this.refreshFavorites(),document.querySelectorAll(`[data-story-id="${s.storyId}"]`).forEach(async i=>{const n=await this.isFavorite(s.storyId);f(this,_,at).call(this,i,n)}))}},At=function(){document.addEventListener("click",async t=>{const e=t.target.closest(".story-item__favorite, .story-detail__favorite");if(e){const s=e.dataset.storyId,o=e.classList.contains("active");try{if(!a(this,S))throw new Error("FavoriteManager not initialized");if(o)await this.removeFavorite(s);else{const i=await f(this,_,Lt).call(this,s);console.log(i),i&&await this.addFavorite(i)}}catch(i){console.error("Error toggling favorite:",i),alert("Gagal mengubah status favorit.")}}})},Lt=async function(t){if(!a(this,S))throw new Error("FavoriteManager not initialized");try{const e=await g.getFavorite(t);if(e)return e;if(!a(this,z))throw new Error("API model not initialized");const s=await a(this,z).getStoryById(t);if(!s.ok)throw new Error("Failed to fetch story");return s.story}catch(e){throw console.error("Error fetching story:",e),e}},at=function(t,e){const s=t.querySelector("i");e?(t.classList.add("active"),s==null||s.classList.remove("far"),s==null||s.classList.add("fas"),t.setAttribute("aria-label","Remove from favorites")):(t.classList.remove("active"),s==null||s.classList.remove("fas"),s==null||s.classList.add("far"),t.setAttribute("aria-label","Add to favorites"))},u(Z,_),u(Z,z,null),u(Z,S,!1);const ae=b.BASE_URL,Pt=async(r,t={})=>{const e=`${ae}/${r}`,s=L();if(!navigator.onLine){console.log("Offline - checking cache for:",e);const o=await g.getFromAPICache(e);return o?(console.log("Found cached data for:",e),{ok:!0,...o,isFromCache:!0}):{ok:!1,error:"Offline and no cached data available"}}try{const o=await fetch(e,{...t,headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{},...t.headers}});if(!o.ok)throw new Error("Network response was not ok");const i=await o.json();return console.log("Caching successful response for:",e),await g.cacheAPIResponse(e,i),{ok:!0,...i}}catch(o){console.error("Fetch error:",o),console.log("Trying cache after fetch error for:",e);const i=await g.getFromAPICache(e);return i?(console.log("Found cached data after error for:",e),{ok:!0,...i,isFromCache:!0}):{ok:!1,error:o.message}}},W={REGISTER:`${b.BASE_URL}/register`,LOGIN:`${b.BASE_URL}/login`,STORE_NEW_STORY:`${b.BASE_URL}/stories`,STORE_NEW_STORY_GUEST:`${b.BASE_URL}/stories/guest`,SUBSCRIBE:`${b.BASE_URL}/notifications/subscribe`,UNSUBSCRIBE:`${b.BASE_URL}/notifications/subscribe`};async function ce({name:r,email:t,password:e}){const s=JSON.stringify({name:r,email:t,password:e}),o=await fetch(W.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:s});return{...await o.json(),ok:o.ok}}async function le({email:r,password:t}){const e=JSON.stringify({email:r,password:t}),s=await fetch(W.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:e});return{...await s.json(),ok:s.ok}}const de=async({page:r=1,size:t=10}={})=>Pt(`stories?page=${r}&size=${t}`),Tt=async r=>Pt(`stories/${r}`);async function ue({description:r,photo:t,lat:e,lon:s}){const o=L(),i=new FormData;i.set("description",r),i.set("photo",t[0].blob),i.set("lat",e),i.set("lon",s);const n=await fetch(W.STORE_NEW_STORY,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:i});return{...await n.json(),ok:n.ok}}async function he({description:r,photo:t,lat:e,lon:s}){const o=L(),i=new FormData;i.set("description",r),i.set("photo",t[0].blob),i.set("lat",e),i.set("lon",s);const n=await fetch(W.STORE_NEW_STORY_GUEST,{method:"POST",headers:{Authorization:`Bearer ${o}`},body:i});return{...await n.json(),ok:n.ok}}async function fe({endpoint:r,keys:{p256dh:t,auth:e}}){const s=L(),o=JSON.stringify({endpoint:r,keys:{p256dh:t,auth:e}}),i=await fetch(W.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:o});return{...await i.json(),ok:i.ok}}async function pe({endpoint:r}){const t=L(),e=JSON.stringify({endpoint:r}),s=await fetch(W.UNSUBSCRIBE,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:e});return{...await s.json(),ok:s.ok}}async function ge(r){try{const t=await Tt(r);return await te(t.story),t}catch(t){return{ok:!1,message:t.message}}}async function me(r){try{return await ee(r),{ok:!0}}catch(t){return{ok:!1,message:t.message}}}async function ye(){try{return{ok:!0,stories:await se()}}catch(r){return{ok:!1,message:r.message}}}async function ve(r){return await oe(r)}const pt=Object.freeze(Object.defineProperty({__proto__:null,getLogin:le,getRegistered:ce,getSavedStories:ye,getStories:de,getStoryById:Tt,isStorySaved:ve,removeStory:me,saveStory:ge,storeNewStory:ue,storeNewStoryGuest:he,subscribePushNotification:fe,unsubscribePushNotification:pe},Symbol.toStringTag,{value:"Module"}));function Pe(){return`
    <div id="stories-list-empty" class="stories-list__empty">
      <h2>Tidak ada story yang tersedia</h2>
      <p>Saat ini, tidak ada story yang dapat ditampilkan.</p>
    </div>
  `}function Te(r){return`
    <div id="stories-list-error" class="stories-list__error">
      <h2>Terjadi kesalahan pengambilan daftar story</h2>
      <p>${r||"Gunakan jaringan lain atau laporkan error ini."}</p>
    </div>
  `}function Ce(r){return`
    <div id="stories-detail-error" class="stories-detail__error">
      <h2>Terjadi kesalahan pengambilan detail story</h2>
      <p>${r||"Gunakan jaringan lain atau laporkan error ini."}</p>
    </div>
  `}const Ie=({id:r,description:t,photoUrl:e,createdAt:s,name:o,placeName:i,isFavorited:n,isOffline:c=!1})=>`
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
          class="story-item__favorite ${n?"active":""}" 
          data-story-id="${r}" 
          aria-label="${n?"Remove from favorites":"Add to favorites"}"
        >
          <i class="${n?"fas":"far"} fa-heart"></i>
        </button>
      </div>
    </div>
  </article>
`;function Be(r){return`
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
  `}function gt(){return`
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `}const De=(r=!1)=>`
  <button 
    id="story-detail-favorite" 
    class="story-detail__favorite ${r?"active":""}"
    aria-label="${r?"Remove from favorites":"Add to favorites"}"
  >
    <i class="${r?"fas":"far"} fa-heart"></i>
    <span>${r?"Hapus dari Favorit":"Tambah ke Favorit"}</span>
  </button>
`,we=()=>`
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
`,be=()=>`
  <li id="push-notification-container" class="push-notification-container">
    ${tt()}
  </li>
  <li>
    <button class="nav-menu__logout" id="logout-button">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </button>
  </li>
`,Se=()=>`
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
`;var $,R,Ct,It,Bt;class ct{static async init(t){if(p(this,$,t),!await f(this,R,Ct).call(this))return f(this,R,It).call(this),!1;let s=0;const o=5,i=async()=>{if(s>=o){console.log("Failed to find notification container after maximum attempts");return}await f(this,R,Bt).call(this),document.getElementById("push-notification-container")||(s++,setTimeout(i,1e3))};await i()}static async checkSubscription(){var t;try{const e=await((t=navigator.serviceWorker)==null?void 0:t.ready),s=await(e==null?void 0:e.pushManager.getSubscription());return console.log("Current subscription:",s),s?(localStorage.setItem("pushSubscription",JSON.stringify(s)),!0):(localStorage.removeItem("pushSubscription"),!1)}catch(e){return console.error("Error checking subscription status:",e),!1}}static async requestPermission(){const t=await Notification.requestPermission();return t==="denied"?(console.log("Notifikasi tidak diizinkan"),!1):t==="default"?(console.log("Pengguna menutup kotak dialog permintaan izin"),!1):!0}static async subscribePushMessage(t){var e;console.log("Subscribing to push messages");try{const s=await((e=navigator.serviceWorker)==null?void 0:e.ready),o=await(s==null?void 0:s.pushManager.getSubscription());if(o)return localStorage.setItem("pushSubscription",JSON.stringify(o)),this.updateSubscribeButtonState(t,!0),o;console.log("Creating new push subscription...");const i=await(s==null?void 0:s.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Yt(b.VAPID_PUBLIC_KEY)}));console.log(i);const n=i.toJSON();console.log("Push subscription created:",n),console.log("Sending subscription to server...");const c=await a(this,$).subscribePushNotification({endpoint:n.endpoint,keys:{p256dh:n.keys.p256dh,auth:n.keys.auth}});return console.log("Server response:",c),localStorage.setItem("pushSubscription",JSON.stringify(i)),this.updateSubscribeButtonState(t,!0),console.log("Successfully subscribed to push messages"),i}catch(s){throw console.error("Failed to subscribe:",s),localStorage.removeItem("pushSubscription"),s}}static async unsubscribePushMessage(t){var e;try{const s=await((e=navigator.serviceWorker)==null?void 0:e.ready),o=await(s==null?void 0:s.pushManager.getSubscription());if(o){console.log("Existing subscription found:",o);const i=o.toJSON();await a(this,$).unsubscribePushNotification({endpoint:i.endpoint});const n=await o.unsubscribe();console.log("Unsubscribed from push manager:",n),localStorage.removeItem("pushSubscription"),this.updateSubscribeButtonState(t,!1),console.log("Successfully unsubscribed from push messages")}else console.log("No active subscription found to unsubscribe")}catch(s){throw console.error("Failed to unsubscribe:",s),s}}static async unsubscribePushMessage(t){var e;try{const s=await((e=navigator.serviceWorker)==null?void 0:e.ready),o=await(s==null?void 0:s.pushManager.getSubscription());if(o){console.log("Existing subscription found:",o);const i=o.toJSON();await a(this,$).unsubscribePushNotification({endpoint:i.endpoint});const n=await o.unsubscribe();console.log("Unsubscribed from push manager:",n),localStorage.removeItem("pushSubscription"),this.updateSubscribeButtonState(t,!1),console.log("Successfully unsubscribed from push messages")}else console.log("No active subscription found to unsubscribe")}catch(s){console.error("Failed to unsubscribe:",s)}}static async updateSubscribeButtonState(t,e){if(console.log(t),!!t)if(console.log(e),e){t.innerHTML=gt();const s=t.querySelector("#unsubscribe-button");s&&s.addEventListener("click",async()=>{await this.unsubscribePushMessage(t)})}else{t.innerHTML=tt();const s=t.querySelector("#subscribe-button");s&&s.addEventListener("click",async()=>{await this.requestPermission()&&await this.subscribePushMessage(t)})}}}$=new WeakMap,R=new WeakSet,Ct=async function(){var s;const t=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),e=/iPhone|iPad|iPod/i.test(navigator.userAgent);if(!("Notification"in window))return console.log("Browser tidak mendukung notifikasi"),!1;if(!("serviceWorker"in navigator))return console.log("Browser tidak mendukung service worker"),!1;if(e)return console.log("Push notifications tidak didukung di iOS"),!1;if(t&&!("PushManager"in window))return console.log("Push notifications tidak didukung di perangkat ini"),!1;try{console.log("Registering service worker...");const o=await((s=navigator.serviceWorker)==null?void 0:s.ready);return console.log("Service Worker ready:",o),console.log("VAPID Key:",b.VAPID_PUBLIC_KEY),!0}catch(o){return console.error("Service Worker not ready:",o),!1}},It=function(){const t=document.getElementById("push-notification-container");if(!t)return;t.innerHTML=`
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
    `,s=document.createElement("style");s.textContent=e,document.head.appendChild(s)},Bt=async function(){const t=document.getElementById("push-notification-container");if(console.log("Notification container:",t),!t){console.log("Notification container not found");return}console.log("Setting up notification button"),t.innerHTML="";try{const e=await this.checkSubscription();if(console.log("Is subscribed:",e),e){t.innerHTML=gt();const s=t.querySelector("#unsubscribe-button");s&&s.addEventListener("click",async()=>{try{console.log("Unsubscribe clicked"),await this.unsubscribePushMessage(t)}catch(o){console.error("Error unsubscribing:",o),alert("Gagal berhenti berlangganan. Silakan coba lagi.")}})}else{t.innerHTML=tt();const s=t.querySelector("#subscribe-button");s&&s.addEventListener("click",async()=>{try{console.log("Subscribe clicked"),await this.requestPermission()?await this.subscribePushMessage(t):alert("Mohon izinkan notifikasi untuk mendapatkan pemberitahuan.")}catch(o){console.error("Error subscribing:",o),o.name==="NotAllowedError"?alert("Mohon izinkan notifikasi di pengaturan browser Anda."):alert("Gagal berlangganan. Silakan coba lagi.")}})}}catch(e){console.error("Error setting up notification button:",e),t.innerHTML=tt()}},u(ct,R),u(ct,$,null);var H,J,N,Dt,et;class _e{constructor({content:t,skipLinkButton:e}){u(this,N);u(this,H);u(this,J);p(this,H,t),p(this,J,e),nt.setApp(this),f(this,N,Dt).call(this)}getContent(){return a(this,H)}updateNavigation(){f(this,N,et).call(this)}async initializeApp(){await Z.init(pt),await f(this,N,et).call(this),setInterval(()=>{g.clearOldCache()},60*60*1e3)}}H=new WeakMap,J=new WeakMap,N=new WeakSet,Dt=function(){Jt(a(this,J),a(this,H)),f(this,N,et).call(this),nt.init()},et=async function(){const t=!!L(),e=document.getElementById("navigation-drawer"),s=e==null?void 0:e.children.namedItem("navlist-main"),o=e==null?void 0:e.children.namedItem("navlist");if(!t){s&&(s.innerHTML=""),o&&(o.innerHTML=Se());return}s&&o&&(s.innerHTML=we(),o.innerHTML=be());const i=document.getElementById("logout-button");i&&i.addEventListener("click",n=>{n.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&(St(),location.hash="/login")}),t&&await ct.init(pt)};var B,M,D,O,w,F,v,X,k,Ot,Ft,Nt,dt;const ut=class ut{constructor({video:t,cameraSelect:e,canvas:s,options:o={}}){u(this,k);u(this,B);u(this,M,!1);u(this,D,640);u(this,O,0);u(this,w);u(this,F);u(this,v);u(this,X);p(this,w,t),p(this,F,e),p(this,v,s),f(this,k,Ot).call(this)}static addNewStream(t){if(!Array.isArray(window.currentStreams)){window.currentStreams=[t];return}window.currentStreams=[...window.currentStreams,t]}static stopAllStreams(){if(!Array.isArray(window.currentStreams)){window.currentStreams=[];return}window.currentStreams.forEach(t=>{t.active&&t.getTracks().forEach(e=>e.stop())})}async launch(){p(this,B,await f(this,k,Nt).call(this)),ut.addNewStream(a(this,B)),a(this,w).srcObject=a(this,B),a(this,w).play(),f(this,k,dt).call(this)}stop(){a(this,w)&&(a(this,w).srcObject=null,p(this,M,!1)),a(this,B)instanceof MediaStream&&a(this,B).getTracks().forEach(t=>{t.stop()}),f(this,k,dt).call(this)}async takePicture(){if(!(a(this,D)&&a(this,O)))return null;const t=a(this,v).getContext("2d");return a(this,v).width=a(this,D),a(this,v).height=a(this,O),t.drawImage(a(this,w),0,0,a(this,D),a(this,O)),await new Promise(e=>{a(this,v).toBlob(s=>e(s))})}addCheeseButtonListener(t,e){p(this,X,document.querySelector(t)),a(this,X).onclick=e}};B=new WeakMap,M=new WeakMap,D=new WeakMap,O=new WeakMap,w=new WeakMap,F=new WeakMap,v=new WeakMap,X=new WeakMap,k=new WeakSet,Ot=function(){a(this,w).oncanplay=()=>{a(this,M)||(p(this,O,a(this,w).videoHeight*a(this,D)/a(this,w).videoWidth),a(this,v).setAttribute("width",a(this,D)),a(this,v).setAttribute("height",a(this,O)),p(this,M,!0))},a(this,F).onchange=async()=>{await this.stop(),await this.launch()}},Ft=async function(t){try{if(!(t instanceof MediaStream))return Promise.reject(Error("MediaStream not found!"));const{deviceId:e}=t.getVideoTracks()[0].getSettings(),i=(await navigator.mediaDevices.enumerateDevices()).filter(n=>n.kind==="videoinput").reduce((n,c,l)=>n.concat(`
          <option
            value="${c.deviceId}"
            ${e===c.deviceId?"selected":""}
          >
            ${c.label||`Camera ${l+1}`}
          </option>
        `),"");a(this,F).innerHTML=i}catch(e){console.error("#populateDeviceList: error:",e)}},Nt=async function(){try{const t=!a(this,M)&&!a(this,F).value?void 0:{exact:a(this,F).value},e=await navigator.mediaDevices.getUserMedia({video:{aspectRatio:4/3,deviceId:t}});return await f(this,k,Ft).call(this,e),e}catch(t){return console.error("#getStream: error:",t),null}},dt=function(){const t=a(this,v).getContext("2d");t.fillStyle="#AAAAAA",t.fillRect(0,0,a(this,v).width,a(this,v).height)};let lt=ut;var T,h,Q,C,A,Rt,jt,$t,Mt;class j{static init(){p(this,T,document.getElementById("drawer-button")),p(this,h,document.getElementById("navigation-drawer")),p(this,Q,!1),p(this,C,!1),!a(this,Q)&&(f(this,A,Rt).call(this),f(this,A,jt).call(this),this.initialized=!0)}static isDrawerOpen(){return a(this,h).classList.contains("open")}static toggleDrawer(){window.innerWidth>768||(this.isDrawerOpen()?this.closeDrawer():this.openDrawer())}static openDrawer(){a(this,C)||window.innerWidth>768||(a(this,h).style.visibility="visible",requestAnimationFrame(()=>{a(this,T).classList.add("open"),a(this,h).classList.remove("closing"),a(this,h).classList.add("open"),a(this,h).style.transform="translateX(0%)",document.body.classList.add("drawer-open"),setTimeout(()=>{document.body.classList.add("overlay-visible")},50)}))}static closeDrawer(){a(this,C)||window.innerWidth>768||(p(this,C,!0),a(this,T).classList.remove("open"),a(this,h).classList.add("closing"),requestAnimationFrame(()=>{a(this,h).classList.remove("open"),a(this,h).style.transform="translateX(100%)",document.body.classList.remove("overlay-visible"),setTimeout(()=>{document.body.classList.remove("drawer-open"),a(this,h).style.visibility="visible",p(this,C,!1)},300)}))}static updateActiveLink(){const t=window.location.hash||"#/";a(this,h).querySelectorAll("a").forEach(s=>{s.getAttribute("href")===t?s.classList.add("active"):s.classList.remove("active")})}}T=new WeakMap,h=new WeakMap,Q=new WeakMap,C=new WeakMap,A=new WeakSet,Rt=function(){window.innerWidth<=768&&(a(this,h).style.visibility="hidden",a(this,h).style.transform="translateX(100%)")},jt=function(){var t;(t=a(this,T))==null||t.addEventListener("click",e=>{e.stopPropagation(),this.toggleDrawer()}),window.addEventListener("resize",()=>{f(this,A,$t).call(this)}),document.addEventListener("click",e=>{this.isDrawerOpen()&&!a(this,h).contains(e.target)&&!a(this,T).contains(e.target)&&this.closeDrawer()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isDrawerOpen()&&this.closeDrawer()}),a(this,h).addEventListener("transitionend",e=>{f(this,A,Mt).call(this,e)}),window.addEventListener("hashchange",()=>{window.innerWidth<=768&&this.closeDrawer()})},$t=function(){window.innerWidth>768?(a(this,h).style.visibility="visible",a(this,h).classList.remove("open","closing"),a(this,T).classList.remove("open"),document.body.classList.remove("drawer-open","overlay-visible"),a(this,h).style.transform="none"):this.isDrawerOpen()||(a(this,h).style.visibility="hidden",a(this,h).style.transform="translateX(100%)")},Mt=function(t){t.propertyName==="transform"&&!this.isDrawerOpen()&&window.innerWidth<=768&&(a(this,h).style.visibility="hidden",a(this,h).classList.remove("closing"),p(this,C,!1))},u(j,A),u(j,T),u(j,h),u(j,Q),u(j,C);const mt="/story-web-v2/sw.js";"serviceWorker"in navigator&&navigator.serviceWorker.getRegistration().then(r=>{r?r.unregister().then(()=>{console.log("Service worker unregistered"),navigator.serviceWorker.register(mt).then(t=>{console.log("Service worker registered:",t)}).catch(t=>{console.error("Service worker registration failed:",t)}),caches.keys().then(t=>{for(const e of t)caches.delete(e)})}):(console.log("No service worker registered yet."),navigator.serviceWorker.register(mt).then(t=>{console.log("Service worker registered:",t)}).catch(t=>{console.error("Service worker registration failed:",t)}))}).catch(r=>{console.error("Failed to get service worker registration:",r)});document.addEventListener("DOMContentLoaded",async()=>{await new _e({content:document.getElementById("main-content"),skipLinkButton:document.getElementById("skip-link")}).initializeApp(),j.init(),nt.onHashChange(()=>{j.init(),lt.stopAllStreams()}),await g.init()});export{Ee as A,lt as C,Z as F,g as I,pt as S,Pe as a,Te as b,Le as c,Be as d,Ae as e,Ce as f,Ie as g,De as h,b as i,Gt as p};
