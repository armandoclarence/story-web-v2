export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export const generatePaginationTemplate = (currentPage, isLastPage) => `
  <div class="pagination">
    <button id="prev-page" aria-label="Previous page" class="pagination-button" ${currentPage === 1 ? 'disabled' : ''}>
      <i class="fas fa-chevron-left"></i>
    </button>
    <span class="pagination-info">Halaman ${currentPage}</span>
    <button id="next-page" aria-label="Next page" class="pagination-button" ${isLastPage ? 'disabled' : ''}>
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
`;

export function generateNotificationTemplate(message, type = 'success') {
  return `
    <div class="notification notification--${type}">
      <div class="notification__content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span class="notification__message">${message}</span>
        <button class="notification__close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `;
}
