import { queuePost } from "../../../data/db";
import IndexedDBManager from "../../../utils/indexed-db-manager";

export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getRegistered({ name, email, password }) {
    this.#view.showSubmitLoadingButton();
    if(!navigator.onLine) {
      this.#view.registeredFailed('Anda hanya bisa register saat online.');
      return;
    }
    try {
      const response = await this.#model.getRegistered({ name, email, password });

      if (!response.ok) {
        console.error('getRegistered: response:', response);
        this.#view.registeredFailed(response.message);
        return;
      }

      this.#view.registeredSuccessfully(response.message);
    } catch (error) {
      console.error('getRegistered: error:', error);
      this.#view.registeredFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
