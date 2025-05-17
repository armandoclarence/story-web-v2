var L=i=>{throw TypeError(i)};var u=(i,t,e)=>t.has(i)||L("Cannot "+e);var n=(i,t,e)=>(u(i,t,"read from private field"),e?e.call(i):t.get(i)),g=(i,t,e)=>t.has(i)?L("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e),p=(i,t,e,s)=>(u(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e),y=(i,t,e)=>(u(i,t,"access private method"),e);var h=(i,t,e,s)=>({set _(d){p(i,t,d,e)},get _(){return n(i,t,s)}});import w from"./home-presenter.js";import{S as E,F as I,g as T,a as B,b as M,c as b,d as H}from"./index.js";import{s as P}from"./api-mapper.js";import"./map.js";var r,a,l,m,v;class k{constructor(){g(this,m);g(this,r,1);g(this,a,10);g(this,l)}async render(){return`
      <section class="container">
        <h1 class="section-title">Daftar Story</h1>

        <div class="stories-list__container">
          <div id="offline-indicator"></div>
          <div id="stories-list"></div>
          <div id="stories-list-loading-container"></div>
          <div id="pagination-container"></div>
        </div>
      </section>
    `}async afterRender(){p(this,l,new w({view:this,model:E})),await I.init(E),await n(this,l).loadStories({page:n(this,r),size:n(this,a)}),y(this,m,v).call(this)}async populateStoriesList(t,e,s=!1){if((e==null?void 0:e.length)<=0){this.populateStoriesListEmpty();return}const d=await Promise.all(e.map(async o=>{const S=await P(o);return console.log(o),T({...S,isFavorited:o.isFavorite,isOffline:s})})).then(o=>o.join("")),f=document.getElementById("stories-list");if(!f){console.error("Element 'stories-list' not found!");return}f.innerHTML=`
      <div class="stories-list">${d}</div>
    `;const c=document.getElementById("pagination-container");if(c){const o=e.length<n(this,a);c.innerHTML=B(n(this,r),o)}s?this.showOfflineIndicator():this.hideOfflineIndicator()}populateStoriesListEmpty(){const t=document.getElementById("stories-list");if(!t){console.error("Element 'stories-list' not found!");return}t.innerHTML=M()}populateStoriesListError(t){const e=document.getElementById("stories-list");if(!e){console.error("Element 'stories-list' not found!");return}e.innerHTML=b(t)}showLoading(){const t=document.getElementById("stories-list-loading-container");if(!t){console.error("Element 'stories-list-loading-container' not found!");return}t.innerHTML=H()}hideLoading(){const t=document.getElementById("stories-list-loading-container");if(!t){console.error("Element 'stories-list-loading-container' not found!");return}t.innerHTML=""}showOfflineIndicator(){const t=document.getElementById("offline-indicator");if(!t)return;t.innerHTML=`
      <div class="offline-indicator">
        <i class="fas fa-wifi wifi-slash"></i>
        <span>Anda sedang offline. Menampilkan cerita yang tersimpan.</span>
        <button class="offline-indicator__retry">Coba Lagi</button>
      </div>
    `;const e=t.querySelector(".offline-indicator__retry");e&&e.addEventListener("click",()=>{window.location.reload()})}hideOfflineIndicator(){const t=document.getElementById("offline-indicator");t&&(t.innerHTML="")}}r=new WeakMap,a=new WeakMap,l=new WeakMap,m=new WeakSet,v=function(){const t=document.getElementById("pagination-container");if(!t)return;let e=!1;t.addEventListener("click",async s=>{if(e)return;const d=s.target.closest("#prev-page"),f=s.target.closest("#next-page");if(d||f)try{e=!0,t.querySelectorAll("button").forEach(o=>{o.disabled=!0,o.classList.add("loading")}),d&&n(this,r)>1?(h(this,r)._--,await n(this,l).loadStories({page:n(this,r),size:n(this,a)})):f&&(h(this,r)._++,await n(this,l).loadStories({page:n(this,r),size:n(this,a)}))}catch(c){console.error("Error loading stories:",c)}finally{e=!1,t.querySelectorAll("button").forEach(o=>{o.disabled=!1,o.classList.remove("loading")})}})};export{k as default};
