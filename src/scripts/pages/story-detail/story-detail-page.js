import {
  generateLoaderAbsoluteTemplate,
  generateStoryDetailErrorTemplate,
  generateStoryDetailTemplate,
} from '../../templates';
import { createCarousel } from '../../utils';
import StoryDetailPresenter from './story-detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
import Map from '../../utils/map';
import * as StoryAPI from '../../data/api';

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
    console.log(story);
    if(document.getElementById('story-detail')){
      document.getElementById('story-detail').innerHTML = generateStoryDetailTemplate({
        ...story,
      });
    }

    createCarousel(document.getElementById('images'));

    await this.#presenter.showStoryDetailMap();
    console.log(this.#map);
    if (this.#map && story.lat && story.lon) {
      const storyCoordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.description };
      const popupOptions = { content: story.description };
      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    }
  }

  populateStoryDetailError(message) {
    document.getElementById('story-detail').innerHTML = generateStoryDetailErrorTemplate(message);
  }

  async initialMap() {
    if(document.getElementById('map')){
      this.#map = await Map.build('#map', {
        zoom: 15,
      }, true);
    }
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
}
