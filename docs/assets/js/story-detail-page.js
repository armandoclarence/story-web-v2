var s=e=>{throw TypeError(e)};var m=(e,n,t)=>n.has(e)||s("Cannot "+t);var i=(e,n,t)=>(m(e,n,"read from private field"),t?t.call(e):n.get(e)),r=(e,n,t)=>n.has(e)?s("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,t),l=(e,n,t,d)=>(m(e,n,"write to private field"),d?d.call(e,t):n.set(e,t),t);import{p as u,S as y,f as h,h as b,i as M,d as c}from"./index.js";import B from"./story-detail-presenter.js";import{M as E}from"./map.js";import"./api-mapper.js";var o,a;class D{constructor(){r(this,o,null);r(this,a,null)}async render(){return`
      <section>
        <div class="story-detail__container">
          <div id="story-detail" class="story-detail"></div>
          <div id="story-detail-loading-container"></div>
        </div>
      </section>
    `}async afterRender(){l(this,o,new B(u().id,{view:this,apiModel:y})),i(this,o).showStoryDetail()}async populateStoryDetailAndInitialMap(n,t){if(console.log(t),document.getElementById("story-detail")&&(document.getElementById("story-detail").innerHTML=h({...t})),b(document.getElementById("images")),await i(this,o).showStoryDetailMap(),console.log(i(this,a)),i(this,a)&&t.lat&&t.lon){const d=[t.lat,t.lon],p={alt:t.description},g={content:t.description};i(this,a).changeCamera(d),i(this,a).addMarker(d,p,g)}}populateStoryDetailError(n){document.getElementById("story-detail").innerHTML=M(n)}async initialMap(){document.getElementById("map")&&l(this,a,await E.build("#map",{zoom:15},!0))}showStoryDetailLoading(){document.getElementById("story-detail-loading-container").innerHTML=c()}hideStoryDetailLoading(){document.getElementById("story-detail-loading-container").innerHTML=""}showMapLoading(){document.getElementById("map-loading-container")&&(document.getElementById("map-loading-container").innerHTML=c())}hideMapLoading(){document.getElementById("map-loading-container")&&(document.getElementById("map-loading-container").innerHTML="")}showSubmitLoadingButton(){document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Tanggapi
      </button>
    `}hideSubmitLoadingButton(){document.getElementById("submit-button-container").innerHTML=`
      <button class="btn" type="submit">Tanggapi</button>
    `}}o=new WeakMap,a=new WeakMap;export{D as default};
