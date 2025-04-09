import IndexedDBManager from './indexed-db-manager';

export default class FavoriteManager {
  static #apiModel = null;
  static #initialized = false;

  static async init(apiModel) {
    if (this.#initialized) {
      return;
    }

    try {
      this.#apiModel = apiModel;
      this.#initializeEventListeners();
      this.#setupSyncListener();
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

  static async refreshFavorites() {
    try {
      const favorites = await this.getAllFavorites();
      console.log('Refreshed favorites:', favorites);

      const favoritesList = document.getElementById('favorites-list');
      if (favoritesList) {
        // Trigger a re-render of the favorites list
        const event = new CustomEvent('favorites-updated', { detail: favorites });
        document.dispatchEvent(event);
      } else {
        console.warn('favorites-list element not found in the DOM.');
      }
    } catch (error) {
      console.error('Error refreshing favorites:', error);
      // Optionally, you can dispatch an error event or show a user-friendly message
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
            // Remove from UI
            favoriteButton.classList.remove('active');
            const icon = favoriteButton.querySelector('i');
            icon.classList.remove('fas');
            icon.classList.add('far');
            favoriteButton.setAttribute('aria-label', 'Add to favorites');
          } else {
            const story = await this.#getStoryById(storyId);
            if (story) {
              await this.addFavorite(story);
              // Update UI
              favoriteButton.classList.add('active');
              const icon = favoriteButton.querySelector('i');
              icon.classList.remove('far');
              icon.classList.add('fas');
              favoriteButton.setAttribute('aria-label', 'Remove from favorites');
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
      await IndexedDBManager.addFavorite(story);
      console.log('Story added to favorites:', story.id);
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
      await IndexedDBManager.removeFavorite(storyId);
      console.log('Story removed from favorites:', storyId);
    } catch (error) {
      console.error('Error removing favorite:', error);P
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
      return await IndexedDBManager.getAllFavorites();
    } catch (error) {
      console.error('Error getting all favorites:', error);
      return [];
    }
  }

  static async toggleFavorite(storyId) {
    if (!this.#initialized) {
      throw new Error('FavoriteManager not initialized');
    }
    try {
      const isFavorited = await this.isFavorite(storyId);
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
} 