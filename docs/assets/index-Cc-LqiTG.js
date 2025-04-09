const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/home-page-mTnOHZLG.js","assets/api-mapper-BXV2r0rj.js","assets/map-B_YqZYlB.js","assets/new-page-W9_cWHMI.js","assets/form-templates-Bl6HwUbk.js","assets/new-guest-page-BfjSKaVl.js","assets/story-detail-page-CIP_l6tG.js","assets/favorites-page-C6pWZZkx.js"])))=>i.map(i=>d[i]);
var At=r=>{throw TypeError(r)};var pt=(r,t,e)=>t.has(r)||At("Cannot "+e);var s=(r,t,e)=>(pt(r,t,"read from private field"),e?e.call(r):t.get(r)),f=(r,t,e)=>t.has(r)?At("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(r):t.set(r,e),g=(r,t,e,n)=>(pt(r,t,"write to private field"),n?n.call(r,e):t.set(r,e),e),y=(r,t,e)=>(pt(r,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();function Rt(r){const t=r.split("/");return{resource:t[1]||null,id:t[2]||null}}function le(r){let t="";return r.resource&&(t=t.concat(`/${r.resource}`)),r.id&&(t=t.concat("/:id")),t||"/"}function It(){return location.hash.replace("#","")||"/"}function Et(){const r=It(),t=Rt(r);return le(t)}function ue(){const r=It();return Rt(r)}const de="modulepreload",he=function(r){return"/"+r},Lt={},F=function(t,e,n){let i=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(e.map(u=>{if(u=he(u),u in Lt)return;Lt[u]=!0;const c=u.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":de,c||(h.as="script"),h.crossOrigin="",h.href=u,l&&h.setAttribute("nonce",l),document.head.appendChild(h),c)return new Promise((p,w)=>{h.addEventListener("load",p),h.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return i.then(a=>{for(const l of a||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};function Bt(r,t="en-US",e={}){return new Date(r).toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric",...e})}async function Ge(r,t={}){const{tns:e}=await F(async()=>{const{tns:n}=await import("./tiny-slider-vO41T4hq.js").then(i=>i.t);return{tns:n}},[]);return e({container:r,mouseDrag:!0,swipeAngle:!1,speed:600,nav:!0,navPosition:"bottom",autoplay:!1,controls:!1,...t})}function Ke(r,t="",e=512){const n=atob(r),i=[];for(let o=0;o<n.length;o+=e){const a=n.slice(o,o+e),l=new Array(a.length);for(let c=0;c<a.length;c++)l[c]=a.charCodeAt(c);const u=new Uint8Array(l);i.push(u)}return new Blob(i,{type:t})}function fe(r){const t="=".repeat((4-r.length%4)%4),e=(r+t).replace(/-/g,"+").replace(/_/g,"/"),n=atob(e),i=new Uint8Array(n.length);for(let o=0;o<n.length;o++)i[o]=n.charCodeAt(o);return i}function pe(r,t){r==null||r.addEventListener("click",()=>t==null?void 0:t.focus())}function ye({skipTransition:r=!1,updateDOM:t}){if(r||!document.startViewTransition){const e=Promise.resolve(t()).then(()=>{});return{ready:Promise.reject(Error("View transitions unsupported")),updateCallbackDone:e,finished:e}}return document.startViewTransition(t)}const q=async(r,t)=>{const e=await r();return t(new e.default)};function Ye(){return`
    <div id="stories-list-empty" class="stories-list__empty">
      <h2>Tidak ada story yang tersedia</h2>
      <p>Saat ini, tidak ada story yang dapat ditampilkan.</p>
    </div>
  `}function Je(r){return`
    <div id="stories-list-error" class="stories-list__error">
      <h2>Terjadi kesalahan pengambilan daftar story</h2>
      <p>${r||"Gunakan jaringan lain atau laporkan error ini."}</p>
    </div>
  `}function Xe(r){return`
    <div id="stories-detail-error" class="stories-detail__error">
      <h2>Terjadi kesalahan pengambilan detail story</h2>
      <p>${r||"Gunakan jaringan lain atau laporkan error ini."}</p>
    </div>
  `}const Qe=({id:r,description:t,photoUrl:e,createdAt:n,name:i,placeName:o,isFavorited:a,isOffline:l=!1})=>`
  <article class="story-item ${l?"offline":""}" id="story-${r}">
    <div class="story-item__image-container">
      <img class="story-item__image" src="${e}" alt="${t}" loading="lazy">
      ${o?`<div class="story-item__location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${o}</span>
            </div>`:""}
    </div>
    <div class="story-item__content">
      <div class="story-item__header">
        <span class="story-item__title">${i}</span>
        <span class="story-item__date">${Bt(n)}</span>
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
`;function Ze(r){return`
    <div class="story-detail__header">
      <h1 class="story-detail__description">${r.description}</h1>
      <div class="story-detail__more-info">
        <div class="story-detail__more-info__inline">
          <span class="story-detail__createdat">
            <i class="fas fa-calendar"></i>
            ${Bt(r.createdAt)}
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
  `}function Dt(){return`
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `}function ve(){return`
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `}const tr=(r=!1)=>`
  <button 
    id="story-detail-favorite" 
    class="story-detail__favorite ${r?"active":""}"
    aria-label="${r?"Remove from favorites":"Add to favorites"}"
  >
    <i class="${r?"fas":"far"} fa-heart"></i>
    <span>${r?"Hapus dari Favorit":"Tambah ke Favorit"}</span>
  </button>
`,ge=()=>`
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
`,me=()=>`
  <li id="push-notification-container" class="push-notification-container">
    ${Dt()}
  </li>
  <li>
    <button class="nav-menu__logout" id="logout-button">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </button>
  </li>
`,we=()=>`
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
`,T={BASE_URL:"https://story-api.dicoding.dev/v1",ACCESS_TOKEN_KEY:"accessToken",MAP_SERVICE_API_KEY:"VKEpsF8VPnGlVLwqQkzA",VAPID_PUBLIC_KEY:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"};function j(){try{const r=localStorage.getItem(T.ACCESS_TOKEN_KEY);return r==="null"||r==="undefined"?null:r}catch(r){return console.error("getAccessToken: error:",r),null}}function be(r){try{return localStorage.setItem(T.ACCESS_TOKEN_KEY,r),!0}catch(t){return console.error("putAccessToken: error:",t),!1}}function jt(){try{return localStorage.removeItem(T.ACCESS_TOKEN_KEY),!0}catch(r){return console.error("getLogout: error:",r),!1}}const _e=["/login","/register"];function tt(r){const t=Et(),e=!!j();return _e.includes(t)&&e?(location.hash="/",null):r}function et(r){return!j()?(location.hash="/login",null):r}function Ft(){jt()}const er=Object.freeze(Object.defineProperty({__proto__:null,checkAuthenticatedRoute:et,checkUnauthenticatedRouteOnly:tt,getAccessToken:j,getLogout:Ft,putAccessToken:be,removeAccessToken:jt},Symbol.toStringTag,{value:"Module"})),$t={"/login":()=>q(()=>F(()=>import("./login-page-BhBOfQ7l.js"),[]),tt),"/register":()=>q(()=>F(()=>import("./register-page-BwoScLBy.js"),[]),tt),"/":()=>q(()=>F(()=>import("./home-page-mTnOHZLG.js"),__vite__mapDeps([0,1,2])),et),"/new":()=>q(()=>F(()=>import("./new-page-W9_cWHMI.js"),__vite__mapDeps([3,4,2])),et),"/new-guest":()=>q(()=>F(()=>import("./new-guest-page-BfjSKaVl.js"),__vite__mapDeps([5,4,2])),tt),"/stories/:id":()=>q(()=>F(()=>import("./story-detail-page-CIP_l6tG.js"),__vite__mapDeps([6,2,1])),et),"/favorites":()=>q(()=>F(()=>import("./favorites-page-C6pWZZkx.js"),__vite__mapDeps([7,1,2])),et),"/404":()=>q(()=>F(()=>import("./not-found-page-BfB1IYE1.js"),[]),tt)},Nt="StoryAppDB",L="favorites",Ut=2,Pt="apiCache",Se="api-cache-v1";function Ee(){return new Promise((r,t)=>{console.log("Opening IndexedDB...");const e=indexedDB.open(Nt,Ut);e.onupgradeneeded=n=>{console.log("Database upgrade needed...");const i=n.target.result;if(console.log("Existing stores:",Array.from(i.objectStoreNames)),i.objectStoreNames.contains(L)||(console.log("Creating favorites store..."),i.createObjectStore(L,{keyPath:"id"}).createIndex("updatedAt","updatedAt",{unique:!1})),!i.objectStoreNames.contains(Pt)){console.log("Creating apiCache store...");try{const o=i.createObjectStore(Pt,{keyPath:"url"});o.createIndex("timestamp","timestamp",{unique:!1}),o.createIndex("type","type",{unique:!1}),console.log("API Cache store created successfully")}catch(o){console.error("Error creating apiCache store:",o)}}console.log("Final stores:",Array.from(i.objectStoreNames))},e.onsuccess=n=>{const i=n.target.result,o=Array.from(i.objectStoreNames);console.log("Database opened successfully. Available stores:",o),r(i)},e.onerror=n=>{console.error("Error initializing IndexedDB:",n.target.error),t(n.target.error)},e.onblocked=n=>{console.warn("Database opening blocked. Please close other tabs and reload."),alert("Please close all other tabs with this site open and reload this page.")}})}function dt(){return new Promise((r,t)=>{const e=indexedDB.open(Nt,Ut);e.onupgradeneeded=n=>{const i=n.target.result;i.objectStoreNames.contains(L)||i.createObjectStore(L,{keyPath:"id"})},e.onsuccess=()=>r(e.result),e.onerror=()=>t(e.error)})}async function qt(r){return new Promise(async(t,e)=>{const o=(await dt()).transaction([L],"readwrite").objectStore(L),a={...r,updatedAt:new Date().toISOString(),createdAt:new Date().toISOString()},l=o.put(a);l.onsuccess=async()=>{try{const u=await caches.open("api-cache-v1"),c=new Response(JSON.stringify({story:r}),{headers:{"Content-Type":"application/json"}});await u.put(`https://story-api.dicoding.dev/v1/stories/${r.id}`,c)}catch(u){console.warn("Failed to cache story:",u)}t()},l.onerror=u=>{console.error("Error adding favorite:",u.target.error),e(u.target.error)}})}async function Wt(r){return new Promise(async(t,e)=>{const o=(await dt()).transaction([L],"readwrite").objectStore(L),a=o.get(r);a.onsuccess=async()=>{if(a.result){const l=o.delete(a.result.id);l.onsuccess=async()=>{try{await(await caches.open(Se)).delete(`/api/stories/${r}`),m.broadcastChange({type:"remove",storyId:r}),t()}catch(u){console.warn("Failed to remove from cache:",u),t()}},l.onerror=u=>{console.error("Error deleting from IndexedDB:",u.target.error),e(u.target.error)}}else t()},a.onerror=l=>{console.error("Error accessing IndexedDB:",l.target.error),e(l.target.error)}})}async function Mt(){return new Promise(async(r,t)=>{const e=await dt(),o=await e.transaction(L,"readonly").objectStore(L).getAll();e.close(),o.onsuccess=()=>{console.log("stories",o.result),r(o.result)},o.onerror=a=>{console.error("Error getting all stories:",a.target.error),t(a.target.error)}})}async function xt(r){return new Promise(async(t,e)=>{const a=(await dt()).transaction(L,"readonly").objectStore(L).get(r);a.onsuccess=()=>{console.log("story",a.result),t(a.result)},a.onerror=l=>{console.error("Error getting story by id:",l.target.error),e(l.target.error)}})}async function zt(r){return await xt(r)!==void 0}var rt,lt,S,R,b,nt,I,Ht,at,Vt;class m{static async init(){s(this,b)||(await y(this,I,Ht).call(this),g(this,b,!0))}static async addFavorite(t){s(this,b)||await this.init();try{return await qt(t),await y(this,I,at).call(this),console.log("Story added to favorites:",t),!0}catch(e){throw console.error("Error removing favorite:",e),e}}static async removeFavorite(t){s(this,b)||await this.init();try{return await Wt(t),await y(this,I,at).call(this),console.log("Story removed from favorites:",t),!0}catch(e){throw console.error("Error removing favorite:",e),e}}static broadcastChange(t){new BroadcastChannel("favorites-sync").postMessage(t)}static async getAllFavorites(){s(this,b)||await this.init();try{const t=await Mt();if(navigator.onLine)try{await y(this,I,at).call(this)}catch(e){console.warn("Failed to sync with cache:",e)}return t||[]}catch(t){return console.error("Error getting all favorites:",t),[]}}static async isFavorite(t){return s(this,b)||await this.init(),await zt(t)}static async getFavorite(t){s(this,b)||await this.init();try{const e=await y(this,I,Vt).call(this,t);if(console.log("favorite",e),e)return e;if(navigator.onLine){const i=await(await caches.open(s(this,nt))).match(`/api/stories/${t}`);if(i)return await i.json()}return null}catch(e){return console.error("Error getting favorite:",e),null}}static async cacheAPIResponse(t,e,n="story"){return s(this,b)||await this.init(),new Promise((i,o)=>{const l=s(this,R).transaction([s(this,S).apiCache],"readwrite").objectStore(s(this,S).apiCache),u={url:t,data:e,type:n,timestamp:new Date().toISOString()};console.log("Caching API response:",u);const c=l.put(u);c.onsuccess=()=>{console.log("Successfully cached API response for:",t),i()},c.onerror=d=>{console.error("Error caching API response:",d),o(d)}})}static async getFromAPICache(t){return s(this,b)||await this.init(),new Promise((e,n)=>{const o=s(this,R).transaction([s(this,S).apiCache],"readonly").objectStore(s(this,S).apiCache);console.log("Fetching from API cache:",t);const a=o.get(t);a.onsuccess=()=>{var u;const l=((u=a.result)==null?void 0:u.data)||null;console.log("API cache result for",t,":",l?"Found":"Not found"),e(l)},a.onerror=l=>{console.error("Error fetching from API cache:",l),n(l)}})}static async clearOldCache(t=24*60*60*1e3){s(this,b)||await this.init();const n=s(this,R).transaction([s(this,S).apiCache],"readwrite").objectStore(s(this,S).apiCache),i=n.index("timestamp"),o=new Date(Date.now()-t).toISOString(),a=i.openCursor(IDBKeyRange.upperBound(o));a.onsuccess=l=>{const u=l.target.result;u&&(n.delete(u.primaryKey),u.continue())}}static async verifyDatabaseStructure(){return s(this,b)||await this.init(),new Promise(t=>{const n=s(this,R).transaction([s(this,S).apiCache],"readonly").objectStore(s(this,S).apiCache);console.log("Database structure verification:"),console.log("- Database name:",s(this,rt)),console.log("- Database version:",s(this,lt)),console.log("- Available stores:",Array.from(s(this,R).objectStoreNames)),console.log("- ApiCache store indexes:",Array.from(n.indexNames)),t(!0)}).catch(t=>(console.error("Database verification failed:",t),!1))}static async forceUpgrade(){return await new Promise(t=>{const e=indexedDB.deleteDatabase(s(this,rt));e.onsuccess=()=>{console.log("Database deleted successfully"),t()},e.onerror=()=>{console.error("Error deleting database"),t()}}),g(this,b,!1),await this.init(),this.verifyDatabaseStructure()}}rt=new WeakMap,lt=new WeakMap,S=new WeakMap,R=new WeakMap,b=new WeakMap,nt=new WeakMap,I=new WeakSet,Ht=async function(){g(this,R,await Ee())},at=async function(){try{const t=await caches.open(s(this,nt)),e=await t.keys();for(const n of e){const o=s(this,R).transaction([s(this,S).favorites],"readonly").objectStore(s(this,S).favorites),a=n.url.split("/").pop();await new Promise(async(u,c)=>{const d=o.get(a);d.onsuccess=()=>u(d.result),d.onerror=()=>c(d.error)})||await t.delete(n)}}catch(t){console.warn("Failed to sync cache with IndexedDB:",t)}},Vt=async function(t){return await xt(t)},f(m,I),f(m,rt,"StoryAppDB"),f(m,lt,2),f(m,S,{favorites:"favorites",apiCache:"apiCache"}),f(m,R,null),f(m,b,!1),f(m,nt,"api-cache-v1");class ke{constructor(){this.lastAttemptedHash=null,this.init()}init(){window.addEventListener("load",()=>{this.handleRoute()}),window.addEventListener("hashchange",()=>{this.handleRoute()}),window.addEventListener("online",()=>{document.body.classList.remove("offline-mode"),this.lastAttemptedHash&&(window.location.hash=this.lastAttemptedHash,this.lastAttemptedHash=null)}),window.addEventListener("offline",()=>{document.body.classList.add("offline-mode"),this.lastAttemptedHash=window.location.hash})}async handleRoute(){const t=Et(),e=ue();try{const n=$t[t];if(!n){window.location.hash="#/404";return}const i=n();if(!i){window.location.hash="#/404";return}if(!navigator.onLine){await this.handleOfflineRoute(e,i);return}const o=!!j();if(i.requiresAuth&&!o){window.location.hash="#/login";return}if(i.requiresUnauth&&o){window.location.hash="#/";return}await this.renderPage(i)}catch(n){console.error("Route handling error:",n),window.location.hash="#/404"}}async handleOfflineRoute(t,e){if(e.requiresOnline!==!1){const n=await this.checkCachedData(t);n&&await this.renderWithOfflineIndicator(e,n);return}await this.renderPage(e)}async checkCachedData(t){try{return t.resource==="stories"&&t.id?await m.getFavorite(t.id):t.resource==="favorites"?await m.getAllFavorites():null}catch(e){return console.error("Error checking cached data:",e),null}}async renderWithOfflineIndicator(t,e){this.showOfflineBanner(),await this.renderPage(t,e)}showOfflineBanner(){if(!document.querySelector(".offline-banner")){const t=document.createElement("div");t.className="offline-banner",t.innerHTML=`
        <div class="offline-banner__content">
          <i class="fas fa-wifi-slash"></i>
          <span>Anda sedang offline. Menampilkan konten tersimpan.</span>
          <button class="offline-banner__retry">Coba Lagi</button>
        </div>
      `,t.querySelector(".offline-banner__retry").addEventListener("click",()=>{window.location.reload()}),document.body.insertBefore(t,document.body.firstChild)}}async renderPage(t,e=null){const n=document.querySelector("#mainContent");if(n){if(navigator.onLine){const i=document.querySelector(".offline-banner");i&&i.remove()}n.style.opacity="0";try{n.innerHTML=await t.render(e),requestAnimationFrame(()=>{n.style.opacity="1"}),t.afterRender&&await t.afterRender()}catch(i){console.error("Error rendering page:",i),n.innerHTML="<h1>Error loading page</h1>"}}}}const Ae=`
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
`,Gt=document.createElement("style");Gt.textContent=Ae;document.head.appendChild(Gt);const Le=new ke;var J,k,O,Kt,Yt,gt,Jt;class ct{static async init(t){if(!s(this,k))try{g(this,J,t),y(this,O,Yt).call(this),y(this,O,Kt).call(this),g(this,k,!0),console.log("FavoriteManager initialized successfully")}catch(e){throw console.error("Error initializing FavoriteManager:",e),e}}static async refreshFavorites(){try{const t=await this.getAllFavorites();if(console.log("Refreshed favorites:",t),document.getElementById("favorites-list")){const n=new CustomEvent("favorites-updated",{detail:t});document.dispatchEvent(n)}else console.warn("favorites-list element not found in the DOM.")}catch(t){console.error("Error refreshing favorites:",t);const e=new CustomEvent("favorites-update-error",{detail:t});document.dispatchEvent(e)}}static async addFavorite(t){if(!s(this,k))throw new Error("FavoriteManager not initialized");try{await m.addFavorite(t),console.log("Story added to favorites:",t.id)}catch(e){throw console.error("Error adding favorite:",e),e}}static async removeFavorite(t){if(!s(this,k))throw new Error("FavoriteManager not initialized");try{await m.removeFavorite(t),console.log("Story removed from favorites:",t)}catch(e){throw console.error("Error removing favorite:",e),P,e}}static async isFavorite(t){if(!s(this,k))throw new Error("FavoriteManager not initialized");try{return await m.isFavorite(t)}catch(e){return console.error("Error checking favorite status:",e),!1}}static async getAllFavorites(){if(!s(this,k))throw new Error("FavoriteManager not initialized");try{return await m.getAllFavorites()}catch(t){return console.error("Error getting all favorites:",t),[]}}static async toggleFavorite(t){if(!s(this,k))throw new Error("FavoriteManager not initialized");try{if(await this.isFavorite(t))await this.removeFavorite(t);else{const n=await y(this,O,gt).call(this,t);n&&await this.addFavorite(n)}}catch(e){throw console.error("Error toggling favorite:",e),e}}}J=new WeakMap,k=new WeakMap,O=new WeakSet,Kt=function(){const t=new BroadcastChannel("favorites-sync");t.onmessage=async e=>{const n=e.data;(n.type==="remove"||n.type==="add"||n.type==="update")&&(await this.refreshFavorites(),document.querySelectorAll(`[data-story-id="${n.storyId}"]`).forEach(async o=>{const a=await this.isFavorite(n.storyId);y(this,O,Jt).call(this,o,a)}))}},Yt=function(){document.addEventListener("click",async t=>{const e=t.target.closest(".story-item__favorite, .story-detail__favorite");if(e){const n=e.dataset.storyId,i=e.classList.contains("active");try{if(!s(this,k))throw new Error("FavoriteManager not initialized");if(i){await this.removeFavorite(n),e.classList.remove("active");const o=e.querySelector("i");o.classList.remove("fas"),o.classList.add("far"),e.setAttribute("aria-label","Add to favorites")}else{const o=await y(this,O,gt).call(this,n);if(o){await this.addFavorite(o),e.classList.add("active");const a=e.querySelector("i");a.classList.remove("far"),a.classList.add("fas"),e.setAttribute("aria-label","Remove from favorites")}}}catch(o){console.error("Error toggling favorite:",o),alert("Gagal mengubah status favorit.")}}})},gt=async function(t){if(!s(this,k))throw new Error("FavoriteManager not initialized");try{const e=await m.getFavorite(t);if(e)return e;if(!s(this,J))throw new Error("API model not initialized");const n=await s(this,J).getStoryById(t);if(!n.ok)throw new Error("Failed to fetch story");return n.story}catch(e){throw console.error("Error fetching story:",e),e}},Jt=function(t,e){const n=t.querySelector("i");e?(t.classList.add("active"),n==null||n.classList.remove("far"),n==null||n.classList.add("fas"),t.setAttribute("aria-label","Remove from favorites")):(t.classList.remove("active"),n==null||n.classList.remove("fas"),n==null||n.classList.add("far"),t.setAttribute("aria-label","Add to favorites"))},f(ct,O),f(ct,J,null),f(ct,k,!1);var X,ut,Xt;class Y{static init(t){g(this,X,t),y(this,ut,Xt).call(this)}static async checkSubscription(){try{return!!await(await navigator.serviceWorker.ready).pushManager.getSubscription()}catch(t){return console.error("Error checking subscription:",t),!1}}static async requestPermission(){const t=await Notification.requestPermission();return t==="denied"?(console.log("Notifikasi tidak diizinkan"),!1):t==="default"?(console.log("Pengguna menutup kotak dialog permintaan izin"),!1):!0}static async subscribePushMessage(t){try{const e=await navigator.serviceWorker.ready,n=await this.checkSubscription(),i=await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:fe(T.VAPID_PUBLIC_KEY)}),o=i.toJSON();return s(this,X).subscribePushNotification({endpoint:o.endpoint,keys:{p256dh:o.keys.p256dh,auth:o.keys.auth}}),localStorage.setItem("pushSubscription",JSON.stringify(i)),this.updateSubscribeButtonState(t,!0),i}catch(e){throw console.error("Gagal melakukan subscribe:",e.message),e}}static async unsubscribePushMessage(t){try{const n=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(!await this.checkSubscription())return;await s(this,X).unsubscribePushNotification({endpoint:n.endpoint}),await n.unsubscribe(),localStorage.removeItem("pushSubscription"),this.updateSubscribeButtonState(t,!1)}catch(e){throw console.error("Gagal melakukan unsubscribe:",e.message),e}}static async updateSubscribeButtonState(t,e){if(t)if(e){t.innerHTML=ve();const n=t.querySelector("#unsubscribe-button");n&&n.addEventListener("click",async()=>{await this.unsubscribePushMessage(t)})}else{t.innerHTML=Dt();const n=t.querySelector("#subscribe-button");n&&n.addEventListener("click",async()=>{await this.requestPermission()&&await this.subscribePushMessage(t)})}}}X=new WeakMap,ut=new WeakSet,Xt=async function(){return"Notification"in window?"serviceWorker"in navigator?!0:(console.log("Browser tidak mendukung service worker"),!1):(console.log("Browser tidak mendukung notifikasi"),!1)},f(Y,ut),f(Y,X,null);try{self["workbox:window:7.2.0"]&&_()}catch{}function Tt(r,t){return new Promise(function(e){var n=new MessageChannel;n.port1.onmessage=function(i){e(i.data)},r.postMessage(t,[n.port2])})}function Pe(r){var t=function(e,n){if(typeof e!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var o=i.call(e,n);if(typeof o!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r,"string");return typeof t=="symbol"?t:t+""}function Te(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,Pe(n.key),n)}}function mt(r,t){return mt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,n){return e.__proto__=n,e},mt(r,t)}function Ot(r,t){(t==null||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}function Oe(r,t){var e=typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(e)return(e=e.call(r)).next.bind(e);if(Array.isArray(r)||(e=function(i,o){if(i){if(typeof i=="string")return Ot(i,o);var a=Object.prototype.toString.call(i).slice(8,-1);return a==="Object"&&i.constructor&&(a=i.constructor.name),a==="Map"||a==="Set"?Array.from(i):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Ot(i,o):void 0}}(r))||t){e&&(r=e);var n=0;return function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}try{self["workbox:core:7.2.0"]&&_()}catch{}var yt=function(){var r=this;this.promise=new Promise(function(t,e){r.resolve=t,r.reject=e})};function vt(r,t){var e=location.href;return new URL(r,e).href===new URL(t,e).href}var Z=function(r,t){this.type=r,Object.assign(this,t)};function W(r,t,e){return e?t?t(r):r:(r&&r.then||(r=Promise.resolve(r)),t?r.then(t):r)}function Ce(){}var Re={type:"SKIP_WAITING"};function Ct(r,t){return r&&r.then?r.then(Ce):Promise.resolve()}var Ie=function(r){function t(l,u){var c,d;return u===void 0&&(u={}),(c=r.call(this)||this).nn={},c.tn=0,c.rn=new yt,c.en=new yt,c.on=new yt,c.un=0,c.an=new Set,c.cn=function(){var h=c.fn,p=h.installing;c.tn>0||!vt(p.scriptURL,c.sn.toString())||performance.now()>c.un+6e4?(c.vn=p,h.removeEventListener("updatefound",c.cn)):(c.hn=p,c.an.add(p),c.rn.resolve(p)),++c.tn,p.addEventListener("statechange",c.ln)},c.ln=function(h){var p=c.fn,w=h.target,V=w.state,ht=w===c.vn,ft={sw:w,isExternal:ht,originalEvent:h};!ht&&c.mn&&(ft.isUpdate=!0),c.dispatchEvent(new Z(V,ft)),V==="installed"?c.wn=self.setTimeout(function(){V==="installed"&&p.waiting===w&&c.dispatchEvent(new Z("waiting",ft))},200):V==="activating"&&(clearTimeout(c.wn),ht||c.en.resolve(w))},c.yn=function(h){var p=c.hn,w=p!==navigator.serviceWorker.controller;c.dispatchEvent(new Z("controlling",{isExternal:w,originalEvent:h,sw:p,isUpdate:c.mn})),w||c.on.resolve(p)},c.gn=(d=function(h){var p=h.data,w=h.ports,V=h.source;return W(c.getSW(),function(){c.an.has(V)&&c.dispatchEvent(new Z("message",{data:p,originalEvent:h,ports:w,sw:V}))})},function(){for(var h=[],p=0;p<arguments.length;p++)h[p]=arguments[p];try{return Promise.resolve(d.apply(this,h))}catch(w){return Promise.reject(w)}}),c.sn=l,c.nn=u,navigator.serviceWorker.addEventListener("message",c.gn),c}var e,n;n=r,(e=t).prototype=Object.create(n.prototype),e.prototype.constructor=e,mt(e,n);var i,o,a=t.prototype;return a.register=function(l){var u=(l===void 0?{}:l).immediate,c=u!==void 0&&u;try{var d=this;return W(function(h,p){var w=h();return w&&w.then?w.then(p):p(w)}(function(){if(!c&&document.readyState!=="complete")return Ct(new Promise(function(h){return window.addEventListener("load",h)}))},function(){return d.mn=!!navigator.serviceWorker.controller,d.dn=d.pn(),W(d.bn(),function(h){d.fn=h,d.dn&&(d.hn=d.dn,d.en.resolve(d.dn),d.on.resolve(d.dn),d.dn.addEventListener("statechange",d.ln,{once:!0}));var p=d.fn.waiting;return p&&vt(p.scriptURL,d.sn.toString())&&(d.hn=p,Promise.resolve().then(function(){d.dispatchEvent(new Z("waiting",{sw:p,wasWaitingBeforeRegister:!0}))}).then(function(){})),d.hn&&(d.rn.resolve(d.hn),d.an.add(d.hn)),d.fn.addEventListener("updatefound",d.cn),navigator.serviceWorker.addEventListener("controllerchange",d.yn),d.fn})}))}catch(h){return Promise.reject(h)}},a.update=function(){try{return this.fn?W(Ct(this.fn.update())):W()}catch(l){return Promise.reject(l)}},a.getSW=function(){return this.hn!==void 0?Promise.resolve(this.hn):this.rn.promise},a.messageSW=function(l){try{return W(this.getSW(),function(u){return Tt(u,l)})}catch(u){return Promise.reject(u)}},a.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&Tt(this.fn.waiting,Re)},a.pn=function(){var l=navigator.serviceWorker.controller;return l&&vt(l.scriptURL,this.sn.toString())?l:void 0},a.bn=function(){try{var l=this;return W(function(u,c){try{var d=u()}catch(h){return c(h)}return d&&d.then?d.then(void 0,c):d}(function(){return W(navigator.serviceWorker.register(l.sn,l.nn),function(u){return l.un=performance.now(),u})},function(u){throw u}))}catch(u){return Promise.reject(u)}},i=t,(o=[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])&&Te(i.prototype,o),Object.defineProperty(i,"prototype",{writable:!1}),i}(function(){function r(){this.Pn=new Map}var t=r.prototype;return t.addEventListener=function(e,n){this.jn(e).add(n)},t.removeEventListener=function(e,n){this.jn(e).delete(n)},t.dispatchEvent=function(e){e.target=this;for(var n,i=Oe(this.jn(e.type));!(n=i()).done;)(0,n.value)(e)},t.jn=function(e){return this.Pn.has(e)||this.Pn.set(e,new Set),this.Pn.get(e)},r}());const Be=T.BASE_URL,Qt=async(r,t={})=>{const e=`${Be}/${r}`,n=j();if(!navigator.onLine){console.log("Offline - checking cache for:",e);const i=await m.getFromAPICache(e);return i?(console.log("Found cached data for:",e),{ok:!0,...i,isFromCache:!0}):{ok:!1,error:"Offline and no cached data available"}}try{const i=await fetch(e,{...t,headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...t.headers}});if(!i.ok)throw new Error("Network response was not ok");const o=await i.json();return console.log("Caching successful response for:",e),await m.cacheAPIResponse(e,o),{ok:!0,...o}}catch(i){console.error("Fetch error:",i),console.log("Trying cache after fetch error for:",e);const o=await m.getFromAPICache(e);return o?(console.log("Found cached data after error for:",e),{ok:!0,...o,isFromCache:!0}):{ok:!1,error:i.message}}},Q={REGISTER:`${T.BASE_URL}/register`,LOGIN:`${T.BASE_URL}/login`,STORE_NEW_STORY:`${T.BASE_URL}/stories`,STORE_NEW_STORY_GUEST:`${T.BASE_URL}/stories/guest`,SUBSCRIBE:`${T.BASE_URL}/notifications/subscribe`,UNSUBSCRIBE:`${T.BASE_URL}/notifications/subscribe`};async function De({name:r,email:t,password:e}){const n=JSON.stringify({name:r,email:t,password:e}),i=await fetch(Q.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:n});return{...await i.json(),ok:i.ok}}async function je({email:r,password:t}){const e=JSON.stringify({email:r,password:t}),n=await fetch(Q.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:e});return{...await n.json(),ok:n.ok}}const Fe=async({page:r=1,size:t=10}={})=>Qt(`stories?page=${r}&size=${t}`),Zt=async r=>Qt(`stories/${r}`);async function $e({description:r,photo:t,lat:e,lon:n}){const i=j(),o=new FormData;o.set("description",r),o.set("photo",t[0].blob),o.set("lat",e),o.set("lon",n);const a=await fetch(Q.STORE_NEW_STORY,{method:"POST",headers:{Authorization:`Bearer ${i}`},body:o});return{...await a.json(),ok:a.ok}}async function Ne({description:r,photo:t,lat:e,lon:n}){const i=j(),o=new FormData;o.set("description",r),o.set("photo",t[0].blob),o.set("lat",e),o.set("lon",n);const a=await fetch(Q.STORE_NEW_STORY_GUEST,{method:"POST",headers:{Authorization:`Bearer ${i}`},body:o});return{...await a.json(),ok:a.ok}}async function Ue({endpoint:r,keys:{p256dh:t,auth:e}}){const n=j(),i=JSON.stringify({endpoint:r,keys:{p256dh:t,auth:e}}),o=await fetch(Q.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:i});return{...await o.json(),ok:o.ok}}async function qe({endpoint:r}){const t=j(),e=JSON.stringify({endpoint:r}),n=await fetch(Q.UNSUBSCRIBE,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:e});return{...await n.json(),ok:n.ok}}async function We(r){try{const t=await Zt(r);return await qt(t.story),t}catch(t){return{ok:!1,message:t.message}}}async function Me(r){try{return await Wt(r),{ok:!0}}catch(t){return{ok:!1,message:t.message}}}async function xe(){try{return{ok:!0,stories:await Mt()}}catch(r){return{ok:!1,message:r.message}}}async function ze(r){return await zt(r)}const te=Object.freeze(Object.defineProperty({__proto__:null,getLogin:je,getRegistered:De,getSavedStories:xe,getStories:Fe,getStoryById:Zt,isStorySaved:ze,removeStory:Me,saveStory:We,storeNewStory:$e,storeNewStoryGuest:Ne,subscribePushNotification:Ue,unsubscribePushNotification:qe},Symbol.toStringTag,{value:"Module"}));var $,it,B,ee,wt,bt;class He{constructor({content:t,skipLinkButton:e}){f(this,B);f(this,$);f(this,it);g(this,$,t),g(this,it,e),y(this,B,ee).call(this)}async renderPage(){const t=Et(),e=$t[t],n=await e();if(!n){s(this,$).innerHTML="<h1>404 Not Found</h1>";return}s(this,$).style.opacity="0";const i=ye({updateDOM:async()=>{window.scrollTo(0,0),s(this,$).innerHTML=await(n==null?void 0:n.render()),requestAnimationFrame(()=>{s(this,$).style.opacity="1"}),await(n==null?void 0:n.afterRender())}});i.ready.catch(console.error),i.updateCallbackDone.then(async()=>{y(this,B,wt).call(this),await y(this,B,bt).call(this)})}async initializeApp(){if("serviceWorker"in navigator)try{const t=new Ie("/sw.js",{scope:"/",type:"module"});t.addEventListener("waiting",()=>{confirm("Ada konten baru tersedia! Klik OK untuk memperbarui.")&&(t.messageSkipWaiting(),window.location.reload())}),await t.register(),console.log("Service Worker berhasil didaftarkan")}catch(t){console.error("Gagal mendaftarkan Service Worker:",t)}await ct.init(),this.router=Le,setInterval(()=>{m.clearOldCache()},60*60*1e3)}}$=new WeakMap,it=new WeakMap,B=new WeakSet,ee=function(){pe(s(this,it),s(this,$)),y(this,B,wt).call(this),y(this,B,bt).call(this),Y.init(te)},wt=function(){const t=!!j(),e=document.getElementById("navigation-drawer"),n=e==null?void 0:e.children.namedItem("navlist-main"),i=e==null?void 0:e.children.namedItem("navlist");if(!t){n&&(n.innerHTML=""),i&&(i.innerHTML=we());return}n&&i&&(n.innerHTML=ge(),i.innerHTML=me());const o=document.getElementById("logout-button");o&&o.addEventListener("click",a=>{a.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&(Ft(),location.hash="/login")})},bt=async function(){const t=document.getElementById("push-notification-container");if(!t)return;const e=await Y.checkSubscription();await Y.updateSubscribeButtonState(t,e)};var M,K,x,z,A,H,E,st,C,re,ne,ie,St;const kt=class kt{constructor({video:t,cameraSelect:e,canvas:n,options:i={}}){f(this,C);f(this,M);f(this,K,!1);f(this,x,640);f(this,z,0);f(this,A);f(this,H);f(this,E);f(this,st);g(this,A,t),g(this,H,e),g(this,E,n),y(this,C,re).call(this)}static addNewStream(t){if(!Array.isArray(window.currentStreams)){window.currentStreams=[t];return}window.currentStreams=[...window.currentStreams,t]}static stopAllStreams(){if(!Array.isArray(window.currentStreams)){window.currentStreams=[];return}window.currentStreams.forEach(t=>{t.active&&t.getTracks().forEach(e=>e.stop())})}async launch(){g(this,M,await y(this,C,ie).call(this)),kt.addNewStream(s(this,M)),s(this,A).srcObject=s(this,M),s(this,A).play(),y(this,C,St).call(this)}stop(){s(this,A)&&(s(this,A).srcObject=null,g(this,K,!1)),s(this,M)instanceof MediaStream&&s(this,M).getTracks().forEach(t=>{t.stop()}),y(this,C,St).call(this)}async takePicture(){if(!(s(this,x)&&s(this,z)))return null;const t=s(this,E).getContext("2d");return s(this,E).width=s(this,x),s(this,E).height=s(this,z),t.drawImage(s(this,A),0,0,s(this,x),s(this,z)),await new Promise(e=>{s(this,E).toBlob(n=>e(n))})}addCheeseButtonListener(t,e){g(this,st,document.querySelector(t)),s(this,st).onclick=e}};M=new WeakMap,K=new WeakMap,x=new WeakMap,z=new WeakMap,A=new WeakMap,H=new WeakMap,E=new WeakMap,st=new WeakMap,C=new WeakSet,re=function(){s(this,A).oncanplay=()=>{s(this,K)||(g(this,z,s(this,A).videoHeight*s(this,x)/s(this,A).videoWidth),s(this,E).setAttribute("width",s(this,x)),s(this,E).setAttribute("height",s(this,z)),g(this,K,!0))},s(this,H).onchange=async()=>{await this.stop(),await this.launch()}},ne=async function(t){try{if(!(t instanceof MediaStream))return Promise.reject(Error("MediaStream not found!"));const{deviceId:e}=t.getVideoTracks()[0].getSettings(),o=(await navigator.mediaDevices.enumerateDevices()).filter(a=>a.kind==="videoinput").reduce((a,l,u)=>a.concat(`
          <option
            value="${l.deviceId}"
            ${e===l.deviceId?"selected":""}
          >
            ${l.label||`Camera ${u+1}`}
          </option>
        `),"");s(this,H).innerHTML=o}catch(e){console.error("#populateDeviceList: error:",e)}},ie=async function(){try{const t=!s(this,K)&&!s(this,H).value?void 0:{exact:s(this,H).value},e=await navigator.mediaDevices.getUserMedia({video:{aspectRatio:4/3,deviceId:t}});return await y(this,C,ne).call(this,e),e}catch(t){return console.error("#getStream: error:",t),null}},St=function(){const t=s(this,E).getContext("2d");t.fillStyle="#AAAAAA",t.fillRect(0,0,s(this,E).width,s(this,E).height)};let _t=kt;var N,v,ot,U,D,se,oe,ae,ce;class G{static init(){g(this,N,document.getElementById("drawer-button")),g(this,v,document.getElementById("navigation-drawer")),g(this,ot,!1),g(this,U,!1),!s(this,ot)&&(y(this,D,se).call(this),y(this,D,oe).call(this),this.initialized=!0)}static isDrawerOpen(){return s(this,v).classList.contains("open")}static toggleDrawer(){window.innerWidth>768||(this.isDrawerOpen()?this.closeDrawer():this.openDrawer())}static openDrawer(){s(this,U)||window.innerWidth>768||(s(this,v).style.visibility="visible",requestAnimationFrame(()=>{s(this,N).classList.add("open"),s(this,v).classList.remove("closing"),s(this,v).classList.add("open"),s(this,v).style.transform="translateX(0%)",document.body.classList.add("drawer-open"),setTimeout(()=>{document.body.classList.add("overlay-visible")},50)}))}static closeDrawer(){s(this,U)||window.innerWidth>768||(g(this,U,!0),s(this,N).classList.remove("open"),s(this,v).classList.add("closing"),requestAnimationFrame(()=>{s(this,v).classList.remove("open"),s(this,v).style.transform="translateX(100%)",document.body.classList.remove("overlay-visible"),setTimeout(()=>{document.body.classList.remove("drawer-open"),s(this,v).style.visibility="visible",g(this,U,!1)},300)}))}static updateActiveLink(){const t=window.location.hash||"#/";s(this,v).querySelectorAll("a").forEach(n=>{n.getAttribute("href")===t?n.classList.add("active"):n.classList.remove("active")})}}N=new WeakMap,v=new WeakMap,ot=new WeakMap,U=new WeakMap,D=new WeakSet,se=function(){window.innerWidth<=768&&(s(this,v).style.visibility="hidden",s(this,v).style.transform="translateX(100%)")},oe=function(){var t;(t=s(this,N))==null||t.addEventListener("click",e=>{e.stopPropagation(),console.log(e),this.toggleDrawer()}),window.addEventListener("resize",()=>{y(this,D,ae).call(this)}),document.addEventListener("click",e=>{this.isDrawerOpen()&&!s(this,v).contains(e.target)&&!s(this,N).contains(e.target)&&this.closeDrawer()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isDrawerOpen()&&this.closeDrawer()}),s(this,v).addEventListener("transitionend",e=>{y(this,D,ce).call(this,e)}),window.addEventListener("hashchange",()=>{window.innerWidth<=768&&this.closeDrawer()})},ae=function(){window.innerWidth>768?(s(this,v).style.visibility="visible",s(this,v).classList.remove("open","closing"),s(this,N).classList.remove("open"),document.body.classList.remove("drawer-open","overlay-visible"),s(this,v).style.transform="none"):this.isDrawerOpen()||(s(this,v).style.visibility="hidden",s(this,v).style.transform="translateX(100%)")},ce=function(t){t.propertyName==="transform"&&!this.isDrawerOpen()&&window.innerWidth<=768&&(s(this,v).style.visibility="hidden",s(this,v).classList.remove("closing"),g(this,U,!1))},f(G,D),f(G,N),f(G,v),f(G,ot),f(G,U);document.addEventListener("DOMContentLoaded",async()=>{const r=new He({content:document.getElementById("main-content"),skipLinkButton:document.getElementById("skip-link")});await r.renderPage(),G.init(),Y.init(te),window.addEventListener("hashchange",async()=>{await r.renderPage(),G.updateActiveLink(),_t.stopAllStreams()}),await m.init()});export{er as A,_t as C,ct as F,m as I,te as S,Ye as a,Je as b,Ke as c,Ze as d,Ge as e,Xe as f,Qe as g,tr as h,T as i,ue as p};
