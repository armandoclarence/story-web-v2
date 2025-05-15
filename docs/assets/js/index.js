const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/js/home-page.js","assets/js/api-mapper.js","assets/js/map.js","assets/js/new-page.js","assets/js/form-templates.js","assets/js/new-guest-page.js","assets/js/story-detail-page.js","assets/js/favorites-page.js"])))=>i.map(i=>d[i]);
var We=Object.defineProperty;var pe=o=>{throw TypeError(o)};var Ge=(o,e,t)=>e in o?We(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var le=(o,e,t)=>Ge(o,typeof e!="symbol"?e+"":e,t),ue=(o,e,t)=>e.has(o)||pe("Cannot "+t);var a=(o,e,t)=>(ue(o,e,"read from private field"),t?t.call(o):e.get(o)),f=(o,e,t)=>e.has(o)?pe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t),y=(o,e,t,s)=>(ue(o,e,"write to private field"),s?s.call(o,t):e.set(o,t),t),v=(o,e,t)=>(ue(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Ye="modulepreload",Ve=function(o){return"/story-web-v2/"+o},me={},T=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),c=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));i=Promise.allSettled(t.map(u=>{if(u=Ve(u),u in me)return;me[u]=!0;const p=u.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const d=document.createElement("link");if(d.rel=p?"stylesheet":Ye,p||(d.as="script"),d.crossOrigin="",d.href=u,c&&d.setAttribute("nonce",c),document.head.appendChild(d),p)return new Promise((m,w)=>{d.addEventListener("load",m),d.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(n){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=n,window.dispatchEvent(c),!c.defaultPrevented)throw n}return i.then(n=>{for(const c of n||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})};function we(o){const e=o.split("/");return{resource:e[1]||null,id:e[2]||null}}function Ke(o){let e="";return o.resource&&(e=e.concat(`/${o.resource}`)),o.id&&(e=e.concat("/:id")),e||"/"}function be(){return location.hash.replace("#","")||"/"}function Se(){const o=be(),e=we(o);return Ke(e)}function Je(){const o=be();return we(o)}const _={BASE_URL:"https://story-api.dicoding.dev/v1",ACCESS_TOKEN_KEY:"accessToken",MAP_SERVICE_API_KEY:"VKEpsF8VPnGlVLwqQkzA",VAPID_PUBLIC_KEY:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"};function P(){try{const o=localStorage.getItem(_.ACCESS_TOKEN_KEY);return o===null||o==="undefined"?null:o}catch(o){return console.error("getAccessToken: error:",o),null}}function Qe(o){try{return localStorage.setItem(_.ACCESS_TOKEN_KEY,o),!0}catch(e){return console.error("putAccessToken: error:",e),!1}}function _e(){try{return localStorage.removeItem(_.ACCESS_TOKEN_KEY),!0}catch(o){return console.error("getLogout: error:",o),!1}}const Xe=["/login","/register"];function V(o){const e=Se(),t=!!P();return Xe.includes(e)&&t?(location.hash="/",null):o}function K(o){return!P()?(location.hash="/login",null):o}function ke(){_e()}const It=Object.freeze(Object.defineProperty({__proto__:null,checkAuthenticatedRoute:K,checkUnauthenticatedRouteOnly:V,getAccessToken:P,getLogout:ke,putAccessToken:Qe,removeAccessToken:_e},Symbol.toStringTag,{value:"Module"}));function Ee(o,e="en-US",t={}){return new Date(o).toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric",...t})}async function Dt(o,e={}){const{tns:t}=await T(async()=>{const{tns:s}=await import("./tiny-slider.js").then(i=>i.t);return{tns:s}},[]);return t({container:o,mouseDrag:!0,swipeAngle:!1,speed:600,nav:!0,navPosition:"bottom",autoplay:!1,controls:!1,...e})}function Bt(o,e="",t=512){const s=atob(o),i=[];for(let r=0;r<s.length;r+=t){const n=s.slice(r,r+t),c=new Array(n.length);for(let p=0;p<n.length;p++)c[p]=n.charCodeAt(p);const u=new Uint8Array(c);i.push(u)}return new Blob(i,{type:e})}function Ze(o){const e="=".repeat((4-o.length%4)%4),t=(o+e).replace(/-/g,"+").replace(/_/g,"/"),s=atob(t),i=new Uint8Array(s.length);for(let r=0;r<s.length;r++)i[r]=s.charCodeAt(r);return i}function et(o,e){o==null||o.addEventListener("click",()=>e==null?void 0:e.focus())}function tt({skipTransition:o=!1,updateDOM:e}){if(o||!document.startViewTransition){const t=Promise.resolve(e()).then(()=>{});return{ready:Promise.reject(Error("View transitions unsupported")),updateCallbackDone:t,finished:t}}return document.startViewTransition(e)}const O=async(o,e)=>{const t=await o();return e(new t.default)};function Ae(o){const e=new FormData;for(const t in o)o.hasOwnProperty(t)&&o[t]!==void 0&&o[t]!==null&&e.append(t,o[t]);return e}const st={"/login":()=>O(()=>T(()=>import("./login-page.js"),[]),V),"/register":()=>O(()=>T(()=>import("./register-page.js"),[]),V),"/":()=>O(()=>T(()=>import("./home-page.js"),__vite__mapDeps([0,1,2])),K),"/new":()=>O(()=>T(()=>import("./new-page.js"),__vite__mapDeps([3,4,2])),K),"/new-guest":()=>O(()=>T(()=>import("./new-guest-page.js"),__vite__mapDeps([5,4,2])),V),"/stories/:id":()=>O(()=>T(()=>import("./story-detail-page.js"),__vite__mapDeps([6,1,2])),K),"/favorites":()=>O(()=>T(()=>import("./favorites-page.js"),__vite__mapDeps([7,1,2])),K),"/404":()=>O(()=>T(()=>import("./not-found-page.js"),[]),V)},ot=_.BASE_URL,it=async(o,e={})=>{var i,r;const t=`${ot}/${o}`,s=P();try{const n=await fetch(t,{...e,headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{},...e.headers},cache:"reload"});if(!n.ok)throw new Error("Network response was not ok");const c=await n.json();await(await caches.open("api-cache-v1")).delete(t);const p=await fetch(t,{...e,headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{},...e.headers},cache:"reload"});if(!p.ok)throw new Error("Network response was not ok");const h=await p.json();console.log("Caching successful response for:",t);let d;return c.data?d={url:t,...c,data:{...c.data,listStory:(i=h==null?void 0:h.listStory)==null?void 0:i.map(m=>{const w=localStorage.getItem("favorites"),q=JSON.parse(w),oe=q?!!q.find(ze=>ze.id===m.id):!1;return console.log(oe),{...m,isFavorite:oe}})},timestamp:Date.now(),type:"story"}:d={url:t,data:{...h,listStory:(r=h==null?void 0:h.listStory)==null?void 0:r.map(m=>({...m,isFavorite:!1}))},timestamp:Date.now(),type:"story"},console.log(d),await b.cacheAPIResponse(t,d),{ok:!0,...d}}catch(n){if(!navigator.onLine){console.log("Offline - using cache for:",t);const c=await b.getFromAPICache(t);if(c)return console.log("Found cached data after error for:",t),{ok:!0,...c,isFromCache:!0}}return console.error("Fetch error:",n),{ok:!1,data:{error:n.message}}}},M={REGISTER:`${_.BASE_URL}/register`,LOGIN:`${_.BASE_URL}/login`,STORY_LIST:`${_.BASE_URL}/stories`,STORY_DETAIL:o=>`${_.BASE_URL}/stories/${o}`,STORE_NEW_STORY:`${_.BASE_URL}/stories`,STORE_NEW_STORY_GUEST:`${_.BASE_URL}/stories/guest`,SUBSCRIBE:`${_.BASE_URL}/notifications/subscribe`,UNSUBSCRIBE:`${_.BASE_URL}/notifications/subscribe`};async function rt({name:o,email:e,password:t}){const s=JSON.stringify({name:o,email:e,password:t}),i=await fetch(M.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:s});return{...await i.json(),ok:i.ok}}async function nt({email:o,password:e}){const t=JSON.stringify({email:o,password:e}),s=await fetch(M.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:t});return{...await s.json(),ok:s.ok}}const at=async({page:o=1,size:e=10}={})=>it(`stories?page=${o}&size=${e}`),Le=async(o,e)=>{try{console.log(e);const t=P();let s;return s=await ft(o,e),s||(s=await fetch(M.STORY_DETAIL(e),{headers:{Authorization:`Bearer ${t}`}})),console.log(s),{ok:!0,story:s}}catch(t){return{ok:!1,message:t.message}}};async function Pe(o){const e=P(),t=Ae({description:o.description,photo:o.photo,lat:o==null?void 0:o.lat,lon:o==null?void 0:o.lon}),s=await fetch(M.STORE_NEW_STORY,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:t});return{...await s.json(),ok:s.ok}}async function Te(o){const e=Ae({description:o.description,photo:o.photo,lat:o==null?void 0:o.lat,lon:o==null?void 0:o.lon}),t=await fetch(M.STORE_NEW_STORY_GUEST,{method:"POST",body:e});return{...await t.json(),ok:t.ok}}async function ct({endpoint:o,keys:{p256dh:e,auth:t}}){const s=P(),i=JSON.stringify({endpoint:o,keys:{p256dh:e,auth:t}}),r=await fetch(M.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:i});return{...await r.json(),ok:r.ok}}async function lt({endpoint:o}){const e=P(),t=JSON.stringify({endpoint:o}),s=await fetch(M.UNSUBSCRIBE,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:t});return{...await s.json(),ok:s.ok}}async function ut(o,e){try{console.log(e);const t=await Le(o,e);return console.log(t),await b.addToFavorites(t.story),{ok:!0,response:t}}catch(t){return{ok:!1,message:t.message}}}async function dt(o){try{return console.log(o),await b.removeFromFavorites(o),{ok:!0}}catch(e){return{ok:!1,message:e.message}}}const ye=Object.freeze(Object.defineProperty({__proto__:null,getLogin:nt,getRegistered:rt,getStories:at,getStoryById:Le,removeStory:dt,saveStory:ut,storeNewStory:Pe,storeNewStoryGuest:Te,subscribePushNotification:ct,unsubscribePushNotification:lt},Symbol.toStringTag,{value:"Module"})),l={name:"StoryAppDB",version:4,stores:{favorites:"favorites",apiCache:"apiCache",postQueue:"postQueue"}};function ht(){return new Promise((o,e)=>{console.log("Opening IndexedDB...");const t=indexedDB.open(l.name,l.version);t.onupgradeneeded=s=>{console.log("Database upgrade needed...");const i=s.target.result;if(console.log("Existing stores:",Array.from(i.objectStoreNames)),i.objectStoreNames.contains(l.stores.favorites)||(console.log("Creating favorites store..."),i.createObjectStore(l.stores.favorites,{keyPath:"storyId"}).createIndex("updatedAt","updatedAt",{unique:!1})),!i.objectStoreNames.contains(l.stores.apiCache)){console.log("Creating apiCache store...");const r=i.createObjectStore(l.stores.apiCache,{keyPath:"url"});r.createIndex("timestamp","timestamp",{unique:!1}),r.createIndex("type","type",{unique:!1})}i.objectStoreNames.contains(l.stores.postQueue)||(console.log("Creating postQueue store..."),i.createObjectStore(l.stores.postQueue,{keyPath:"id",autoIncrement:!0})),console.log("Final stores:",Array.from(i.objectStoreNames))},t.onsuccess=s=>{const i=s.target.result;console.log("Database opened successfully. Available stores:",Array.from(i.objectStoreNames)),o(i)},t.onerror=s=>{console.error("Error initializing IndexedDB:",s.target.error),e(s.target.error)},t.onblocked=s=>{console.warn("Database opening blocked. Please close other tabs and reload."),alert("Please close all other tabs with this site open and reload this page.")}})}async function ft(o,e){const i=o.transaction([l.stores.favorites],"readonly").objectStore(l.stores.favorites).get(e);return new Promise((r,n)=>{i.onsuccess=()=>{console.log(i),r(i.result)},i.onerror=c=>{n(c.target.error)}})}async function gt(o){const t=o.transaction([l.stores.apiCache],"readonly").objectStore(l.stores.apiCache),s=await new Promise((i,r)=>{const n=t.getAll();n.onsuccess=()=>i(n.result),n.onerror=c=>r(c.target.error)});for(const i of s)try{if(i.url.includes("/v1/stories")){const n=(typeof i.data=="string"?JSON.parse(i.data):i.data).listStory;await yt(o,n)}}catch(r){console.warn(`Failed to process apiCache entry ${i.url}:`,r)}console.log("All data moved from cache to stories store")}async function Ot(o,e){const t=o.transaction([l.stores.postQueue],"readwrite");t.objectStore(l.stores.postQueue).add(e),await t.oncomplete}async function pt(o){const e=o.transaction([l.stores.postQueue],"readwrite"),t=e.objectStore(l.stores.postQueue),s=await new Promise((i,r)=>{const n=t.getAll();n.onsuccess=()=>i(n.result),n.onerror=()=>r(n.error)});if(s.length!==0){for(const i of s)try{let r;i.type==="new"&&(r=await Pe(i)),i.type==="new-guest"&&(r=await Te(i)),console.log(r),r.ok?await mt(o,i.id):console.error("Failed to post from queue:",await r.json())}catch(r){console.error("Retry post error:",r)}await new Promise((i,r)=>{e.oncomplete=()=>i(),e.onerror=n=>r(n.target.error)})}}async function mt(o,e){const t=o.transaction([l.stores.postQueue],"readwrite");t.objectStore(l.stores.postQueue).delete(e),await new Promise((i,r)=>{t.oncomplete=()=>i(),t.onerror=n=>r(n.target.error)})}async function yt(o,e=[]){const t=o.transaction([l.stores.favorites],"readwrite"),s=t.objectStore(l.stores.favorites);for(const i of e)s.put({...i,storyId:i.id});await new Promise((i,r)=>{t.oncomplete=()=>i(),t.onerror=n=>r(n.target.error)})}var S,Q,H,X,de;class b{static async init(){if(a(this,Q))return a(this,S);try{return y(this,S,await ht()),y(this,Q,!0),a(this,S)}catch(e){throw console.error("Failed to initialize IndexedDB:",e),e}}static async addToFavorites(e){return new Promise(async(t,s)=>{const i=a(this,S).transaction([l.stores.favorites,l.stores.apiCache],"readwrite"),r=i.objectStore(l.stores.favorites),n=i.objectStore(l.stores.apiCache);console.log(e);const c={...e,storyId:e.id,isFavorite:!0,timestamp:Date.now(),updatedAt:new Date().toISOString()},u=r.put(c);u.onsuccess=()=>{this.broadcastChange({type:"add",storyId:e.id}),t(u.result)},u.onerror=()=>s(u.error);const p=await new Promise((h,d)=>{const m=n.getAll();m.onsuccess=()=>h(m.result),m.onerror=w=>d(w.target.error)});for(const h of p)try{h.url.includes("/v1/stories")&&this.cacheAPIResponse(h.url,h,c.storyId)}catch(d){console.warn(`Failed to process apiCache entry ${h.url}:`,d)}})}static async removeFromFavorites(e){return new Promise(async(t,s)=>{const i=a(this,S).transaction([l.stores.favorites,l.stores.apiCache],"readwrite"),r=i.objectStore(l.stores.favorites),n=i.objectStore(l.stores.apiCache);console.log(e);const c=await r.get(e);c.onsuccess=async()=>{const u=await new Promise((m,w)=>{const q=n.getAll();q.onsuccess=()=>m(q.result),q.onerror=oe=>w(oe.target.error)});console.log(c);const h={...c.result,isFavorite:!1};console.log(h);const d=r.put(h);d.onsuccess=()=>{this.broadcastChange({type:"remove",storyId:e}),t(d.result)},d.onerror=()=>s(d.error);for(const m of u)try{m.url.includes("/v1/stories")&&this.cacheAPIResponse(m.url,m,e)}catch(w){console.warn(`Failed to process apiCache entry ${m.url}:`,w)}}})}static async isFavorite(e){return new Promise((t,s)=>{console.log(e);const n=a(this,S).transaction([l.stores.favorites],"readonly").objectStore(l.stores.favorites).get(e);n.onsuccess=()=>{console.log(n.result),t(n.result.isFavorite)},n.onerror=()=>s(n.error)})}static broadcastChange(e){new BroadcastChannel("favorites-sync").postMessage(e)}static async clearOldCache(){return new Promise((e,t)=>{const s=a(this,S).transaction([l.stores.favorites],"readwrite"),i=s.objectStore(l.stores.favorites),r=Date.now()-30*24*60*60*1e3,n=i.openCursor();n.onsuccess=c=>{const u=c.target.result;u&&(u.value.timestamp<r&&u.delete(),u.continue())},s.oncomplete=()=>e(),s.onerror=()=>t(s.error)})}static listenToChanges(e){const t=new BroadcastChannel("favorites-sync");return t.onmessage=s=>{e(s.data)},()=>t.close()}static async cacheAPIResponse(e,t,s="",i="story"){var r,n,c;try{const p=a(this,S).transaction([l.stores.apiCache],"readwrite").objectStore(l.stores.apiCache);s&&(t.data.listStory=(r=t.data)==null?void 0:r.listStory.map(d=>s===d.id?{...d,isFavorite:!d.isFavorite}:d));const h={url:e,data:{...t.data,listStory:t.data.listStory},type:i,timestamp:Date.now()};if(console.log(h),((c=(n=h.data)==null?void 0:n.listStory)==null?void 0:c.length)===0)return;if(await new Promise((d,m)=>{const w=p.put(h);w.onsuccess=()=>d(),w.onerror=()=>m(w.error)}),v(this,X,de).call(this))try{const d=await caches.open(a(this,H)),m=new Response(JSON.stringify(h),{headers:{"Content-Type":"application/json","Cache-Control":"max-age=86400"}});console.log(m),await d.put(e,m),await gt(a(this,S)),console.log("Cached in both IndexedDB and Cache Storage:",e)}catch(d){console.warn("Cache Storage failed, using IndexedDB only:",d)}else console.log("Cache Storage not available, using IndexedDB only")}catch(u){throw console.error("Error caching API response:",u),u}}static async getFromAPICache(e){try{if(v(this,X,de).call(this))try{const i=await(await caches.open(a(this,H))).match(e);if(i){const r=await i.json();return console.log("Found in Cache Storage:",e),r}}catch(s){console.warn("Cache Storage access failed:",s)}const t=await new Promise((s,i)=>{const c=a(this,S).transaction([l.stores.apiCache],"readonly").objectStore(l.stores.apiCache).get(e);c.onsuccess=()=>s(c.result||null),c.onerror=()=>i(c.error)});return t?(console.log("Found in IndexedDB:",e),t):null}catch(t){return console.error("Error fetching from cache:",t),null}}static async clearAPICache(e=24){try{const t=e*60*60*1e3,i=a(this,S).transaction([l.stores.apiCache],"readwrite").objectStore(l.stores.apiCache),r=Date.now()-t;await new Promise((p,h)=>{const d=i.openCursor();d.onsuccess=m=>{const w=m.target.result;w?(w.value.timestamp<r&&w.delete(),w.continue()):p()},d.onerror=()=>h(d.error)});const n=await caches.open(a(this,H)),u=(await n.keys()).map(async p=>{const h=await n.match(p);if(new Date(h.headers.get("date")).getTime()<r)return n.delete(p)});await Promise.all(u),console.log("API cache cleared successfully")}catch(t){console.error("Error clearing API cache:",t)}}static async getAllFavorites(){try{return await new Promise((t,s)=>{const n=a(this,S).transaction([l.stores.favorites],"readonly").objectStore(l.stores.favorites).getAll();n.onsuccess=()=>{console.log(n.result);const c=n.result.filter(u=>u.isFavorite);c.sort((u,p)=>p.timestamp-u.timestamp),t(c)},n.onerror=()=>s(n.error)})}catch(e){return console.error("Error getting all favorites:",e),[]}}static async getFavorite(e){return new Promise((t,s)=>{console.log("DB instance:",a(this,S)),console.log("Favorites store:",l.stores.favorites);const r=a(this,S).transaction([l.stores.favorites],"readwrite").objectStore(l.stores.favorites);console.log(e);const n=r.get(e);n.onsuccess=()=>{const c=n.result;t(c?{...c,timestamp:c.timestamp,updatedAt:c.updatedAt}:null)},n.onerror=()=>s(n.error)})}}S=new WeakMap,Q=new WeakMap,H=new WeakMap,X=new WeakSet,de=function(){return"caches"in window&&window.isSecureContext},f(b,X),f(b,S,null),f(b,Q,!1),f(b,H,"api-cache-v1");class vt{constructor(){le(this,"handleTouchStart",e=>{e.target.classList.add("active")});le(this,"handleTouchEnd",e=>{e.target.classList.remove("active");const t=e.target.closest(".nav-link");t&&(e.preventDefault(),t.tagName==="A"?window.location.href=t.href:t.tagName==="BUTTON"&&t.click())});this.lastAttemptedHash=null,this.hashChangeCallbacks=[],this.content=null,this.app=null,this.isGitHubPages=window.location.hostname.includes("github.io"),this.basePath=this.isGitHubPages?"/story-web-v2":""}setApp(e){this.app=e,this.content=e.getContent()}init(){window.addEventListener("load",()=>{this.handleRoute()}),window.addEventListener("hashchange",async e=>{e.preventDefault(),await this.handleRoute(),this.hashChangeCallbacks.forEach(t=>t())}),window.addEventListener("online",async()=>{await pt(await b.init()),document.body.classList.remove("offline-mode"),this.lastAttemptedHash&&(window.location.hash=this.lastAttemptedHash,this.lastAttemptedHash=null)}),window.addEventListener("offline",()=>{document.body.classList.add("offline-mode"),this.lastAttemptedHash=window.location.hash}),this.setupNavigationHandlers()}onHashChange(e){this.hashChangeCallbacks.push(e)}async handleRoute(){const e=Se(),t=Je(),s=!!P();try{if(!s&&e==="/"){window.location.hash="#/login",await this.handleRoute();return}if(!navigator.onLine&&s&&["/login","/register","/new-guest"].includes(e)){window.location.hash="#/";return}if(!navigator.onLine&&!s&&["/","/favorites","/new"].includes(e)){window.location.hash="#/login";return}const i=st[e];if(!i){window.location.hash="#/404";return}const r=await i();if(!r){window.location.hash="#/404";return}if(this.setupMobileNavigation(),r.requiresAuth&&!s){window.location.hash="#/login";return}if(r.requiresUnauth&&s){window.location.hash="#/";return}if(!s&&window.location.hash=="#/"){window.location.hash="#/login";return}if(!navigator.onLine&&s&&r.offlineSupport){await this.handleOfflineRoute(t,r);return}await this.renderPageWithTransition(r),this.app&&this.app.updateNavigation()}catch(i){console.error("Route handling error:",i),window.location.hash="#/404"}}async renderPageWithTransition(e,t=null){if(!this.content)return;if(navigator.onLine){const i=document.querySelector(".offline-banner");i&&i.remove()}const s=tt({updateDOM:async()=>{window.scrollTo(0,0);try{this.content.style.opacity="0",this.content.innerHTML=await e.render(t),requestAnimationFrame(()=>{this.content.style.opacity="1"}),e.afterRender&&await e.afterRender()}catch(i){console.error("Error rendering page:",i),this.content.innerHTML="<h1>Error loading page</h1>"}}});return s.ready.catch(console.error),s.updateCallbackDone}async handleOfflineRoute(e,t){if(t.requiresOnline!==!1){const s=await this.checkCachedData(e);s&&await this.renderWithOfflineIndicator(t,s);return}await this.renderPageWithTransition(t)}async checkCachedData(e){try{return e.resource==="stories"&&e.id?await b.getFavorite(e.id):e.resource==="favorites"?await b.getAllFavorites():!0}catch(t){return console.error("Error checking cached data:",t),null}}async renderWithOfflineIndicator(e,t){this.showOfflineBanner(),await this.renderPageWithTransition(e,t)}showOfflineBanner(){if(!document.querySelector(".offline-banner")){const e=document.createElement("div");e.className="offline-banner",e.innerHTML=`
        <div class="offline-banner__content">
          <i class="fas fa-wifi-slash"></i>
          <span>Anda sedang offline. Menampilkan konten tersimpan.</span>
          <button class="offline-banner__retry">Coba Lagi</button>
        </div>
      `,e.querySelector(".offline-banner__retry").addEventListener("click",()=>{window.location.reload()}),document.body.insertBefore(e,document.body.firstChild)}}setupMobileNavigation(){document.querySelectorAll(".nav-link").forEach(t=>{t.removeEventListener("touchstart",this.handleTouchStart),t.removeEventListener("touchend",this.handleTouchEnd),t.addEventListener("touchstart",this.handleTouchStart),t.addEventListener("touchend",this.handleTouchEnd)})}setupNavigationHandlers(){document.addEventListener("click",e=>{var s;const t=e.target.closest("a, button.nav-link");if(t)if(t.tagName==="A"&&((s=t.getAttribute("href"))!=null&&s.startsWith("#"))){e.preventDefault();const i=t.getAttribute("href");window.location.hash=i}else t.id==="logout-button"&&(e.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&this.handleLogout())})}}const wt=`
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
`,Ce=document.createElement("style");Ce.textContent=wt;document.head.appendChild(Ce);const he=new vt;function Nt(){return`
    <div id="stories-list-empty" class="stories-list__empty">
      <h2>Tidak ada story yang tersedia</h2>
      <p>Saat ini, tidak ada story yang dapat ditampilkan.</p>
    </div>
  `}function Rt(o){return`
    <div id="stories-list-error" class="stories-list__error">
      <h2>Terjadi kesalahan pengambilan daftar story</h2>
      <p>${o||"Gunakan jaringan lain atau laporkan error ini."}</p>
    </div>
  `}function $t(o){return`
    <div id="stories-detail-error" class="stories-detail__error">
      <h2>Terjadi kesalahan pengambilan detail story</h2>
      <p>${o||"Gunakan jaringan lain atau laporkan error ini."}</p>
    </div>
  `}const Ft=({id:o,description:e,photoUrl:t,createdAt:s,name:i,placeName:r,isFavorited:n,isOffline:c=!1})=>`
  <article class="story-item ${c?"offline":""}" id="story-${o}">
    <div class="story-item__image-container">
      <img class="story-item__image" src="${t}" alt="${e}" loading="lazy">
      ${r?`<div class="story-item__location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${r}</span>
            </div>`:""}
    </div>
    <div class="story-item__content">
      <div class="story-item__header">
        <span class="story-item__title">${i}</span>
        <span class="story-item__date">${Ee(s)}</span>
      </div>
      <p class="story-item__description">${e}</p>
      <div class="story-item__actions">
        <a href="#/stories/${o}" class="story-item__read-more">
          <span>Baca Selengkapnya</span>
          <i class="fas fa-arrow-right"></i>
        </a>
        ${St(o,n)}
      </div>
    </div>
  </article>
`;function jt(o){return`
    <div class="story-detail__header">
      <h1 class="story-detail__description">${o.description}</h1>
      <div class="story-detail__more-info">
        <div class="story-detail__more-info__inline">
          <span class="story-detail__createdat">
            <i class="fas fa-calendar"></i>
            ${Ee(o.createdAt)}
          </span>
          ${o.location?`<span class="story-detail__location__place-name">
                  <i class="fas fa-map-marker-alt"></i>
                  ${o.location}
                </span>`:""}
        </div>
        <span class="story-detail__author">
          <i class="fas fa-user"></i>
          ${o.name}
        </span>
      </div>
    </div>

    <div class="story-detail__images__container">
      <div class="story-detail__images" id="images">
        <div class="story-detail__image-wrapper">
          <img src="${Array.isArray(o.photoUrl)?o.photoUrl[0]:o.photoUrl}" alt="${o.description}" loading="lazy">
        </div>
      </div>
    </div>

    <div class="story-detail__body">
      <div class="story-detail__body__description__container">
        <h2 class="story-detail__description__title">Deskripsi</h2>
        <p class="story-detail__description__body">${o.description}</p>
      </div>

      ${o.lat&&o.lon?`
        <div class="story-detail__body__map__container">
          <h2 class="story-detail__map__title">Lokasi</h2>
          <div class="story-detail__map__wrapper">
            <div id="map" class="story-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
          <div class="story-detail__location__coordinate">
            <span class="story-detail__location__latitude">
              <i class="fas fa-map-marker-alt"></i>
              Latitude: ${o.lat}
            </span>
            <span class="story-detail__location__longitude">
              <i class="fas fa-map-marker-alt"></i>
              Longitude: ${o.lon}
            </span>
          </div>
        </div>
      `:""}
    </div>

    <div class="story-detail__body__actions__container">
      <h2>Aksi</h2>
      <div class="story-detail__actions__buttons">
        <div id="save-actions-container">
          ${bt(o.id,o.isFavorite)}
        </div>
      </div>
    </div>
  `}function ie(){return`
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `}function ve(){return`
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `}const bt=(o,e=!1)=>`
  <button 
    data-story-id=${o}
    data-favorited=${e}
    id="story-detail-favorite" 
    class="story-detail__favorite ${e?"active":""}"
    aria-label="${e?"Remove from favorites":"Add to favorites"}"
  >
    ${ae(e)}
    ${Ie(e)}
  </button>
`,St=(o,e=!1)=>`
  <button 
    data-story-id=${o}
    data-favorited=${e}
    class="story-item__favorite ${e?"active":""}"
    aria-label="${e?"Remove from favorites":"Add to favorites"}"
  >
    ${ae(e)}
  </button>
`,Ie=(o=!1)=>`
  <span>${o?"Hapus dari Favorit":"Tambah ke Favorit"}</span>
`,ae=(o=!1)=>`
  <i class="${o?"fas":"far"} fa-heart"></i>
`;function Ut(){return`
    <div class="loader loader-absolute"></div>
  `}const xt=(o,e)=>`
  <div class="pagination">
    <button id="prev-page" aria-label="Previous page" class="pagination-button" ${o===1?"disabled":""}>
      <i class="fas fa-chevron-left"></i>
    </button>
    <span class="pagination-info">Halaman ${o}</span>
    <button id="next-page" aria-label="Next page" class="pagination-button" ${e?"disabled":""}>
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
`;function _t(o,e="success"){return`
    <div class="notification notification--${e}">
      <div class="notification__content">
        <i class="fas ${e==="success"?"fa-check-circle":"fa-exclamation-circle"}"></i>
        <span class="notification__message">${o}</span>
        <button class="notification__close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `}const kt=()=>`
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
`,Et=()=>`
  <li id="push-notification-container" class="push-notification-container">
    ${ie()}
  </li>
  <li>
    <button class="nav-menu__logout" id="logout-button">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </button>
  </li>
`,At=()=>`
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
`;var z,j,De,Be,Oe;class ce{static async init(e){if(y(this,z,e),!await v(this,j,De).call(this))return v(this,j,Be).call(this),!1;let s=0;const i=5,r=async()=>{if(s>=i){console.log("Failed to find notification container after maximum attempts");return}await v(this,j,Oe).call(this),document.getElementById("push-notification-container")||(s++,setTimeout(r,1e3))};await r()}static async checkSubscription(){var e;try{const t=await((e=navigator.serviceWorker)==null?void 0:e.ready),s=await(t==null?void 0:t.pushManager.getSubscription());return console.log("Current subscription:",s),s?(localStorage.setItem("pushSubscription",JSON.stringify(s)),!0):(localStorage.removeItem("pushSubscription"),!1)}catch(t){return console.error("Error checking subscription status:",t),!1}}static async requestPermission(){const e=await Notification.requestPermission();return e==="denied"?(console.log("Notifikasi tidak diizinkan"),!1):e==="default"?(console.log("Pengguna menutup kotak dialog permintaan izin"),!1):!0}static async subscribePushMessage(e){var t;console.log("Subscribing to push messages");try{e.disabled=!0;const s=await((t=navigator.serviceWorker)==null?void 0:t.ready),i=await(s==null?void 0:s.pushManager.getSubscription());if(console.log(i),i)return localStorage.setItem("pushSubscription",JSON.stringify(i)),this.updateSubscribeButtonState(e,!0),this.showNotification("Already subscribed, You are already receiving notifications","success"),i;console.log("Creating new push subscription..."),console.log(s);const r=Ze(_.VAPID_PUBLIC_KEY);console.log(r);const n=await s.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:r});console.log(n);const c=n.toJSON();console.log("Push subscription created:",c),console.log("Sending subscription to server...");const u=await a(this,z).subscribePushNotification({endpoint:c.endpoint,keys:{p256dh:c.keys.p256dh,auth:c.keys.auth}});console.log("Server response:",u),localStorage.setItem("pushSubscription",JSON.stringify(n)),this.updateSubscribeButtonState(e,!0),this.showNotification("Push enabled!, You've successfully subscribed to notifications","success"),console.log("Successfully subscribed to push messages"),localStorage.removeItem("pendingSubscribe"),localStorage.removeItem("pendingUnsubscribe")}catch(s){throw console.error("Failed to subscribe:",s),localStorage.removeItem("pushSubscription"),localStorage.removeItem("pendingSubscribe"),localStorage.removeItem("pendingUnsubscribe"),this.showNotification("Failed to subscribe, Please try again or check your settings","error"),s}finally{e.disabled=!1}}static async unsubscribePushMessage(e){var t;try{e.disabled=!0;const s=await((t=navigator.serviceWorker)==null?void 0:t.ready),i=await(s==null?void 0:s.pushManager.getSubscription());if(i){console.log("Existing subscription found:",i);const r=i.toJSON(),n=await i.unsubscribe();console.log("Unsubscribed from push manager:",n),await a(this,z).unsubscribePushNotification({endpoint:r.endpoint}),localStorage.removeItem("pushSubscription"),this.updateSubscribeButtonState(e,!1),console.log("Successfully unsubscribed from push messages"),this.showNotification("Unsubscribed, You have successfully unsubscribed from notifications","success")}else console.log("No active subscription found to unsubscribe"),this.updateSubscribeButtonState(e,!1),this.showNotification("No subscription, You were not subscribed to notifications","success");localStorage.removeItem("pendingSubscribe"),localStorage.removeItem("pendingUnsubscribe")}catch(s){throw console.error("Failed to unsubscribe:",s),localStorage.removeItem("pendingSubscribe"),localStorage.removeItem("pendingUnsubscribe"),this.showNotification("Unsubscribe Failed, Could not unsubscribe. Try again later.","error"),s}finally{e.disabled=!1}}static async updateSubscribeButtonState(e,t){if(console.log(e),!!e)if(console.log(t),t){e.innerHTML=ve();const s=e.querySelector("#unsubscribe-button");s&&s.addEventListener("click",async()=>{navigator.onLine?(await this.unsubscribePushMessage(e),localStorage.removeItem("pendingUnsubscribe")):(localStorage.setItem("pendingUnsubscribe","true"),alert("You're offline. We'll unsubscribe you when you're back online."))})}else{e.innerHTML=ie();const s=e.querySelector("#subscribe-button");s&&s.addEventListener("click",async()=>{await this.requestPermission()&&(navigator.onLine?(await this.subscribePushMessage(e),localStorage.removeItem("pendingSubscribe")):(localStorage.setItem("pendingSubscribe","true"),alert("You're offline. We'll subscribe you when you're back online.")))})}}static showNotification(e,t="success"){const s=document.querySelector(".notification");s&&s.remove();let i=document.getElementById("notification-container");i||(i=document.createElement("div"),i.id="notification-container",document.body.appendChild(i)),i.innerHTML=_t(e,t);const r=i.querySelector(".notification__close");r&&r.addEventListener("click",()=>{i.innerHTML=""}),setTimeout(()=>{i&&(i.innerHTML="")},3e3)}}z=new WeakMap,j=new WeakSet,De=async function(){var s;const e=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),t=/iPhone|iPad|iPod/i.test(navigator.userAgent);if(!("Notification"in window))return console.log("Browser tidak mendukung notifikasi"),!1;if(!("serviceWorker"in navigator))return console.log("Browser tidak mendukung service worker"),!1;if(t)return console.log("Push notifications tidak didukung di iOS"),!1;if(e&&!("PushManager"in window))return console.log("Push notifications tidak didukung di perangkat ini"),!1;try{console.log("checking service worker ready...");const i=await((s=navigator.serviceWorker)==null?void 0:s.ready);return console.log("Service Worker ready:",i),console.log("VAPID Key:",_.VAPID_PUBLIC_KEY),!0}catch(i){return console.error("Service Worker not ready:",i),!1}},Be=function(){const e=document.getElementById("push-notification-container");if(!e)return;e.innerHTML=`
      <button class="notification-button" disabled title="Notifikasi tidak didukung di perangkat ini">
        <i class="fas fa-bell-slash"></i>
        <span>Notifikasi Tidak Didukung</span>
      </button>
    `;const t=`
      .notification-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        opacity: 0.7;
      }
    `,s=document.createElement("style");s.textContent=t,document.head.appendChild(s)},Oe=async function(){const e=document.getElementById("push-notification-container");if(console.log("Notification container:",e),!e){console.log("Notification container not found");return}console.log("Setting up notification button"),e.innerHTML="";try{const t=await this.checkSubscription();if(console.log("Is subscribed:",t),t){e.innerHTML=ve();const s=e.querySelector("#unsubscribe-button");s&&s.addEventListener("click",async()=>{try{console.log("Unsubscribe clicked"),navigator.onLine?(await this.unsubscribePushMessage(e),localStorage.removeItem("pendingUnsubscribe")):(localStorage.setItem("pendingUnsubscribe","true"),alert("You're offline. We'll unsubscribe you when you're back online."))}catch(i){console.error("Error unsubscribing:",i),alert("Gagal berhenti berlangganan. Silakan coba lagi.")}})}else{e.innerHTML=ie();const s=e.querySelector("#subscribe-button");s&&s.addEventListener("click",async()=>{try{console.log("Subscribe clicked"),await this.requestPermission()?navigator.onLine?(await this.subscribePushMessage(e),localStorage.removeItem("pendingSubscribe")):(localStorage.setItem("pendingSubscribe","true"),alert("You're offline. We'll subscribe you when you're back online.")):alert("Mohon izinkan notifikasi untuk mendapatkan pemberitahuan.")}catch(i){console.error("Error subscribing:",i),i.name==="NotAllowedError"?alert("Mohon izinkan notifikasi di pengaturan browser Anda."):alert("Gagal berlangganan. Silakan coba lagi.")}})}}catch(t){console.error("Error setting up notification button:",t),e.innerHTML=ie()}},f(ce,j),f(ce,z,null);var W,C,Z,Y,Ne,Re;class J{static async init(e){if(!a(this,C))try{y(this,W,e),y(this,Z,await b.init()),v(this,Y,Re).call(this),v(this,Y,Ne).call(this),y(this,C,!0),console.log("FavoriteManager initialized successfully")}catch(t){throw console.error("Error initializing FavoriteManager:",t),t}}static async refreshFavorites(e=null){try{const t=await this.getAllFavorites();if(console.log("Refreshed favorites:",t),localStorage.setItem("favorites",JSON.stringify(t)),e){if(!await this.isFavorite(e)){const i=document.getElementById("favorites-list");if(i){const r=i.querySelector(`[data-story-id="${e}"]`).closest(".story-item");if(r&&(r.classList.add("removing"),await new Promise(c=>{r.addEventListener("transitionend",()=>{r.remove(),c()},{once:!0})}),i.querySelectorAll(".story-item").length===0)){i.innerHTML="<p>Belum ada cerita favorit.</p>";const c=document.getElementById("pagination-container");c&&(c.innerHTML="")}}}}else if(document.getElementById("favorites-list")){const i=new CustomEvent("favorites-updated",{detail:{favorites:t,currentPage:1,pageSize:10}});document.dispatchEvent(i)}}catch(t){console.error("Error refreshing favorites:",t);const s=new CustomEvent("favorites-update-error",{detail:t});document.dispatchEvent(s)}}static toggleFavoriteDetail(){document.addEventListener("click",async e=>{const t=e.target.closest(".story-detail__favorite");if(t)try{if(!a(this,C))throw new Error("FavoriteManager not initialized");const s=i=>ae(i)+Ie(i);await this.toggleHandleFavorite(t,s)}catch(s){console.error("Error toggling favorite:",s),alert("Gagal mengubah status favorit.")}})}static toggleFavoriteItem(){document.addEventListener("click",async e=>{const t=e.target.closest(".story-item__favorite");if(t)try{if(!a(this,C))throw new Error("FavoriteManager not initialized");const s=i=>ae(i);await this.toggleHandleFavorite(t,s)}catch(s){console.error("Error toggling favorite:",s),alert("Gagal mengubah status favorit.")}})}static async toggleHandleFavorite(e,t){const s=e.dataset.favorited,i=e.dataset.storyId,r=s==="true",n=!r;if(r===n){console.log("No change in favorite state; skipping.");return}e.dataset.favorited=n.toString();const c=t(n);e.classList.toggle("active",n),e.innerHTML=c,e.disabled=!0;try{n?await this.handleSaveStory(i):await this.handleRemoveStory(i)}catch(u){console.error(u),e.dataset.favorited=r.toString(),e.classList.toggle("active",r),e.innerHTML=t(r)}finally{e.disabled=!1}}static async isFavorite(e){if(!a(this,C))throw new Error("FavoriteManager not initialized");try{return await b.isFavorite(e)}catch(t){return console.error("Error checking favorite status:",t),!1}}static async getAllFavorites(){if(!a(this,C))throw new Error("FavoriteManager not initialized");try{return await b.getAllFavorites()}catch(e){return console.error("Error getting all favorites:",e),[]}}static showNotification(e,t="success"){ce.showNotification(e,t)}static async handleSaveStory(e){try{const t=await a(this,W).saveStory(a(this,Z),e);if(t.ok)this.showNotification("Story berhasil disimpan!","success");else throw new Error(t.message||"Gagal menyimpan story")}catch(t){console.error("Error saving story:",t),this.showNotification("Gagal menyimpan story: "+t.message,"error")}}static async handleRemoveStory(e){try{console.log(e);const t=await a(this,W).removeStory(e);if(t.ok)this.showNotification("Story berhasil dihapus dari favorite!","success");else throw new Error(t.message||"Gagal menghapus story")}catch(t){console.error("Error removing story:",t),this.showNotification("Gagal menghapus story: "+t.message,"error")}}}W=new WeakMap,C=new WeakMap,Z=new WeakMap,Y=new WeakSet,Ne=function(){this.toggleFavoriteDetail(),this.toggleFavoriteItem()},Re=function(){const e=new BroadcastChannel("favorites-sync");e.onmessage=async t=>{const s=t.data;(s.type==="remove"||s.type==="add"||s.type==="update")&&await this.refreshFavorites(s.storyId)}},f(J,Y),f(J,W,null),f(J,C,!1),f(J,Z,!1);var G,ee,F,$e,re;class Lt{constructor({content:e,skipLinkButton:t}){f(this,F);f(this,G);f(this,ee);y(this,G,e),y(this,ee,t),he.setApp(this),v(this,F,$e).call(this)}getContent(){return a(this,G)}updateNavigation(){v(this,F,re).call(this)}async initializeApp(){await J.init(ye),await v(this,F,re).call(this),setInterval(()=>{b.clearOldCache(),b.clearAPICache()},60*60*1e3)}}G=new WeakMap,ee=new WeakMap,F=new WeakSet,$e=function(){et(a(this,ee),a(this,G)),v(this,F,re).call(this),he.init()},re=async function(){const e=!!P(),t=document.getElementById("navigation-drawer"),s=t==null?void 0:t.children.namedItem("navlist-main"),i=t==null?void 0:t.children.namedItem("navlist");if(!e){s&&(s.innerHTML=""),i&&(i.innerHTML=At());return}s&&i&&(s.innerHTML=kt(),i.innerHTML=Et());const r=document.getElementById("logout-button");r&&r.addEventListener("click",n=>{n.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&(ke(),location.hash="/login")}),e&&await ce.init(ye)};var I,x,N,R,E,$,k,te,A,Fe,je,Ue,ne;const ge=class ge{constructor({video:e,cameraSelect:t,canvas:s,options:i={}}){f(this,A);f(this,I);f(this,x,!1);f(this,N,640);f(this,R,0);f(this,E);f(this,$);f(this,k);f(this,te);y(this,E,e),y(this,$,t),y(this,k,s),v(this,A,Fe).call(this)}static addNewStream(e){if(!Array.isArray(window.currentStreams)){window.currentStreams=[e];return}window.currentStreams=[...window.currentStreams,e]}static stopAllStreams(){if(!Array.isArray(window.currentStreams)){window.currentStreams=[];return}window.currentStreams.forEach(e=>{e.active&&e.getTracks().forEach(t=>t.stop())})}async launch(){y(this,I,await v(this,A,Ue).call(this)),a(this,I)||v(this,A,ne).call(this),ge.addNewStream(a(this,I)),a(this,E).srcObject=a(this,I),a(this,E).play(),v(this,A,ne).call(this)}stop(){a(this,E)&&(a(this,E).srcObject=null,y(this,x,!1)),a(this,I)instanceof MediaStream&&a(this,I).getTracks().forEach(e=>{e.stop()}),v(this,A,ne).call(this)}async takePicture(){if(!(a(this,N)&&a(this,R)))return null;const e=a(this,k).getContext("2d");return a(this,k).width=a(this,N),a(this,k).height=a(this,R),e.drawImage(a(this,E),0,0,a(this,N),a(this,R)),await new Promise(t=>{a(this,k).toBlob(s=>t(s))})}addCheeseButtonListener(e,t){y(this,te,document.querySelector(e)),a(this,te).onclick=t}};I=new WeakMap,x=new WeakMap,N=new WeakMap,R=new WeakMap,E=new WeakMap,$=new WeakMap,k=new WeakMap,te=new WeakMap,A=new WeakSet,Fe=function(){a(this,E).oncanplay=()=>{a(this,x)||(y(this,R,a(this,E).videoHeight*a(this,N)/a(this,E).videoWidth),a(this,k).setAttribute("width",a(this,N)),a(this,k).setAttribute("height",a(this,R)),y(this,x,!0))},a(this,$).onchange=async()=>{this.stop(),await this.launch()}},je=async function(e){try{if(!(e instanceof MediaStream))return Promise.reject(Error("MediaStream not found!"));const{deviceId:t}=e.getVideoTracks()[0].getSettings(),r=(await navigator.mediaDevices.enumerateDevices()).filter(n=>n.kind==="videoinput").reduce((n,c,u)=>n.concat(`
          <option
            value="${c.deviceId}"
            ${t===c.deviceId?"selected":""}
          >
            ${c.label||`Camera ${u+1}`}
          </option>
        `),"");return a(this,$).innerHTML=r,{ok:!0}}catch(t){return console.error("#populateDeviceList: error:",t),{ok:!1,message:t.message}}},Ue=async function(){try{const e=!a(this,x)&&!a(this,$).value?void 0:{exact:a(this,$).value},t=await navigator.mediaDevices.getUserMedia({video:{aspectRatio:4/3,deviceId:e}}),s=await v(this,A,je).call(this,t);return s.ok||alert(s==null?void 0:s.message),t}catch(e){return console.error("#getStream: error:",e),alert(e.message),null}},ne=function(){const e=a(this,k).getContext("2d");e.fillStyle="#AAAAAA",e.fillRect(0,0,a(this,k).width,a(this,k).height)};let fe=ge;var D,g,se,B,L,xe,Me,qe,He;class U{static init(){y(this,D,document.getElementById("drawer-button")),y(this,g,document.getElementById("navigation-drawer")),y(this,se,!1),y(this,B,!1),!a(this,se)&&(v(this,L,xe).call(this),v(this,L,Me).call(this),this.initialized=!0)}static isDrawerOpen(){return a(this,g).classList.contains("open")}static toggleDrawer(){window.innerWidth>768||(this.isDrawerOpen()?this.closeDrawer():this.openDrawer())}static openDrawer(){a(this,B)||window.innerWidth>768||(a(this,g).style.visibility="visible",requestAnimationFrame(()=>{a(this,D).classList.add("open"),a(this,g).classList.remove("closing"),a(this,g).classList.add("open"),a(this,g).style.transform="translateX(0%)",document.body.classList.add("drawer-open"),setTimeout(()=>{document.body.classList.add("overlay-visible")},50)}))}static closeDrawer(){a(this,B)||window.innerWidth>768||(y(this,B,!0),a(this,D).classList.remove("open"),a(this,g).classList.add("closing"),requestAnimationFrame(()=>{a(this,g).classList.remove("open"),a(this,g).style.transform="translateX(100%)",document.body.classList.remove("overlay-visible"),setTimeout(()=>{document.body.classList.remove("drawer-open"),a(this,g).style.visibility="visible",y(this,B,!1)},300)}))}static updateActiveLink(){const e=window.location.hash||"#/";a(this,g).querySelectorAll("a").forEach(s=>{s.getAttribute("href")===e?s.classList.add("active"):s.classList.remove("active")})}}D=new WeakMap,g=new WeakMap,se=new WeakMap,B=new WeakMap,L=new WeakSet,xe=function(){window.innerWidth<=768&&(a(this,g).style.visibility="hidden",a(this,g).style.transform="translateX(100%)")},Me=function(){var e;(e=a(this,D))==null||e.addEventListener("click",t=>{t.stopPropagation(),this.toggleDrawer()}),window.addEventListener("resize",()=>{v(this,L,qe).call(this)}),document.addEventListener("click",t=>{this.isDrawerOpen()&&!a(this,g).contains(t.target)&&!a(this,D).contains(t.target)&&this.closeDrawer()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.isDrawerOpen()&&this.closeDrawer()}),a(this,g).addEventListener("transitionend",t=>{v(this,L,He).call(this,t)}),window.addEventListener("hashchange",()=>{window.innerWidth<=768&&this.closeDrawer()})},qe=function(){window.innerWidth>768?(a(this,g).style.visibility="visible",a(this,g).classList.remove("open","closing"),a(this,D).classList.remove("open"),document.body.classList.remove("drawer-open","overlay-visible"),a(this,g).style.transform="none"):this.isDrawerOpen()||(a(this,g).style.visibility="hidden",a(this,g).style.transform="translateX(100%)")},He=function(e){e.propertyName==="transform"&&!this.isDrawerOpen()&&window.innerWidth<=768&&(a(this,g).style.visibility="hidden",a(this,g).classList.remove("closing"),y(this,B,!1))},f(U,L),f(U,D),f(U,g),f(U,se),f(U,B);const Pt="/story-web-v2/sw.js";async function Tt(){if("serviceWorker"in navigator)try{const o=await navigator.serviceWorker.getRegistrations();await Promise.all(o.map(t=>t.update())),console.log("All service workers updated.");const e=await navigator.serviceWorker.register(Pt);await e.update(),console.log("New service worker registered:",e)}catch(o){console.error("Service worker reset failed:",o)}}Tt();document.addEventListener("DOMContentLoaded",async()=>{const o=new Lt({content:document.getElementById("main-content"),skipLinkButton:document.getElementById("skip-link")});await b.init(),await b.clearAPICache(),await o.initializeApp(),U.init(),he.onHashChange(()=>{U.init(),fe.stopAllStreams()})});export{It as A,fe as C,J as F,b as I,ye as S,xt as a,Nt as b,Rt as c,Ut as d,Bt as e,jt as f,Ft as g,Dt as h,$t as i,_ as j,Je as p,Ot as q};
