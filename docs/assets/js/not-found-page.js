var t=a=>{throw TypeError(a)};var f=(a,e,s)=>e.has(a)||t("Cannot "+s);var o=(a,e,s)=>e.has(a)?t("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,s);var i=(a,e,s)=>(f(a,e,"access private method"),s);var n,r;class d{constructor(){o(this,n)}async render(){return`
      <div class="not-found-container">
        <div class="not-found-content">
          <div class="not-found-icon">
            <i class="fas fa-compass"></i>
          </div>
          <h1 class="not-found-title">Page Not Found</h1>
          <p class="not-found-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div class="not-found-actions">
            <a href="#/" class="home-link">
              <i class="fas fa-home"></i> Back to Home
            </a>
            <a href="#/favorites" class="favorites-link">
              <i class="fas fa-heart"></i> View Favorites
            </a>
            <div id="new-story-button-container"></div>
          </div>
        </div>
      </div>
    `}async afterRender(){i(this,n,r).call(this)}}n=new WeakSet,r=function(){const e=document.getElementById("new-story-button-container");if(!e)return;const s=localStorage.getItem("token"),c=localStorage.getItem("storyDraft");s?e.innerHTML=`
        <a href="#/new" class="new-story-link">
          <i class="fas fa-pen"></i> Create Story
        </a>
      `:c?e.innerHTML=`
        <a href="#/new" class="draft-link">
          <i class="fas fa-pen"></i> Continue Draft
        </a>
      `:e.innerHTML=`
        <a href="#/new" class="new-story-link">
          <i class="fas fa-plus"></i> Create Story
        </a>
      `};export{d as default};
