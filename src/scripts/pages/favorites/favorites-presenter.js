import FavoriteManager from '../../utils/favorite-manager';

export default class FavoritesPresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
  }

  async loadFavorites() {
    try {
      const favorites = await FavoriteManager.getAllFavorites();
      console.log(favorites);
      const showPagination = favorites.length > 10;
      await this.view.showFavorites(favorites, showPagination);
    } catch (error) {
      console.error('Error loading favorites:', error);
      throw error;
    }
  }
}