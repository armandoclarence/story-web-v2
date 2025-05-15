import IndexedDBManager from "../../utils/indexed-db-manager";

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
      
      console.log(response);
      if (response?.data?.error || !response?.ok) {
        throw new Error(response?.data?.error || 'Failed to load stories');
      }

      // Show offline indicator if data is from cache
      await this.#view.populateStoriesList(
        '',
        response.data.listStory,
        response.isFromCache
      );

    } catch (error) {
      this.#view.populateStoriesListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}