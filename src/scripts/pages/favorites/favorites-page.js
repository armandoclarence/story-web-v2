import { storyMapper } from '../../data/api-mapper';
import { generateStoryItemTemplate } from '../../templates';
import FavoritesPresenter from './favorites-presenter';
import * as StoryAPI from '../../data/api';
import FavoriteManager from '../../utils/favorite-manager';
export default class FavoritesPage {
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
    document.addEventListener('favorites-updated', async () => {
      await this.#presenter.loadFavorites();
    });

    await this.#presenter.loadFavorites();
    this.#initializeFavorites();
  }

  async showFavorites(favorites, showPagination) {
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
      // Only show first 10 items
      const displayedFavorites = favorites.slice(0, this.#pageSize);

      const templates = await Promise.all(displayedFavorites.map(async story => {
        const storyMapped = await storyMapper(story);
        return generateStoryItemTemplate({
          ...storyMapped,
          isFavorited: true,
        });
      }));

      if (favoritesList) {
        favoritesList.innerHTML = templates.join('');
        // Add animation effect
        setTimeout(() => {
          const storyItems = favoritesList.querySelectorAll('.story-item');
          storyItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }, 50);
      }
      
      // Show pagination only if there are more than 10 items
      if (paginationContainer) {
        if (showPagination) {
          paginationContainer.innerHTML = `
            <div class="pagination">
              <button class="load-more-button">
                <span>Muat Lebih Banyak</span>
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
          `;
          this.#initializeLoadMore(favorites);
        } else {
          paginationContainer.innerHTML = '';
        }
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

  #initializeLoadMore(allFavorites) {
    const loadMoreButton = document.querySelector('.load-more-button');
    if (!loadMoreButton) return;

    let isLoading = false; // Track loading state

    loadMoreButton.addEventListener('click', async () => {
      // Prevent multiple clicks while loading
      if (isLoading) return;

      try {
        isLoading = true;
        // Add loading state
        loadMoreButton.classList.add('loading');
        loadMoreButton.disabled = true; // Disable button while loading
        const buttonText = loadMoreButton.querySelector('span');
        buttonText.textContent = 'Memuat...';

        const currentItems = document.querySelectorAll('.story-item').length;
        const nextItems = allFavorites.slice(currentItems, currentItems + this.#pageSize);
        
        if (nextItems.length > 0) {
          // Add artificial delay to prevent too rapid loading
          await new Promise(resolve => setTimeout(resolve, 500));

          const templates = await Promise.all(nextItems.map(async story => {
            const storyMapped = await storyMapper(story);
            return generateStoryItemTemplate({
              ...storyMapped,
              isFavorited: true,
            });
          }));

          const favoritesList = document.getElementById('favorites-list');
          const tempContainer = document.createElement('div');
          tempContainer.innerHTML = templates.join('');
          
          // Add new items with animation
          Array.from(tempContainer.children).forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            favoritesList.appendChild(item);
            
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 100);
          });

          // Hide load more button if no more items
          if (currentItems + nextItems.length >= allFavorites.length) {
            loadMoreButton.style.display = 'none';
          }
        }
      } catch (error) {
        console.error('Error loading more items:', error);
      } finally {
        // Reset loading state
        isLoading = false;
        loadMoreButton.classList.remove('loading');
        loadMoreButton.disabled = false;
        const buttonText = loadMoreButton.querySelector('span');
        buttonText.textContent = 'Muat Lebih Banyak';
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
          const removed = await this.#presenter.toggleFavorite(storyId);
          if (removed) {
            const storyItem = favoriteButton.closest('.story-item');
            if (storyItem) {
              storyItem.classList.add('removing');
              await new Promise(resolve => {
                storyItem.addEventListener('transitionend', () => {
                  storyItem.remove();
                  resolve();
                }, { once: true });
              });

              // Check if there are any stories left
              const remainingStories = storiesList.querySelectorAll('.story-item');
              if (remainingStories.length === 0) {
                storiesList.innerHTML = '<p>Belum ada cerita favorit.</p>';
                const paginationContainer = document.getElementById('pagination-container');
                if (paginationContainer) {
                  paginationContainer.innerHTML = '';
                }
              }
              // Reload favorites to update the list and pagination
              await this.#presenter.loadFavorites();
            }
          }
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Gagal menghapus cerita dari favorit.');
      }
    });
  }
}