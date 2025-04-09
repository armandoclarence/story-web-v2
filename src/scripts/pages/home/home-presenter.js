import FavoriteManager from '../../utils/favorite-manager';

export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async loadStories({ page, size }) {
    try {
      this.#view.showLoading();

      const response = await this.#model.getStories({ page, size });
      
      if (!response.ok) {
        throw new Error(response.error || 'Failed to load stories');
      }

      // Show offline indicator if data is from cache
      await this.#view.populateStoriesList(
        '',
        response.listStory,
        response.isFromCache
      );

    } catch (error) {
      this.#view.populateStoriesListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }

  async toggleFavorite(storyId) {
    try {
      const isFavorited = await FavoriteManager.isFavorite(storyId);
      if (isFavorited) {
        await FavoriteManager.removeFavorite(storyId);
      } else {
        const story = await this.#model.getStoryById(storyId);
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