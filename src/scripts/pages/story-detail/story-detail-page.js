import {
  generateLoaderAbsoluteTemplate,
  generateStoryDetailErrorTemplate,
  generateStoryDetailTemplate,
  generateNotificationTemplate,
  generateFavoriteButtonTemplate,
} from '../../templates';
import { createCarousel } from '../../utils';
import StoryDetailPresenter from './story-detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
import Map from '../../utils/map';
import * as StoryAPI from '../../data/api';
import { storyMapper } from '../../data/api-mapper';

export default class StoryDetailPage {
  #presenter = null;
  #map = null;
  async render() {
    return `
      <section>
        <div class="story-detail__container">
          <div id="story-detail" class="story-detail"></div>
          <div id="story-detail-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoryDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: StoryAPI,
    });

    this.#presenter.showStoryDetail();
  }
  
  async populateStoryDetailAndInitialMap(message, story) {
    const storyMapped = await storyMapper(story);
    
    if(document.getElementById('story-detail')){
      document.getElementById('story-detail').innerHTML = generateStoryDetailTemplate({
        ...storyMapped,
      });
    }

    createCarousel(document.getElementById('images'));

    await this.#presenter.showStoryDetailMap();
    if (this.#map && storyMapped.lat && storyMapped.lon) {
      const storyCoordinate = [storyMapped.lat, storyMapped.lon];
      const markerOptions = { alt: storyMapped.description };
      const popupOptions = { content: storyMapped.description };
      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    }
    const isFavorited = await this.#presenter.checkIsFavorited();
    if(isFavorited){
      this.renderRemoveButton();
    }else {
      this.renderSaveButton();
    }
  }

  populateStoryDetailError(message) {
    document.getElementById('story-detail').innerHTML = generateStoryDetailErrorTemplate(message);
  }

  async initialMap() {
    if(document.getElementById('map')){
      this.#map = await Map.build('#map', {
        zoom: 15,
      });
    }
  }

  renderSaveButton() {
    document.getElementById('save-actions-container').innerHTML =
      generateFavoriteButtonTemplate(false);

    document.getElementById('story-detail-favorite').addEventListener('click', async () => {
      await this.#presenter.handleSaveStory();
    });
  }

  renderRemoveButton() {
    document.getElementById('save-actions-container').innerHTML =
      generateFavoriteButtonTemplate(true);

    document.getElementById('story-detail-favorite').addEventListener('click', async () => {
      await this.#presenter.handleRemoveStory();
    });
  }

  showStoryDetailLoading() {
    document.getElementById('story-detail-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideStoryDetailLoading() {
    document.getElementById('story-detail-loading-container').innerHTML = '';
  }

  showMapLoading() {
    if(document.getElementById('map-loading-container')){
      document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
    }
  }

  hideMapLoading() {
    if(document.getElementById('map-loading-container')){
      document.getElementById('map-loading-container').innerHTML = '';
    }
  }

  showSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Tanggapi
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('submit-button-container').innerHTML = `
      <button class="btn" type="submit">Tanggapi</button>
    `;
  }

  showAlert(message) {
    this.showNotification(message);
  }

  showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'notification-container';
      document.body.appendChild(notificationContainer);
    }

    // Add new notification
    notificationContainer.innerHTML = generateNotificationTemplate(message, type);

    // Add close button functionality
    const closeButton = notificationContainer.querySelector('.notification__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        notificationContainer.innerHTML = '';
      });
    }

    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (notificationContainer) {
        notificationContainer.innerHTML = '';
      }
    }, 3000);
  }
}
