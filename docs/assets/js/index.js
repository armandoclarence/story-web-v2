const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/js/login-page.js","assets/js/login-presenter.js","assets/js/register-page.js","assets/js/register-presenter.js","assets/js/favorites-page.js","assets/js/api-mapper.js","assets/js/map.js","assets/js/favorites-presenter.js","assets/js/home-page.js","assets/js/home-presenter.js","assets/js/new-guest-page.js","assets/js/new-guest-presenter.js","assets/js/form-templates.js","assets/js/new-page.js","assets/js/new-presenter.js","assets/js/story-detail-page.js","assets/js/story-detail-presenter.js"])))=>i.map(i=>d[i]);
var Ge=Object.defineProperty;var ge=o=>{throw TypeError(o)};var We=(o,e,t)=>e in o?Ge(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var ne=(o,e,t)=>We(o,typeof e!="symbol"?e+"":e,t),re=(o,e,t)=>e.has(o)||ge("Cannot "+t);var a=(o,e,t)=>(re(o,e,"read from private field"),t?t.call(o):e.get(o)),h=(o,e,t)=>e.has(o)?ge("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t),m=(o,e,t,s)=>(re(o,e,"write to private field"),s?s.call(o,t):e.set(o,t),t),v=(o,e,t)=>(re(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const Ye="modulepreload",Ke=function(o){return"/story-web-v2/"+o},pe={},b=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),c=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=Ke(l),l in pe)return;pe[l]=!0;const f=l.endsWith(".css"),g=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${g}`))return;const d=document.createElement("link");if(d.rel=f?"stylesheet":Ye,f||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),f)return new Promise((y,w)=>{d.addEventListener("load",y),d.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(r){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=r,window.dispatchEvent(c),!c.defaultPrevented)throw r}return i.then(r=>{for(const c of r||[])c.status==="rejected"&&n(c.reason);return e().catch(n)})},ce=Object.assign({"../pages/app.js":()=>b(()=>Promise.resolve().then(()=>Pt),void 0),"../pages/auth/login/login-page.js":()=>b(()=>import("./login-page.js"),__vite__mapDeps([0,1])),"../pages/auth/login/login-presenter.js":()=>b(()=>import("./login-presenter.js"),[]),"../pages/auth/register/register-page.js":()=>b(()=>import("./register-page.js"),__vite__mapDeps([2,3])),"../pages/auth/register/register-presenter.js":()=>b(()=>import("./register-presenter.js"),[]),"../pages/favorites/favorites-page.js":()=>b(()=>import("./favorites-page.js"),__vite__mapDeps([4,5,6,7])),"../pages/favorites/favorites-presenter.js":()=>b(()=>import("./favorites-presenter.js"),[]),"../pages/home/home-page.js":()=>b(()=>import("./home-page.js"),__vite__mapDeps([8,9,5,6])),"../pages/home/home-presenter.js":()=>b(()=>import("./home-presenter.js"),[]),"../pages/new-guest/new-guest-page.js":()=>b(()=>import("./new-guest-page.js"),__vite__mapDeps([10,11,12,6])),"../pages/new-guest/new-guest-presenter.js":()=>b(()=>import("./new-guest-presenter.js"),[]),"../pages/new/new-page.js":()=>b(()=>import("./new-page.js"),__vite__mapDeps([13,14,12,6])),"../pages/new/new-presenter.js":()=>b(()=>import("./new-presenter.js"),[]),"../pages/not-found/not-found-page.js":()=>b(()=>import("./not-found-page.js"),[]),"../pages/story-detail/story-detail-page.js":()=>b(()=>import("./story-detail-page.js"),__vite__mapDeps([15,16,5,6])),"../pages/story-detail/story-detail-presenter.js":()=>b(()=>import("./story-detail-presenter.js"),__vite__mapDeps([16,5,6]))}),ve={"/login":{file:"../pages/auth/login/login-page.js",protected:!1},"/register":{file:"../pages/auth/register/register-page.js",protected:!1},"/":{file:"../pages/home/home-page.js",protected:!0},"/new":{file:"../pages/new/new-page.js",protected:!0},"/new-guest":{file:"../pages/new-guest/new-guest-page.js",protected:!1},"/stories/:id":{file:"../pages/story-detail/story-detail-page.js",protected:!0},"/favorites":{file:"../pages/favorites/favorites-page.js",protected:!0},"/404":{file:"../pages/not-found/not-found-page.js",protected:!1}};function Je(o){for(const e of o){const t=ve[e];t&&ce[t.file]&&ce[t.file]()}}function we(o){const e=o.split("/");return{resource:e[1]||null,id:e[2]||null}}function Qe(o){let e="";return o.resource&&(e=e.concat(`/${o.resource}`)),o.id&&(e=e.concat("/:id")),e||"/"}function be(){return location.hash.replace("#","")||"/"}function _e(){const o=be(),e=we(o);return Qe(e)}function It(){const o=be();return we(o)}const E={BASE_URL:"https://story-api.dicoding.dev/v1",ACCESS_TOKEN_KEY:"accessToken",MAP_SERVICE_API_KEY:"VKEpsF8VPnGlVLwqQkzA",VAPID_PUBLIC_KEY:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"};function T(){try{const o=localStorage.getItem(E.ACCESS_TOKEN_KEY);return o===null||o==="undefined"?null:o}catch(o){return console.error("getAccessToken: error:",o),null}}function Xe(o){try{return localStorage.setItem(E.ACCESS_TOKEN_KEY,o),!0}catch(e){return console.error("putAccessToken: error:",e),!1}}function Se(){try{return localStorage.removeItem(E.ACCESS_TOKEN_KEY),!0}catch(o){return console.error("getLogout: error:",o),!1}}const Ze=["/login","/register"];function et(o){const e=_e(),t=!!T();return Ze.includes(e)&&t?(location.hash="/",null):o}function tt(o){return!T()?(location.hash="/login",null):o}function Ee(){Se(),window.broadcastAuth("logout")}function he(o){const e=t=>{(t==="login"||t==="logout")&&o(t)};if("BroadcastChannel"in window){const t=new BroadcastChannel("auth");return t.onmessage=s=>e(s.data),s=>t.postMessage(s)}else return window.addEventListener("storage",t=>{t.key==="auth-event"&&e(t.newValue)}),t=>localStorage.setItem("auth-event",t)}const st=he(o=>{o=="login"?(console.log("Login detected in another tab"),window.location.reload()):o==="logout"&&(console.log("Logout detected in another tab"),window.location.hash="/login")});window.broadcastAuth=st;const Ot=Object.freeze(Object.defineProperty({__proto__:null,checkAuthenticatedRoute:tt,checkUnauthenticatedRouteOnly:et,getAccessToken:T,getLogout:Ee,putAccessToken:Xe,removeAccessToken:Se,setupAuthSync:he},Symbol.toStringTag,{value:"Module"})),ot=E.BASE_URL,it=async(o,e={})=>{var i,n;const t=`${ot}/${o}`,s=T();try{await(await caches.open("api-cache-v1")).delete(t);const c=await fetch(t,{...e,headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{},...e.headers},cache:"reload"});if(!c.ok)throw new Error("Network response was not ok");const l=await c.json();console.log("Caching successful response for:",t);let f;return l.data?f={url:t,...l,data:{...l.data,listStory:(i=l==null?void 0:l.listStory)==null?void 0:i.map(g=>{const d=localStorage.getItem("favorites"),y=JSON.parse(d),w=y?!!y.find(G=>G.id===g.id):!1;return console.log(w),{...g,isFavorite:w}})},timestamp:Date.now(),type:"story"}:f={url:t,data:{...l,listStory:(n=l==null?void 0:l.listStory)==null?void 0:n.map(g=>({...g,isFavorite:!1}))},timestamp:Date.now(),type:"story"},console.log(f),await S.cacheAPIResponse(t,f),{ok:!0,...f}}catch(r){if(!navigator.onLine){console.log("Offline - using cache for:",t);const c=await S.getFromAPICache(t);if(c)return console.log("Found cached data after error for:",t),{ok:!0,...c,isFromCache:!0}}return console.error("Fetch error:",r),{ok:!1,data:{error:r.message}}}};function ke(o,e="en-US",t={}){return new Date(o).toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric",...t})}async function jt(o,e={}){const{tns:t}=await b(async()=>{const{tns:s}=await import("./tiny-slider.js").then(i=>i.t);return{tns:s}},[]);return t({container:o,mouseDrag:!0,swipeAngle:!1,speed:600,nav:!0,navPosition:"bottom",autoplay:!1,controls:!1,...e})}function Dt(o,e="",t=512){const s=atob(o),i=[];for(let n=0;n<s.length;n+=t){const r=s.slice(n,n+t),c=new Array(r.length);for(let f=0;f<r.length;f++)c[f]=r.charCodeAt(f);const l=new Uint8Array(c);i.push(l)}return new Blob(i,{type:e})}function nt(o){const e="=".repeat((4-o.length%4)%4),t=(o+e).replace(/-/g,"+").replace(/_/g,"/"),s=atob(t),i=new Uint8Array(s.length);for(let n=0;n<s.length;n++)i[n]=s.charCodeAt(n);return i}function rt(o,e){o==null||o.addEventListener("click",()=>e==null?void 0:e.focus())}function at({skipTransition:o=!1,updateDOM:e}){if(o||!document.startViewTransition){const t=Promise.resolve(e()).then(()=>{});return{ready:Promise.reject(Error("View transitions unsupported")),updateCallbackDone:t,finished:t}}return document.startViewTransition(e)}function Le(o){const e=new FormData;for(const t in o)o.hasOwnProperty(t)&&o[t]!==void 0&&o[t]!==null&&e.append(t,o[t]);return e}const U={REGISTER:`${E.BASE_URL}/register`,LOGIN:`${E.BASE_URL}/login`,STORY_LIST:`${E.BASE_URL}/stories`,STORY_DETAIL:o=>`${E.BASE_URL}/stories/${o}`,STORE_NEW_STORY:`${E.BASE_URL}/stories`,STORE_NEW_STORY_GUEST:`${E.BASE_URL}/stories/guest`,SUBSCRIBE:`${E.BASE_URL}/notifications/subscribe`,UNSUBSCRIBE:`${E.BASE_URL}/notifications/subscribe`};async function ct({name:o,email:e,password:t}){const s=JSON.stringify({name:o,email:e,password:t}),i=await fetch(U.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:s});return{...await i.json(),ok:i.ok}}async function lt({email:o,password:e}){const t=JSON.stringify({email:o,password:e}),s=await fetch(U.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:t});return{...await s.json(),ok:s.ok}}const ut=async({page:o=1,size:e=10}={})=>it(`stories?page=${o}&size=${e}`),Ae=async(o,e)=>{try{console.log(e);const t=T();let s;return s=await mt(o,e),s||(s=await fetch(U.STORY_DETAIL(e),{headers:{Authorization:`Bearer ${t}`}})),console.log(s),{ok:!0,story:s}}catch(t){return{ok:!1,message:t.message}}};async function Te(o){const e=T(),t=Le({description:o.description,photo:o.photo,lat:o==null?void 0:o.lat,lon:o==null?void 0:o.lon}),s=await fetch(U.STORE_NEW_STORY,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:t});return{...await s.json(),ok:s.ok}}async function Pe(o){const e=Le({description:o.description,photo:o.photo,lat:o==null?void 0:o.lat,lon:o==null?void 0:o.lon}),t=await fetch(U.STORE_NEW_STORY_GUEST,{method:"POST",body:e});return{...await t.json(),ok:t.ok}}async function dt({endpoint:o,keys:{p256dh:e,auth:t}}){const s=T(),i=JSON.stringify({endpoint:o,keys:{p256dh:e,auth:t}}),n=await fetch(U.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:i});return{...await n.json(),ok:n.ok}}async function ht({endpoint:o}){const e=T(),t=JSON.stringify({endpoint:o}),s=await fetch(U.UNSUBSCRIBE,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:t});return{...await s.json(),ok:s.ok}}async function ft(o,e){try{console.log(e);const t=await Ae(o,e);return console.log(t),await S.addToFavorites(t.story),{ok:!0,response:t}}catch(t){return{ok:!1,message:t.message}}}async function gt(o){try{return console.log(o),await S.removeFromFavorites(o),{ok:!0}}catch(e){return{ok:!1,message:e.message}}}const me=Object.freeze(Object.defineProperty({__proto__:null,getLogin:lt,getRegistered:ct,getStories:ut,getStoryById:Ae,removeStory:gt,saveStory:ft,storeNewStory:Te,storeNewStoryGuest:Pe,subscribePushNotification:dt,unsubscribePushNotification:ht},Symbol.toStringTag,{value:"Module"})),u={name:"StoryAppDB",version:4,stores:{favorites:"favorites",apiCache:"apiCache",postQueue:"postQueue"}};function pt(){return new Promise((o,e)=>{console.log("Opening IndexedDB...");const t=indexedDB.open(u.name,u.version);t.onupgradeneeded=s=>{console.log("Database upgrade needed...");const i=s.target.result;if(console.log("Existing stores:",Array.from(i.objectStoreNames)),i.objectStoreNames.contains(u.stores.favorites)||(console.log("Creating favorites store..."),i.createObjectStore(u.stores.favorites,{keyPath:"storyId"}).createIndex("updatedAt","updatedAt",{unique:!1})),!i.objectStoreNames.contains(u.stores.apiCache)){console.log("Creating apiCache store...");const n=i.createObjectStore(u.stores.apiCache,{keyPath:"url"});n.createIndex("timestamp","timestamp",{unique:!1}),n.createIndex("type","type",{unique:!1})}i.objectStoreNames.contains(u.stores.postQueue)||(console.log("Creating postQueue store..."),i.createObjectStore(u.stores.postQueue,{keyPath:"id",autoIncrement:!0})),console.log("Final stores:",Array.from(i.objectStoreNames))},t.onsuccess=s=>{const i=s.target.result;console.log("Database opened successfully. Available stores:",Array.from(i.objectStoreNames)),o(i)},t.onerror=s=>{console.error("Error initializing IndexedDB:",s.target.error),e(s.target.error)},t.onblocked=s=>{console.warn("Database opening blocked. Please close other tabs and reload."),alert("Please close all other tabs with this site open and reload this page.")}})}async function mt(o,e){const i=o.transaction([u.stores.favorites],"readonly").objectStore(u.stores.favorites).get(e);return new Promise((n,r)=>{i.onsuccess=()=>{console.log(i),n(i.result)},i.onerror=c=>{r(c.target.error)}})}async function yt(o){const t=o.transaction([u.stores.apiCache],"readonly").objectStore(u.stores.apiCache),s=await new Promise((i,n)=>{const r=t.getAll();r.onsuccess=()=>i(r.result),r.onerror=c=>n(c.target.error)});for(const i of s)try{if(i.url.includes("/v1/stories")){const r=(typeof i.data=="string"?JSON.parse(i.data):i.data).listStory;await wt(o,r)}}catch(n){console.warn(`Failed to process apiCache entry ${i.url}:`,n)}console.log("All data moved from cache to stories store")}async function Bt(o,e){const t=o.transaction([u.stores.postQueue],"readwrite");t.objectStore(u.stores.postQueue).add(e),await t.oncomplete}async function ae(o){const e=o.transaction([u.stores.postQueue],"readwrite"),t=e.objectStore(u.stores.postQueue),s=T(),i=await new Promise((n,r)=>{const c=t.getAll();c.onsuccess=()=>n(c.result),c.onerror=()=>r(c.error)});if(i.length!==0){for(const n of i)try{let r={ok:!1};s&&navigator.onLine&&n.type==="new"&&(r=await Te(n)),n.type==="new-guest"&&(r=await Pe(n)),console.log(r),r.ok&&await vt(o,n.id)}catch(r){console.error("Retry post error:",r)}await new Promise((n,r)=>{e.oncomplete=()=>n(),e.onerror=c=>r(c.target.error)})}}async function vt(o,e){const t=o.transaction([u.stores.postQueue],"readwrite");t.objectStore(u.stores.postQueue).delete(e),await new Promise((i,n)=>{t.oncomplete=()=>i(),t.onerror=r=>n(r.target.error)})}async function wt(o,e=[]){const t=o.transaction([u.stores.favorites],"readwrite"),s=t.objectStore(u.stores.favorites);for(const i of e)s.put({...i,storyId:i.id});await new Promise((i,n)=>{t.oncomplete=()=>i(),t.onerror=r=>n(r.target.error)})}var _,Y,x,K,le;class S{static async init(){if(a(this,Y))return a(this,_);try{return m(this,_,await pt()),m(this,Y,!0),a(this,_)}catch(e){throw console.error("Failed to initialize IndexedDB:",e),e}}static async addToFavorites(e){return new Promise(async(t,s)=>{const i=a(this,_).transaction([u.stores.favorites,u.stores.apiCache],"readwrite"),n=i.objectStore(u.stores.favorites),r=i.objectStore(u.stores.apiCache);console.log(e);const c={...e,storyId:e.id,isFavorite:!0,timestamp:Date.now(),updatedAt:new Date().toISOString()},l=n.put(c);l.onsuccess=()=>{this.broadcastChange({type:"add",storyId:e.id}),t(l.result)},l.onerror=()=>s(l.error);const f=await new Promise((g,d)=>{const y=r.getAll();y.onsuccess=()=>g(y.result),y.onerror=w=>d(w.target.error)});for(const g of f)try{g.url.includes("/v1/stories")&&this.cacheAPIResponse(g.url,g,c.storyId)}catch(d){console.warn(`Failed to process apiCache entry ${g.url}:`,d)}})}static async removeFromFavorites(e){return new Promise(async(t,s)=>{const i=a(this,_).transaction([u.stores.favorites,u.stores.apiCache],"readwrite"),n=i.objectStore(u.stores.favorites),r=i.objectStore(u.stores.apiCache);console.log(e);const c=await n.get(e);c.onsuccess=async()=>{const l=await new Promise((y,w)=>{const G=r.getAll();G.onsuccess=()=>y(G.result),G.onerror=Ve=>w(Ve.target.error)});console.log(c);const g={...c.result,isFavorite:!1};console.log(g);const d=n.put(g);d.onsuccess=()=>{this.broadcastChange({type:"remove",storyId:e}),t(d.result)},d.onerror=()=>s(d.error);for(const y of l)try{y.url.includes("/v1/stories")&&this.cacheAPIResponse(y.url,y,e)}catch(w){console.warn(`Failed to process apiCache entry ${y.url}:`,w)}}})}static async isFavorite(e){return new Promise((t,s)=>{console.log(e);const r=a(this,_).transaction([u.stores.favorites],"readonly").objectStore(u.stores.favorites).get(e);r.onsuccess=()=>{console.log(r.result),t(r.result.isFavorite)},r.onerror=()=>s(r.error)})}static broadcastChange(e){new BroadcastChannel("favorites-sync").postMessage(e)}static async clearOldCache(){return new Promise((e,t)=>{const s=a(this,_).transaction([u.stores.favorites],"readwrite"),i=s.objectStore(u.stores.favorites),n=Date.now()-30*24*60*60*1e3,r=i.openCursor();r.onsuccess=c=>{const l=c.target.result;l&&(l.value.timestamp<n&&l.delete(),l.continue())},s.oncomplete=()=>e(),s.onerror=()=>t(s.error)})}static listenToChanges(e){const t=new BroadcastChannel("favorites-sync");return t.onmessage=s=>{e(s.data)},()=>t.close()}static async cacheAPIResponse(e,t,s="",i="story"){var n,r,c;try{const f=a(this,_).transaction([u.stores.apiCache],"readwrite").objectStore(u.stores.apiCache);s&&(t.data.listStory=(n=t.data)==null?void 0:n.listStory.map(d=>s===d.id?{...d,isFavorite:!d.isFavorite}:d));const g={url:e,data:{...t.data,listStory:t.data.listStory},type:i,timestamp:Date.now()};if(console.log(g),((c=(r=g.data)==null?void 0:r.listStory)==null?void 0:c.length)===0)return;if(await new Promise((d,y)=>{const w=f.put(g);w.onsuccess=()=>d(),w.onerror=()=>y(w.error)}),v(this,K,le).call(this))try{const d=await caches.open(a(this,x)),y=new Response(JSON.stringify(g),{headers:{"Content-Type":"application/json","Cache-Control":"max-age=86400"}});console.log(y),await d.put(e,y),await yt(a(this,_)),console.log("Cached in both IndexedDB and Cache Storage:",e)}catch(d){console.warn("Cache Storage failed, using IndexedDB only:",d)}else console.log("Cache Storage not available, using IndexedDB only")}catch(l){throw console.error("Error caching API response:",l),l}}static async getFromAPICache(e){try{if(v(this,K,le).call(this))try{const i=await(await caches.open(a(this,x))).match(e);if(i){const n=await i.json();return console.log("Found in Cache Storage:",e),n}}catch(s){console.warn("Cache Storage access failed:",s)}const t=await new Promise((s,i)=>{const c=a(this,_).transaction([u.stores.apiCache],"readonly").objectStore(u.stores.apiCache).get(e);c.onsuccess=()=>s(c.result||null),c.onerror=()=>i(c.error)});return t?(console.log("Found in IndexedDB:",e),t):null}catch(t){return console.error("Error fetching from cache:",t),null}}static async clearAPICache(e=24){try{const t=e*60*60*1e3,i=a(this,_).transaction([u.stores.apiCache],"readwrite").objectStore(u.stores.apiCache),n=Date.now()-t;await new Promise((f,g)=>{const d=i.openCursor();d.onsuccess=y=>{const w=y.target.result;w?(w.value.timestamp<n&&w.delete(),w.continue()):f()},d.onerror=()=>g(d.error)});const r=await caches.open(a(this,x)),l=(await r.keys()).map(async f=>{const g=await r.match(f);if(new Date(g.headers.get("date")).getTime()<n)return r.delete(f)});await Promise.all(l),console.log("API cache cleared successfully")}catch(t){console.error("Error clearing API cache:",t)}}static async getAllFavorites(){try{return await new Promise((t,s)=>{const r=a(this,_).transaction([u.stores.favorites],"readonly").objectStore(u.stores.favorites).getAll();r.onsuccess=()=>{console.log(r.result);const c=r.result.filter(l=>l.isFavorite);c.sort((l,f)=>f.timestamp-l.timestamp),t(c)},r.onerror=()=>s(r.error)})}catch(e){return console.error("Error getting all favorites:",e),[]}}static async getFavorite(e){return new Promise((t,s)=>{console.log("DB instance:",a(this,_)),console.log("Favorites store:",u.stores.favorites);const n=a(this,_).transaction([u.stores.favorites],"readwrite").objectStore(u.stores.favorites);console.log(e);const r=n.get(e);r.onsuccess=()=>{const c=r.result;t(c?{...c,timestamp:c.timestamp,updatedAt:c.updatedAt}:null)},r.onerror=()=>s(r.error)})}}_=new WeakMap,Y=new WeakMap,x=new WeakMap,K=new WeakSet,le=function(){return"caches"in window&&window.isSecureContext},h(S,K),h(S,_,null),h(S,Y,!1),h(S,x,"api-cache-v1");class bt{constructor(){ne(this,"handleTouchStart",e=>{e.target.classList.add("active")});ne(this,"handleTouchEnd",e=>{e.target.classList.remove("active");const t=e.target.closest(".nav-link");t&&(e.preventDefault(),t.tagName==="A"?window.location.href=t.href:t.tagName==="BUTTON"&&t.click())});this.hashChangeCallbacks=[],this.content=null,this.app=null,this.isGitHubPages=window.location.hostname.includes("github.io"),this.basePath=this.isGitHubPages?"/story-web-v2":""}setApp(e){this.app=e,this.content=e.getContent()}init(){window.addEventListener("load",async()=>{Je(["/login","/register","/","/new","/new-guest","/stories/:id","/favorites","/404"]),await this.handleRoute()}),window.addEventListener("hashchange",async e=>{e.preventDefault(),await this.handleRoute(),await this.app.updateNavigation(),(async()=>await ae(await S.init()))(),this.hashChangeCallbacks.forEach(t=>t())}),window.addEventListener("online",async()=>{document.body.classList.remove("offline-mode"),(async()=>await ae(await S.init()))()}),window.addEventListener("offline",()=>{document.body.classList.add("offline-mode")}),navigator.onLine&&(async()=>await ae(await S.init()))(),this.setupNavigationHandlers()}onHashChange(e){this.hashChangeCallbacks.push(e)}async handleRoute(){const e=_e(),t=!!T();try{const s=ve[e];if(!s){window.location.hash="#/404";return}if(t&&!s.protected){window.location.hash="#/";return}if(!t&&s.protected){window.location.hash="#/login";return}const i=(await(await ce[s.file])()).default;if(!i){window.location.hash="#/404";return}const n=new i;if(this.setupMobileNavigation(),!navigator.onLine){await this.handleOfflineRoute(n);return}await this.renderPageWithTransition(n)}catch(s){console.error("Route handling error:",s),window.location.hash="#/404"}}async renderPageWithTransition(e){if(!this.content)return;if(navigator.onLine){const s=document.querySelector(".offline-banner");s&&s.remove()}const t=at({updateDOM:async()=>{window.scrollTo(0,0);try{this.content.style.opacity="0",this.content.innerHTML=await e.render(),requestAnimationFrame(()=>{this.content.style.opacity="1"}),e.afterRender&&await e.afterRender()}catch(s){console.error("Error rendering page:",s),this.content.innerHTML="<h1>Error loading page</h1>"}}});return t.ready.catch(console.error),t.updateCallbackDone}async handleOfflineRoute(e){await this.renderWithOfflineIndicator(e)}async renderWithOfflineIndicator(e){this.showOfflineBanner(),await this.renderPageWithTransition(e)}showOfflineBanner(){if(!document.querySelector(".offline-banner")){const e=document.createElement("div");e.className="offline-banner",e.innerHTML=`
        <div class="offline-banner__content">
          <i class="fas fa-wifi-slash"></i>
          <span>Anda sedang offline. Menampilkan konten tersimpan.</span>
          <button class="offline-banner__retry">Coba Lagi</button>
        </div>
      `,e.querySelector(".offline-banner__retry").addEventListener("click",()=>{window.location.reload()}),document.body.insertBefore(e,document.body.firstChild)}}setupMobileNavigation(){document.querySelectorAll(".nav-link").forEach(t=>{t.removeEventListener("touchstart",this.handleTouchStart),t.removeEventListener("touchend",this.handleTouchEnd),t.addEventListener("touchstart",this.handleTouchStart),t.addEventListener("touchend",this.handleTouchEnd)})}setupNavigationHandlers(){document.addEventListener("click",e=>{var s;const t=e.target.closest("a, button.nav-link");if(t)if(t.tagName==="A"&&((s=t.getAttribute("href"))!=null&&s.startsWith("#"))){e.preventDefault();const i=t.getAttribute("href");window.location.hash=i}else t.id==="logout-button"&&(e.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&this.handleLogout())})}}const _t=`
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
`,Ce=document.createElement("style");Ce.textContent=_t;document.head.appendChild(Ce);const ue=new bt;function Nt(){return`
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
  `}const Ft=({id:o,description:e,photoUrl:t,createdAt:s,name:i,placeName:n,isFavorited:r,isOffline:c=!1})=>`
  <article class="story-item ${c?"offline":""}" id="story-${o}">
    <div class="story-item__image-container">
      <img class="story-item__image" src="${t}" alt="${e}" loading="lazy">
      ${n?`<div class="story-item__location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${n}</span>
            </div>`:""}
    </div>
    <div class="story-item__content">
      <div class="story-item__header">
        <span class="story-item__title">${i}</span>
        <span class="story-item__date">${ke(s)}</span>
      </div>
      <p class="story-item__description">${e}</p>
      <div class="story-item__actions">
        <a href="#/stories/${o}" class="story-item__read-more">
          <span>Baca Selengkapnya</span>
          <i class="fas fa-arrow-right"></i>
        </a>
        ${Et(o,r)}
      </div>
    </div>
  </article>
`;function Mt(o){return`
    <div class="story-detail__header">
      <h1 class="story-detail__description">${o.description}</h1>
      <div class="story-detail__more-info">
        <div class="story-detail__more-info__inline">
          <span class="story-detail__createdat">
            <i class="fas fa-calendar"></i>
            ${ke(o.createdAt)}
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
          ${St(o.id,o.isFavorite)}
        </div>
      </div>
    </div>
  `}function ee(){return`
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `}function ye(){return`
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `}const St=(o,e=!1)=>`
  <button 
    data-story-id=${o}
    data-favorited=${e}
    id="story-detail-favorite" 
    class="story-detail__favorite ${e?"active":""}"
    aria-label="${e?"Remove from favorites":"Add to favorites"}"
  >
    ${oe(e)}
    ${Ie(e)}
  </button>
`,Et=(o,e=!1)=>`
  <button 
    data-story-id=${o}
    data-favorited=${e}
    class="story-item__favorite ${e?"active":""}"
    aria-label="${e?"Remove from favorites":"Add to favorites"}"
  >
    ${oe(e)}
  </button>
`,Ie=(o=!1)=>`
  <span>${o?"Hapus dari Favorit":"Tambah ke Favorit"}</span>
`,oe=(o=!1)=>`
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
`;function kt(o,e="success"){return`
    <div class="notification notification--${e}">
      <div class="notification__content">
        <i class="fas ${e==="success"?"fa-check-circle":"fa-exclamation-circle"}"></i>
        <span class="notification__message">${o}</span>
        <button class="notification__close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `}const Lt=()=>`
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
`,At=()=>`
  <li id="push-notification-container" class="push-notification-container">
    ${ee()}
  </li>
  <li>
    <button class="nav-menu__logout" id="logout-button">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </button>
  </li>
`,Tt=()=>`
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
`;var q,$,Oe,je,De;class ie{static async init(e){if(m(this,q,e),!await v(this,$,Oe).call(this))return v(this,$,je).call(this),!1;let s=0;const i=5,n=async()=>{if(s>=i){console.log("Failed to find notification container after maximum attempts");return}await v(this,$,De).call(this),document.getElementById("push-notification-container")||(s++,setTimeout(n,1e3))};await n()}static async checkSubscription(){var e;try{const t=await((e=navigator.serviceWorker)==null?void 0:e.ready),s=await(t==null?void 0:t.pushManager.getSubscription());return console.log("Current subscription:",s),s?(localStorage.setItem("pushSubscription",JSON.stringify(s)),!0):(localStorage.removeItem("pushSubscription"),!1)}catch(t){return console.error("Error checking subscription status:",t),!1}}static async requestPermission(){const e=await Notification.requestPermission();return e==="denied"?(console.log("Notifikasi tidak diizinkan"),!1):e==="default"?(console.log("Pengguna menutup kotak dialog permintaan izin"),!1):!0}static async subscribePushMessage(e){var t;console.log("Subscribing to push messages");try{e.disabled=!0;const s=await((t=navigator.serviceWorker)==null?void 0:t.ready),i=await(s==null?void 0:s.pushManager.getSubscription());if(console.log(i),i)return localStorage.setItem("pushSubscription",JSON.stringify(i)),this.updateSubscribeButtonState(e,!0),this.showNotification("Already subscribed, You are already receiving notifications","success"),i;console.log("Creating new push subscription..."),console.log(s);const n=nt(E.VAPID_PUBLIC_KEY);console.log(n);const r=await s.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:n});console.log(r);const c=r.toJSON();console.log("Push subscription created:",c),console.log("Sending subscription to server...");const l=await a(this,q).subscribePushNotification({endpoint:c.endpoint,keys:{p256dh:c.keys.p256dh,auth:c.keys.auth}});console.log("Server response:",l),localStorage.setItem("pushSubscription",JSON.stringify(r)),this.updateSubscribeButtonState(e,!0),this.showNotification("Push enabled!, You've successfully subscribed to notifications","success"),console.log("Successfully subscribed to push messages"),localStorage.removeItem("pendingSubscribe"),localStorage.removeItem("pendingUnsubscribe")}catch(s){throw console.error("Failed to subscribe:",s),localStorage.removeItem("pushSubscription"),localStorage.removeItem("pendingSubscribe"),localStorage.removeItem("pendingUnsubscribe"),this.showNotification("Failed to subscribe, Please try again or check your settings","error"),s}finally{e.disabled=!1}}static async unsubscribePushMessage(e){var t;try{e.disabled=!0;const s=await((t=navigator.serviceWorker)==null?void 0:t.ready),i=await(s==null?void 0:s.pushManager.getSubscription());if(i){console.log("Existing subscription found:",i);const n=i.toJSON(),r=await i.unsubscribe();console.log("Unsubscribed from push manager:",r),await a(this,q).unsubscribePushNotification({endpoint:n.endpoint}),localStorage.removeItem("pushSubscription"),this.updateSubscribeButtonState(e,!1),console.log("Successfully unsubscribed from push messages"),this.showNotification("Unsubscribed, You have successfully unsubscribed from notifications","success")}else console.log("No active subscription found to unsubscribe"),this.updateSubscribeButtonState(e,!1),this.showNotification("No subscription, You were not subscribed to notifications","success");localStorage.removeItem("pendingSubscribe"),localStorage.removeItem("pendingUnsubscribe")}catch(s){throw console.error("Failed to unsubscribe:",s),localStorage.removeItem("pendingSubscribe"),localStorage.removeItem("pendingUnsubscribe"),this.showNotification("Unsubscribe Failed, Could not unsubscribe. Try again later.","error"),s}finally{e.disabled=!1}}static async updateSubscribeButtonState(e,t){if(console.log(e),!!e)if(console.log(t),t){e.innerHTML=ye();const s=e.querySelector("#unsubscribe-button");s&&s.addEventListener("click",async()=>{navigator.onLine?(await this.unsubscribePushMessage(e),localStorage.removeItem("pendingUnsubscribe")):(localStorage.setItem("pendingUnsubscribe","true"),alert("You're offline. We'll unsubscribe you when you're back online."))})}else{e.innerHTML=ee();const s=e.querySelector("#subscribe-button");s&&s.addEventListener("click",async()=>{await this.requestPermission()&&(navigator.onLine?(await this.subscribePushMessage(e),localStorage.removeItem("pendingSubscribe")):(localStorage.setItem("pendingSubscribe","true"),alert("You're offline. We'll subscribe you when you're back online.")))})}}static showNotification(e,t="success"){const s=document.querySelector(".notification");s&&s.remove();let i=document.getElementById("notification-container");i||(i=document.createElement("div"),i.id="notification-container",document.body.appendChild(i)),i.innerHTML=kt(e,t);const n=i.querySelector(".notification__close");n&&n.addEventListener("click",()=>{i.innerHTML=""}),setTimeout(()=>{i&&(i.innerHTML="")},3e3)}}q=new WeakMap,$=new WeakSet,Oe=async function(){var s;const e=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),t=/iPhone|iPad|iPod/i.test(navigator.userAgent);if(!("Notification"in window))return console.log("Browser tidak mendukung notifikasi"),!1;if(!("serviceWorker"in navigator))return console.log("Browser tidak mendukung service worker"),!1;if(t)return console.log("Push notifications tidak didukung di iOS"),!1;if(e&&!("PushManager"in window))return console.log("Push notifications tidak didukung di perangkat ini"),!1;try{console.log("checking service worker ready...");const i=await((s=navigator.serviceWorker)==null?void 0:s.ready);return console.log("Service Worker ready:",i),console.log("VAPID Key:",E.VAPID_PUBLIC_KEY),!0}catch(i){return console.error("Service Worker not ready:",i),!1}},je=function(){const e=document.getElementById("push-notification-container");if(!e)return;e.innerHTML=`
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
    `,s=document.createElement("style");s.textContent=t,document.head.appendChild(s)},De=async function(){const e=document.getElementById("push-notification-container");if(console.log("Notification container:",e),!e){console.log("Notification container not found");return}console.log("Setting up notification button"),e.innerHTML="";try{const t=await this.checkSubscription();if(console.log("Is subscribed:",t),t){e.innerHTML=ye();const s=e.querySelector("#unsubscribe-button");s&&s.addEventListener("click",async()=>{try{console.log("Unsubscribe clicked"),navigator.onLine?(await this.unsubscribePushMessage(e),localStorage.removeItem("pendingUnsubscribe")):(localStorage.setItem("pendingUnsubscribe","true"),alert("You're offline. We'll unsubscribe you when you're back online."))}catch(i){console.error("Error unsubscribing:",i),alert("Gagal berhenti berlangganan. Silakan coba lagi.")}})}else{e.innerHTML=ee();const s=e.querySelector("#subscribe-button");s&&s.addEventListener("click",async()=>{try{console.log("Subscribe clicked"),await this.requestPermission()?navigator.onLine?(await this.subscribePushMessage(e),localStorage.removeItem("pendingSubscribe")):(localStorage.setItem("pendingSubscribe","true"),alert("You're offline. We'll subscribe you when you're back online.")):alert("Mohon izinkan notifikasi untuk mendapatkan pemberitahuan.")}catch(i){console.error("Error subscribing:",i),i.name==="NotAllowedError"?alert("Mohon izinkan notifikasi di pengaturan browser Anda."):alert("Gagal berlangganan. Silakan coba lagi.")}})}}catch(t){console.error("Error setting up notification button:",t),e.innerHTML=ee()}},h(ie,$),h(ie,q,null);var H,C,J,V,Be,Ne;class W{static async init(e){if(!a(this,C))try{m(this,H,e),m(this,J,await S.init()),v(this,V,Ne).call(this),v(this,V,Be).call(this),m(this,C,!0),console.log("FavoriteManager initialized successfully")}catch(t){throw console.error("Error initializing FavoriteManager:",t),t}}static async refreshFavorites(e=null){try{const t=await this.getAllFavorites();if(console.log("Refreshed favorites:",t),localStorage.setItem("favorites",JSON.stringify(t)),e){if(!await this.isFavorite(e)){const i=document.getElementById("favorites-list");if(i){const n=i.querySelector(`[data-story-id="${e}"]`).closest(".story-item");if(n&&(n.classList.add("removing"),await new Promise(c=>{n.addEventListener("transitionend",()=>{n.remove(),c()},{once:!0})}),i.querySelectorAll(".story-item").length===0)){i.innerHTML="<p>Belum ada cerita favorit.</p>";const c=document.getElementById("pagination-container");c&&(c.innerHTML="")}}}}else if(document.getElementById("favorites-list")){const i=new CustomEvent("favorites-updated",{detail:{favorites:t,currentPage:1,pageSize:10}});document.dispatchEvent(i)}}catch(t){console.error("Error refreshing favorites:",t);const s=new CustomEvent("favorites-update-error",{detail:t});document.dispatchEvent(s)}}static toggleFavoriteDetail(){document.addEventListener("click",async e=>{const t=e.target.closest(".story-detail__favorite");if(t)try{if(!a(this,C))throw new Error("FavoriteManager not initialized");const s=i=>oe(i)+Ie(i);await this.toggleHandleFavorite(t,s)}catch(s){console.error("Error toggling favorite:",s),alert("Gagal mengubah status favorit.")}})}static toggleFavoriteItem(){document.addEventListener("click",async e=>{const t=e.target.closest(".story-item__favorite");if(t)try{if(!a(this,C))throw new Error("FavoriteManager not initialized");const s=i=>oe(i);await this.toggleHandleFavorite(t,s)}catch(s){console.error("Error toggling favorite:",s),alert("Gagal mengubah status favorit.")}})}static async toggleHandleFavorite(e,t){const s=e.dataset.favorited,i=e.dataset.storyId,n=s==="true",r=!n;if(n===r){console.log("No change in favorite state; skipping.");return}e.dataset.favorited=r.toString();const c=t(r);e.classList.toggle("active",r),e.innerHTML=c,e.disabled=!0;try{r?await this.handleSaveStory(i):await this.handleRemoveStory(i)}catch(l){console.error(l),e.dataset.favorited=n.toString(),e.classList.toggle("active",n),e.innerHTML=t(n)}finally{e.disabled=!1}}static async isFavorite(e){if(!a(this,C))throw new Error("FavoriteManager not initialized");try{return await S.isFavorite(e)}catch(t){return console.error("Error checking favorite status:",t),!1}}static async getAllFavorites(){if(!a(this,C))throw new Error("FavoriteManager not initialized");try{return await S.getAllFavorites()}catch(e){return console.error("Error getting all favorites:",e),[]}}static showNotification(e,t="success"){ie.showNotification(e,t)}static async handleSaveStory(e){try{const t=await a(this,H).saveStory(a(this,J),e);if(t.ok)this.showNotification("Story berhasil disimpan!","success");else throw new Error(t.message||"Gagal menyimpan story")}catch(t){console.error("Error saving story:",t),this.showNotification("Gagal menyimpan story: "+t.message,"error")}}static async handleRemoveStory(e){try{console.log(e);const t=await a(this,H).removeStory(e);if(t.ok)this.showNotification("Story berhasil dihapus dari favorite!","success");else throw new Error(t.message||"Gagal menghapus story")}catch(t){console.error("Error removing story:",t),this.showNotification("Gagal menghapus story: "+t.message,"error")}}}H=new WeakMap,C=new WeakMap,J=new WeakMap,V=new WeakSet,Be=function(){this.toggleFavoriteDetail(),this.toggleFavoriteItem()},Ne=function(){const e=new BroadcastChannel("favorites-sync");e.onmessage=async t=>{const s=t.data;(s.type==="remove"||s.type==="add"||s.type==="update")&&await this.refreshFavorites(s.storyId)}},h(W,V),h(W,H,null),h(W,C,!1),h(W,J,!1);var z,Q,R,$e,te;class Re{constructor({content:e,skipLinkButton:t}){h(this,R);h(this,z);h(this,Q);m(this,z,e),m(this,Q,t),ue.setApp(this),v(this,R,$e).call(this)}getContent(){return a(this,z)}async updateNavigation(){await v(this,R,te).call(this)}async initializeApp(){await W.init(me),await v(this,R,te).call(this),setInterval(()=>{S.clearOldCache(),S.clearAPICache()},60*60*1e3)}}z=new WeakMap,Q=new WeakMap,R=new WeakSet,$e=function(){rt(a(this,Q),a(this,z)),v(this,R,te).call(this),ue.init()},te=async function(){const e=!!T(),t=document.getElementById("navigation-drawer"),s=t==null?void 0:t.children.namedItem("navlist-main"),i=t==null?void 0:t.children.namedItem("navlist");if(e)s&&(s.innerHTML=Lt()),i&&(i.innerHTML=At());else{s&&(s.innerHTML=""),i&&(i.innerHTML=Tt());return}const n=document.getElementById("logout-button");n&&n.addEventListener("click",r=>{r.preventDefault(),confirm("Apakah Anda yakin ingin keluar?")&&Ee()}),e&&await ie.init(me)};const Pt=Object.freeze(Object.defineProperty({__proto__:null,default:Re},Symbol.toStringTag,{value:"Module"}));var I,M,D,B,L,N,k,X,A,Fe,Me,Ue,se;const fe=class fe{constructor({video:e,cameraSelect:t,canvas:s,options:i={}}){h(this,A);h(this,I);h(this,M,!1);h(this,D,640);h(this,B,0);h(this,L);h(this,N);h(this,k);h(this,X);m(this,L,e),m(this,N,t),m(this,k,s),v(this,A,Fe).call(this)}static addNewStream(e){if(!Array.isArray(window.currentStreams)){window.currentStreams=[e];return}window.currentStreams=[...window.currentStreams,e]}static stopAllStreams(){var e;if(!Array.isArray(window==null?void 0:window.currentStreams)){window.currentStreams=[];return}(e=window==null?void 0:window.currentStreams)==null||e.forEach(t=>{t.active&&t.getTracks().forEach(s=>s.stop())})}async launch(){m(this,I,await v(this,A,Ue).call(this)),a(this,I)||v(this,A,se).call(this),fe.addNewStream(a(this,I)),a(this,L).srcObject=a(this,I),a(this,L).play(),v(this,A,se).call(this)}stop(){a(this,L)&&(a(this,L).srcObject=null,m(this,M,!1)),a(this,I)instanceof MediaStream&&a(this,I).getTracks().forEach(e=>{e.stop()}),v(this,A,se).call(this)}async takePicture(){if(!(a(this,D)&&a(this,B)))return null;const e=a(this,k).getContext("2d");return a(this,k).width=a(this,D),a(this,k).height=a(this,B),e.drawImage(a(this,L),0,0,a(this,D),a(this,B)),await new Promise(t=>{a(this,k).toBlob(s=>t(s))})}addCheeseButtonListener(e,t){m(this,X,document.querySelector(e)),a(this,X).onclick=t}};I=new WeakMap,M=new WeakMap,D=new WeakMap,B=new WeakMap,L=new WeakMap,N=new WeakMap,k=new WeakMap,X=new WeakMap,A=new WeakSet,Fe=function(){a(this,L).oncanplay=()=>{a(this,M)||(m(this,B,a(this,L).videoHeight*a(this,D)/a(this,L).videoWidth),a(this,k).setAttribute("width",a(this,D)),a(this,k).setAttribute("height",a(this,B)),m(this,M,!0))},a(this,N).onchange=async()=>{this.stop(),await this.launch()}},Me=async function(e){try{if(!(e instanceof MediaStream))return Promise.reject(Error("MediaStream not found!"));const{deviceId:t}=e.getVideoTracks()[0].getSettings(),n=(await navigator.mediaDevices.enumerateDevices()).filter(r=>r.kind==="videoinput").reduce((r,c,l)=>r.concat(`
          <option
            value="${c.deviceId}"
            ${t===c.deviceId?"selected":""}
          >
            ${c.label||`Camera ${l+1}`}
          </option>
        `),"");return a(this,N).innerHTML=n,{ok:!0}}catch(t){return console.error("#populateDeviceList: error:",t),{ok:!1,message:t.message}}},Ue=async function(){try{const e=!a(this,M)&&!a(this,N).value?void 0:{exact:a(this,N).value},t=await navigator.mediaDevices.getUserMedia({video:{aspectRatio:4/3,deviceId:e}}),s=await v(this,A,Me).call(this,t);return s.ok||alert(s==null?void 0:s.message),t}catch(e){return console.error("#getStream: error:",e),alert(e.message),null}},se=function(){const e=a(this,k).getContext("2d");e.fillStyle="#AAAAAA",e.fillRect(0,0,a(this,k).width,a(this,k).height)};let de=fe;var O,p,Z,j,P,xe,qe,He,ze;class F{static init(){m(this,O,document.getElementById("drawer-button")),m(this,p,document.getElementById("navigation-drawer")),m(this,Z,!1),m(this,j,!1),!a(this,Z)&&(v(this,P,xe).call(this),v(this,P,qe).call(this),this.initialized=!0)}static isDrawerOpen(){return a(this,p).classList.contains("open")}static toggleDrawer(){window.innerWidth>768||(this.isDrawerOpen()?this.closeDrawer():this.openDrawer())}static openDrawer(){a(this,j)||window.innerWidth>768||(a(this,p).style.visibility="visible",requestAnimationFrame(()=>{a(this,O).classList.add("open"),a(this,p).classList.remove("closing"),a(this,p).classList.add("open"),a(this,p).style.transform="translateX(0%)",document.body.classList.add("drawer-open"),setTimeout(()=>{document.body.classList.add("overlay-visible")},50)}))}static closeDrawer(){a(this,j)||window.innerWidth>768||(m(this,j,!0),a(this,O).classList.remove("open"),a(this,p).classList.add("closing"),requestAnimationFrame(()=>{a(this,p).classList.remove("open"),a(this,p).style.transform="translateX(100%)",document.body.classList.remove("overlay-visible"),setTimeout(()=>{document.body.classList.remove("drawer-open"),a(this,p).style.visibility="visible",m(this,j,!1)},300)}))}static updateActiveLink(){const e=window.location.hash||"#/";a(this,p).querySelectorAll("a").forEach(s=>{s.getAttribute("href")===e?s.classList.add("active"):s.classList.remove("active")})}}O=new WeakMap,p=new WeakMap,Z=new WeakMap,j=new WeakMap,P=new WeakSet,xe=function(){window.innerWidth<=768&&(a(this,p).style.visibility="hidden",a(this,p).style.transform="translateX(100%)")},qe=function(){var e;(e=a(this,O))==null||e.addEventListener("click",t=>{t.stopPropagation(),this.toggleDrawer()}),window.addEventListener("resize",()=>{v(this,P,He).call(this)}),document.addEventListener("click",t=>{this.isDrawerOpen()&&!a(this,p).contains(t.target)&&!a(this,O).contains(t.target)&&this.closeDrawer()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&this.isDrawerOpen()&&this.closeDrawer()}),a(this,p).addEventListener("transitionend",t=>{v(this,P,ze).call(this,t)}),window.addEventListener("hashchange",()=>{window.innerWidth<=768&&this.closeDrawer()})},He=function(){window.innerWidth>768?(a(this,p).style.visibility="visible",a(this,p).classList.remove("open","closing"),a(this,O).classList.remove("open"),document.body.classList.remove("drawer-open","overlay-visible"),a(this,p).style.transform="none"):this.isDrawerOpen()||(a(this,p).style.visibility="hidden",a(this,p).style.transform="translateX(100%)")},ze=function(e){e.propertyName==="transform"&&!this.isDrawerOpen()&&window.innerWidth<=768&&(a(this,p).style.visibility="hidden",a(this,p).classList.remove("closing"),m(this,j,!1))},h(F,P),h(F,O),h(F,p),h(F,Z),h(F,j);he(o=>{o=="login"?(console.log("Login detected in another tab"),window.location.hash="/"):o==="logout"&&(console.log("Logout detected in another tab"),window.location.hash="/login")});document.addEventListener("DOMContentLoaded",async()=>{await new Re({content:document.getElementById("main-content"),skipLinkButton:document.getElementById("skip-link")}).initializeApp(),await S.init(),F.init(),ue.onHashChange(()=>{F.init(),de.stopAllStreams()})});export{Ot as A,de as C,W as F,S as I,me as S,xt as a,Nt as b,Rt as c,Ut as d,Dt as e,Mt as f,Ft as g,jt as h,$t as i,E as j,It as p,Bt as q};
