import { queuePost } from "../../data/db";
import IndexedDBManager from "../../utils/indexed-db-manager";

export default class NewPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showNewFormMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }
  
  async postNewStory(data) {
    this.#view.showSubmitLoadingButton();
    if (!navigator.onLine) {
      try {
        await queuePost(await IndexedDBManager.init(), {
          type: 'new',
          description: data?.description,
          photo: data?.photo,
          lat: data?.lat,
          lon: data?.lon,
        });
        this.#view.storeSuccessfully(
          'Anda sedang offline. Cerita akan dikirim saat online kembali.',
          data
        );
      } catch (error) {
        console.error('Failed to queue post offline:', error);
        this.#view.storeFailed('Gagal menyimpan cerita secara offline.');
      } finally {
        this.#view.hideSubmitLoadingButton();
      }
      return;
    }

    try {
      const response = await this.#model.storeNewStory(data);
      if (!response.ok) {
        console.error('postNewStory: response:', response);
        this.#view.storeFailed(response.message);
        return;
      }
      this.#view.storeSuccessfully(response.message, response.data);
    } catch (error) {
      console.error('postNewStory: error:', error);
      this.#view.storeFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}