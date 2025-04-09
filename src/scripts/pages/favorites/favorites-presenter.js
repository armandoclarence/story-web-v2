import FavoriteManager from '../../utils/favorite-manager';

export default class FavoritesPresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
  }

  async loadFavorites(params) {
    try {
      const favorites = await FavoriteManager.getAllFavorites();
      if (!favorites || favorites.length === 0) {
        await this.view.showFavorites([]);
        return;
      }

      // Get story details for each favorite
      const stories = await Promise.all(
        favorites.map(async (favorite) => {
          try {
            const response = await this.model.getStoryById(favorite.id);
            if (response.ok) {
              return response.story;
            }
            return null;
          } catch (error) {
            console.error('Error fetching story:', error);
            return null;
          }
        })
      );

      // Filter out any null stories and paginate
      const validStories = stories.filter(story => story !== null);
      const startIndex = (params.page - 1) * params.size;
      const endIndex = startIndex + params.size;
      const paginatedStories = validStories.slice(startIndex, endIndex);
      await this.view.showFavorites(validStories);
    } catch (error) {
      console.error('Error loading favorites:', error);
      await this.view.showFavorites([]);
    }
  }

  async toggleFavorite(storyId) {
    try {
      const isFavorited = await FavoriteManager.isFavorite(storyId);
      if (isFavorited) {
        await FavoriteManager.removeFavorite(storyId);
      } else {
        const story = await this.model.getStoryById(storyId);
        if (story.ok) {
          await FavoriteManager.addFavorite(story.story);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }
}