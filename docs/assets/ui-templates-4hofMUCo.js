function t(){return`
    <div class="loader loader-absolute"></div>
  `}const s=(a,i)=>`
  <div class="pagination">
    <button id="prev-page" aria-label="Previous page" class="pagination-button" ${a===1?"disabled":""}>
      <i class="fas fa-chevron-left"></i>
    </button>
    <span class="pagination-info">Halaman ${a}</span>
    <button id="next-page" aria-label="Next page" class="pagination-button" ${i?"disabled":""}>
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
`;function n(a,i="success"){return`
    <div class="notification notification--${i}">
      <div class="notification__content">
        <i class="fas ${i==="success"?"fa-check-circle":"fa-exclamation-circle"}"></i>
        <span class="notification__message">${a}</span>
        <button class="notification__close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `}export{t as a,n as b,s as g};
