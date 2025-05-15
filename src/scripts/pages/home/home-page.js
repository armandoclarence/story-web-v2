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
  }

  #initializePagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;

    let isLoading = false; // Track loading state

    paginationContainer.addEventListener('click', async (event) => {
      // Prevent clicks while loading
      if (isLoading) return;

      const prevButton = event.target.closest('#prev-page');
      const nextButton = event.target.closest('#next-page');
      
      if (prevButton || nextButton) {
        try {
          isLoading = true;
          // Disable both buttons and add loading state
          const buttons = paginationContainer.querySelectorAll('button');
          buttons.forEach(button => {
            button.disabled = true;
            button.classList.add('loading');
          });

          if (prevButton && this.#currentPage > 1) {
            this.#currentPage--;
            await this.#presenter.loadStories({
              page: this.#currentPage,
              size: this.#pageSize,
            });
          } else if (nextButton) {
            this.#currentPage++;
            await this.#presenter.loadStories({
              page: this.#currentPage,
              size: this.#pageSize,
            });
          }
        } catch (error) {
          console.error('Error loading stories:', error);
        } finally {
          isLoading = false;
          // Re-enable buttons and remove loading state
          const buttons = paginationContainer.querySelectorAll('button');
          buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('loading');
          });
        }
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
      console.log(story);
      return generateStoryItemTemplate({
        ...storyMapped,
        isFavorited: story.isFavorite,
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