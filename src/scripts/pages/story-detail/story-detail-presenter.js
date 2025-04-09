import { storyMapper } from '../../data/api-mapper';
import IndexedDBManager from '../../utils/indexed-db-manager';

export default class StoryDetailPresenter {
  #storyId;
  #view;
  #apiModel;

  constructor(storyId, { view, apiModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async showStoryDetailMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showStoryDetailMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async showStoryDetail() {
    this.#view.showStoryDetailLoading();
    try {
      const response = await this.#apiModel.getStoryById(this.#storyId);

      if (!response.ok) {
        console.error('showStoryDetailAndMap: response:', response);
        this.#view.populateStoryDetailError(response.message);
        return;
      }
      const story = await storyMapper(response.story);
      this.#view.populateStoryDetailAndInitialMap(response.message, story);
    } catch (error) {
      console.error('showStoryDetailAndMap: error:', error);
      this.#view.populateStoryDetailError(error.message);
    } finally {
      this.#view.hideStoryDetailLoading();
    }
  }

  async showToggleSaveButton() {
    const isFavorited = await this.checkIsFavorited();  
    if (isFavorited) {
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  }

  async handleSaveStory() {
    try {
      const result = await this.#apiModel.saveStory(this.#storyId);
      if (result.ok) {
        this.#view.showNotification('Story berhasil disimpan!', 'success');
        await this.showToggleSaveButton(); // Refresh button state
      } else {
        throw new Error(result.message || 'Gagal menyimpan story');
      }
    } catch (error) {
      console.error('Error saving story:', error);
      this.#view.showNotification('Gagal menyimpan story: ' + error.message, 'error');
    }
  }

  async handleRemoveStory() {
    try {
      const result = await this.#apiModel.removeStory(this.#storyId);
      if (result.ok) {
        this.#view.showNotification('Story berhasil dihapus dari bookmark!', 'success');
        await this.showToggleSaveButton(); // Refresh button state
      } else {
        throw new Error(result.message || 'Gagal menghapus story');
      }
    } catch (error) {
      console.error('Error removing story:', error);
      this.#view.showNotification('Gagal menghapus story: ' + error.message, 'error');
    }
  }

  async checkIsFavorited() {
    const savedStories = await IndexedDBManager.isFavorite(this.#storyId);
    return savedStories;
  }
}