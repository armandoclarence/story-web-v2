import IndexedDBManager from './indexed-db-manager';

export default class FavoriteManager {
  static #apiModel = null;
  static #initialized = false;

  static async init(apiModel) {
    if (this.#initialized) return;

    try {
      this.#apiModel = apiModel;
      await IndexedDBManager.init();
      this.#setupSyncListener();
      this.#initializeEventListeners();
      this.#initialized = true;
      console.log('FavoriteManager initialized successfully');
    } catch (error) {
      console.error('Error initializing FavoriteManager:', error);
      throw error;
    }
  }

  static #setupSyncListener() {
    const bc = new BroadcastChannel('favorites-sync');
    bc.onmessage = async (event) => {
      const change = event.data;
      if (change.type === 'remove' || change.type === 'add' || change.type === 'update') {
        await this.refreshFavorites();
        
        const buttons = document.querySelectorAll(`[data-story-id="${change.storyId}"]`);
        buttons.forEach(async (button) => {
          const isFavorited = await this.isFavorite(change.storyId);
          this.#updateButtonState(button, isFavorited);
        });
      }
    };
  }

  static async refreshFavorites(storyId = null) {
    try {
      const favorites = await this.getAllFavorites();
      console.log('Refreshed favorites:', favorites);

      // Update specific story if provided
      if (storyId) {
        const isFavorited = await this.isFavorite(storyId);
        const buttons = document.querySelectorAll(`[data-story-id="${storyId}"]`);
        buttons.forEach(button => this.#updateButtonState(button, isFavorited));
        
        // If we're on favorites page and the story was unfavorited, remove it
        if (!isFavorited) {
          const favoritesList = document.getElementById('favorites-list');
          if (favoritesList) {
            const storyItem = favoritesList.querySelector(`[data-story-id="${storyId}"]`).closest('.story-item');
            if (storyItem) {
              storyItem.classList.add('removing');
              await new Promise(resolve => {
                storyItem.addEventListener('transitionend', () => {
                  storyItem.remove();
                  resolve();
                }, { once: true });
              });

              // Check if there are any stories left
              const remainingStories = favoritesList.querySelectorAll('.story-item');
              if (remainingStories.length === 0) {
                favoritesList.innerHTML = '<p>Belum ada cerita favorit.</p>';
                const paginationContainer = document.getElementById('pagination-container');
                if (paginationContainer) {
                  paginationContainer.innerHTML = '';
                }
              }
            }
          }
        }
      } else {
        // Full refresh for favorites page
        const favoritesList = document.getElementById('favorites-list');
        if (favoritesList) {
          const event = new CustomEvent('favorites-updated', { 
            detail: {
              favorites,
              currentPage: 1, // Reset to first page on full refresh
              pageSize: 10
            }
          });
          document.dispatchEvent(event);
        }
      }
    } catch (error) {
      console.error('Error refreshing favorites:', error);
      const errorEvent = new CustomEvent('favorites-update-error', { detail: error });
      document.dispatchEvent(errorEvent);
    }
  }

  static #initializeEventListeners() {
    document.addEventListener('click', async (event) => {
      const favoriteButton = event.target.closest('.story-item__favorite, .story-detail__favorite');
      if (favoriteButton) {
        const storyId = favoriteButton.dataset.storyId;
        const isFavorited = favoriteButton.classList.contains('active');
        
        try {
          if (!this.#initialized) {
            throw new Error('FavoriteManager not initialized');
          }

          if (isFavorited) {
            await this.removeFavorite(storyId);
          } else {
            const story = await this.#getStoryById(storyId);
            if (story) {
              await this.addFavorite(story);
            }
          }
        } catch (error) {
          console.error('Error toggling favorite:', error);
          alert('Gagal mengubah status favorit.');
        }
      }
    });
  }

  static async addFavorite(story) {
    if (!this.#initialized) {
      throw new Error('FavoriteManager not initialized');
    }
    try {
      await IndexedDBManager.addToFavorites(story);
      console.log('Story added to favorites:', story.id);
      await this.refreshFavorites();
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }

  static async removeFavorite(storyId) {
    if (!this.#initialized) {
      throw new Error('FavoriteManager not initialized');
    }
    try {
      await IndexedDBManager.removeFromFavorites(storyId);
      console.log('Story removed from favorites:', storyId);
      // Only refresh this specific story
      await this.refreshFavorites(storyId);
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  static async #getStoryById(storyId) {
    if (!this.#initialized) {
      throw new Error('FavoriteManager not initialized');
    }
    try {
      const existingFavorite = await IndexedDBManager.getFavorite(storyId);
      if (existingFavorite) {
        return existingFavorite;
      }

      if (!this.#apiModel) {
        throw new Error('API model not initialized');
      }

      const response = await this.#apiModel.getStoryById(storyId);
      if (!response.ok) {
        throw new Error('Failed to fetch story');
      }
      return response.story;
    } catch (error) {
      console.error('Error fetching story:', error);
      throw error;
    }
  }

  static async isFavorite(storyId) {
    if (!this.#initialized) {
      throw new Error('FavoriteManager not initialized');
    }
    try {
      return await IndexedDBManager.isFavorite(storyId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  static async getAllFavorites() {
    if (!this.#initialized) {
      throw new Error('FavoriteManager not initialized');
    }
    try {
      const favorites = await IndexedDBManager.getAllFavorites();
      return favorites;
    } catch (error) {
      console.error('Error getting all favorites:', error);
      return [];
    }
  }

  static async toggleFavorite(story) {
    try {
      const isFavorite = await IndexedDBManager.isFavorite(story.id);
      
      if (isFavorite) {
        await IndexedDBManager.removeFromFavorites(story.id);
      } else {
        await IndexedDBManager.addToFavorites(story);
        }

      return !isFavorite;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  static #updateButtonState(button, isFavorited) {
    const icon = button.querySelector('i');
    if (isFavorited) {
      button.classList.add('active');
      icon?.classList.remove('far');
      icon?.classList.add('fas');
      button.setAttribute('aria-label', 'Remove from favorites');
    } else {
      button.classList.remove('active');
      icon?.classList.remove('fas');
      icon?.classList.add('far');
      button.setAttribute('aria-label', 'Add to favorites');
    }
  }

  static async getFavorites(userId) {
    try {
      return await IndexedDBManager.getFavorites(userId);
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }
} 