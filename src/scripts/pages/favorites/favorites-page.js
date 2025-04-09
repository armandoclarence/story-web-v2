import { storyMapper } from '../../data/api-mapper';
import { generateStoryItemTemplate, generatePaginationTemplate } from '../../templates';
import FavoritesPresenter from './favorites-presenter';
import * as StoryAPI from '../../data/api';
import FavoriteManager from '../../utils/favorite-manager';

export default class FavoritesPage {
  #currentPage = 1;
  #pageSize = 10;
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1 class="section-title">Cerita Favorit</h1>
        <div id="favorites-list" class="stories-list"></div>
        <div id="pagination-container"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new FavoritesPresenter({
      view: this,
      model: StoryAPI,
    });

    await FavoriteManager.init(StoryAPI);

    // Add listener for favorites updates
    document.addEventListener('favorites-updated', async (event) => {
      await this.showFavorites(event.detail);
    });

    await this.#presenter.loadFavorites({
      page: this.#currentPage,
      size: this.#pageSize
    });
    this.#initializePagination();
    this.#initializeFavorites();
  }

  #initializePagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;

    paginationContainer.addEventListener('click', async (event) => {
      if (event.target.closest('#prev-page')) {
        if (this.#currentPage > 1) {
          this.#currentPage--;
          await this.#presenter.loadFavorites({
            page: this.#currentPage,
            size: this.#pageSize,
          });
        }
      } else if (event.target.closest('#next-page')) {
        this.#currentPage++;
        await this.#presenter.loadFavorites({
          page: this.#currentPage,
          size: this.#pageSize,
        });
      }
    });
  }

  #initializeFavorites() {
    const storiesList = document.getElementById('favorites-list');
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
          const storyItem = favoriteButton.closest('.story-item');
          if (storyItem) {
            // Add removing class to trigger animation
            storyItem.classList.add('removing');
            
            // Wait for the animation to complete before removing the element
            await new Promise(resolve => {
              storyItem.addEventListener('transitionend', () => {
                storyItem.remove();
                resolve();
              }, { once: true });
            });
          }
          
          // Check if there are any stories left
          const remainingStories = storiesList.querySelectorAll('.story-item');
          if (remainingStories.length === 0) {
            // Add a small delay before showing the empty state
            setTimeout(() => {
              storiesList.innerHTML = '<p>Belum ada cerita favorit.</p>';
              const paginationContainer = document.getElementById('pagination-container');
              if (paginationContainer) {
                paginationContainer.innerHTML = '';
              }
            }, 300); // Match the transition duration
          }
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Gagal menghapus cerita dari favorit.');
      }
    });
  }

  async showFavorites(favorites) {
    const favoritesList = document.getElementById('favorites-list');
    const paginationContainer = document.getElementById('pagination-container');

    if (!favorites || favorites.length === 0) {
      if (favoritesList) {
        favoritesList.innerHTML = '<p>Belum ada cerita favorit.</p>';
      }
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
      }
      return;
    }

    try {
      const templates = await Promise.all(favorites.map(async story => {
        const storyMapped = await storyMapper(story);
        const isFavorited = await FavoriteManager.isFavorite(story.id);
        return generateStoryItemTemplate({
          ...storyMapped,
          isFavorited,
        });
      }));

      if (favoritesList) {
        favoritesList.innerHTML = templates.join('');
        // Add a small delay to ensure the DOM is updated before adding the fade-in effect
        setTimeout(() => {
          const storyItems = favoritesList.querySelectorAll('.story-item');
          storyItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 100); // Stagger the animations
          });
        }, 50);
      }
      
      if (paginationContainer) {
        const isLastPage = favorites.length < this.#pageSize;
        paginationContainer.innerHTML = generatePaginationTemplate(this.#currentPage, isLastPage);
      }
    } catch (error) {
      console.error('Error showing favorites:', error);
      if (favoritesList) {
        favoritesList.innerHTML = '<p>Terjadi kesalahan saat memuat cerita favorit.</p>';
      }
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
      }
    }
  }
}