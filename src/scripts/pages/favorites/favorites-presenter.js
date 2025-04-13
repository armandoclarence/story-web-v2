import FavoriteManager from '../../utils/favorite-manager';

export default class FavoritesPresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
  }

  async loadFavorites() {
    try {
      const favorites = await FavoriteManager.getAllFavorites();
      const showPagination = favorites.length > 10;
      await this.view.showFavorites(favorites, showPagination);
    } catch (error) {
      console.error('Error loading favorites:', error);
      throw error;
    }
  }

  async toggleFavorite(storyId) {
    try {
      const isFavorited = await FavoriteManager.isFavorite(storyId);
      if (isFavorited) {
        await FavoriteManager.removeFavorite(storyId);
        // Also remove from cache
        const cache = await caches.open('api-cache-v1');
        await cache.delete(`/stories/${storyId}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }
}