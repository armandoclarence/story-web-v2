export default class NotFoundPage {
  async render() {
    return `
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
    `;
  }

  async afterRender() {
    this.#renderNewStoryButton();
  }

  #renderNewStoryButton() {
    const container = document.getElementById('new-story-button-container');
    if (!container) return;

    const isLoggedIn = localStorage.getItem('token');
    const hasDraft = localStorage.getItem('storyDraft');

    if (isLoggedIn) {
      container.innerHTML = `
        <a href="#/new" class="new-story-link">
          <i class="fas fa-pen"></i> Create Story
        </a>
      `;
    } else if (hasDraft) {
      container.innerHTML = `
        <a href="#/new-guest" class="draft-link">
          <i class="fas fa-pen"></i> Continue Draft
        </a>
      `;
    } else {
      container.innerHTML = `
        <a href="#/new-guest" class="new-story-link">
          <i class="fas fa-plus"></i> Create Story
        </a>
      `;
    }
  }
}
