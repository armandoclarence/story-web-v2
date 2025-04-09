import HomePresenter from './home-presenter';
import * as StoryAPI from '../../data/api';
import { storyMapper } from '../../data/api-mapper';
import FavoriteManager from '../../utils/favorite-manager';
import {
  generateLoaderAbsoluteTemplate,
  generateStoryItemTemplate,
  generateStoriesListEmptyTemplate,
  generateStoriesListErrorTemplate,
  generatePaginationTemplate,
} from '../../templates';

export default class HomePage {
  #currentPage = 1;
  #pageSize = 10;
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1 class="section-title">Daftar Story</h1>

        <div class="stories-list__container">
          <div id="offline-indicator"></div>
          <div id="stories-list"></div>
          <div id="stories-list-loading-container"></div>
          <div id="pagination-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: StoryAPI,
    });

    await FavoriteManager.init(StoryAPI);

    await this.#presenter.loadStories({
      page: this.#currentPage,
      size: this.#pageSize
    });
    this.#initializePagination();
    this.#initializeFavorites();
  }

  #initializeFavorites() {
    const storiesList = document.getElementById('stories-list');
    if (!storiesList) return;

    storiesList.addEventListener('click', async (event) => {
      const favoriteButton = event.target.closest('.story-item__favorite');
      if (!favoriteButton) return;

      const storyId = favoriteButton.dataset.storyId;
      if (!storyId) return;

      try {
        if (favoriteButton.classList.contains('active')) {
          await this.#presenter.toggleFavorite(storyId);
          // Remove the story item from the UI with animation
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Gagal menghapus cerita dari favorit.');
      }
    });
  }


  #initializePagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;

    paginationContainer.addEventListener('click', async (event) => {
      if (event.target.closest('#prev-page')) {
        if (this.#currentPage > 1) {
          this.#currentPage--;
          await this.#presenter.loadStories({
            page: this.#currentPage,
            size: this.#pageSize,
          });
        }
      } else if (event.target.closest('#next-page')) {
        this.#currentPage++;
        await this.#presenter.loadStories({
          page: this.#currentPage,
          size: this.#pageSize,
        });
      }
    });
  }

  async populateStoriesList(message, stories, isOffline = false) {
    if (stories?.length <= 0) {
      this.populateStoriesListEmpty();
      return;
    }
  
    const html = await Promise.all(stories.map(async (story) => {
      const storyMapped = await storyMapper(story);
      const isFavorited = await FavoriteManager.isFavorite(story.id);
      return generateStoryItemTemplate({
        ...storyMapped,
        isFavorited,
        isOffline,
      });
    })).then(templates => templates.join(''));
  
    const storiesList = document.getElementById('stories-list');
    if (!storiesList) {
      console.error("Element 'stories-list' not found!");
      return;
    }
    storiesList.innerHTML = `
      <div class="stories-list">${html}</div>
    `;
  
    const paginationContainer = document.getElementById('pagination-container');
    if (paginationContainer) {
      const isLastPage = stories.length < this.#pageSize;
      paginationContainer.innerHTML = generatePaginationTemplate(this.#currentPage, isLastPage);
    }

    if (isOffline) {
      this.showOfflineIndicator();
    } else {
      this.hideOfflineIndicator();
    }
  }

  populateStoriesListEmpty() {
    const storiesList = document.getElementById('stories-list');
    if (!storiesList) {
      console.error("Element 'stories-list' not found!");
      return;
    }
    storiesList.innerHTML = generateStoriesListEmptyTemplate();
  }

  populateStoriesListError(message) {
    const storiesList = document.getElementById('stories-list');
    if (!storiesList) {
      console.error("Element 'stories-list' not found!");
      return;
    }
    storiesList.innerHTML = generateStoriesListErrorTemplate(message);
  }

  showLoading() {
    const storiesListLoadingContainer = document.getElementById('stories-list-loading-container');
    if (!storiesListLoadingContainer) {
      console.error("Element 'stories-list-loading-container' not found!");
      return;
    }
    storiesListLoadingContainer.innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    const storiesListLoadingContainer = document.getElementById('stories-list-loading-container');
    if (!storiesListLoadingContainer) {
      console.error("Element 'stories-list-loading-container' not found!");
      return;
    }
    storiesListLoadingContainer.innerHTML = '';
  }

  showOfflineIndicator() {
    const indicator = document.getElementById('offline-indicator');
    if (!indicator) return;

    indicator.innerHTML = `
      <div class="offline-indicator">
        <i class="fas fa-wifi wifi-slash"></i>
        <span>Anda sedang offline. Menampilkan cerita yang tersimpan.</span>
        <button class="offline-indicator__retry">Coba Lagi</button>
      </div>
    `;

    const retryButton = indicator.querySelector('.offline-indicator__retry');
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }

  hideOfflineIndicator() {
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
      indicator.innerHTML = '';
    }
  }
}