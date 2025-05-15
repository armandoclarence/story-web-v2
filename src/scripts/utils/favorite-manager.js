import { generateFavoriteHeart, generateFavoriteText } from '../templates';
import IndexedDBManager from './indexed-db-manager';
import NotificationManager from './notification-manager';

export default class FavoriteManager {
  static #apiModel = null;
  static #initialized = false;
  static #db = false;

  static async init(apiModel) {
    if (this.#initialized) return;

    try {
      this.#apiModel = apiModel;
      this.#db = await IndexedDBManager.init();
      this.#setupSyncListener();
      this.#initializeEventListeners();
      this.#initialized = true;
      console.log('FavoriteManager initialized successfully');
    } catch (error) {
      console.error('Error initializing FavoriteManager:', error);
      throw error;
    }
  }

  static #initializeEventListeners() {
    this.toggleFavoriteDetail();
    this.toggleFavoriteItem();
  }
  
  static #setupSyncListener() {
    const bc = new BroadcastChannel('favorites-sync');
    bc.onmessage = async (event) => {
      const change = event.data;
      if (change.type === 'remove' || change.type === 'add' || change.type === 'update') {
        await this.refreshFavorites(change.storyId);
      }
    };
  }

  static async refreshFavorites(storyId = null) {
    try {
      const favorites = await this.getAllFavorites();
      console.log('Refreshed favorites:', favorites);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      // Update specific story if provided
      if (storyId) {
        const isFavorited = await this.isFavorite(storyId);
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

  static toggleFavoriteDetail() {
    document.addEventListener('click', async (event) => {
      const favoriteDetail = event.target.closest('.story-detail__favorite');
      if(!favoriteDetail) return;
      try {
        if (!this.#initialized) {
          throw new Error('FavoriteManager not initialized');
        }
        const text = (updatedIsFavorited) => generateFavoriteHeart(updatedIsFavorited) + generateFavoriteText(updatedIsFavorited);
        await this.toggleHandleFavorite(favoriteDetail, text);
      } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Gagal mengubah status favorit.');
      }
    });
  }

  static toggleFavoriteItem() {
    document.addEventListener('click', async (event) => {
      const favoriteItem = event.target.closest('.story-item__favorite');
      if(!favoriteItem) return;
      try {
        if (!this.#initialized) {
          throw new Error('FavoriteManager not initialized');
        }
        const text = (updatedIsFavorited) => generateFavoriteHeart(updatedIsFavorited);
        await this.toggleHandleFavorite(favoriteItem, text);
      } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Gagal mengubah status favorit.');
      }
    });
  }

  static async toggleHandleFavorite(button, text) {
    // Use data-favorited attribute to track state
    const currentFavoritedAttr = button.dataset.favorited;
    const storyId = button.dataset.storyId;
    const currentIsFavorited = currentFavoritedAttr === 'true';

    const updatedIsFavorited = !currentIsFavorited;

    // Prevent toggling if state is already as desired (no change)
    if (currentIsFavorited === updatedIsFavorited) {
      console.log('No change in favorite state; skipping.');
      return;
    }

    // Update dataset immediately to reflect the new state
    button.dataset.favorited = updatedIsFavorited.toString();

    // Update UI
    const innerHTML = text(updatedIsFavorited);
    button.classList.toggle('active', updatedIsFavorited);
    button.innerHTML = innerHTML;
    button.disabled = true;

    try {
      if (updatedIsFavorited) {
        await this.handleSaveStory(storyId);
      } else {
        await this.handleRemoveStory(storyId);
      }
    } catch (err) {
      console.error(err);
      // Rollback dataset and UI if something failed
      button.dataset.favorited = currentIsFavorited.toString();
      button.classList.toggle('active', currentIsFavorited);
      button.innerHTML = text(currentIsFavorited);
    } finally {
      button.disabled = false;
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

  static showNotification(message, type = 'success') {
    NotificationManager.showNotification(message, type);
  }

  static async handleSaveStory(storyId) {
    try {
      const result = await this.#apiModel.saveStory(this.#db, storyId);
      if (result.ok) {
        this.showNotification('Story berhasil disimpan!', 'success');
      } else {
        throw new Error(result.message || 'Gagal menyimpan story');
      }
    } catch (error) {
      console.error('Error saving story:', error);
      this.showNotification('Gagal menyimpan story: ' + error.message, 'error');
    }
  }

  static async handleRemoveStory(storyId) {
    try {
      console.log(storyId);
      const result = await this.#apiModel.removeStory(storyId);
      if (result.ok) {
        this.showNotification('Story berhasil dihapus dari favorite!', 'success');
      } else {
        throw new Error(result.message || 'Gagal menghapus story');
      }
    } catch (error) {
      console.error('Error removing story:', error);
      this.showNotification('Gagal menghapus story: ' + error.message, 'error');
    }
  }
} 