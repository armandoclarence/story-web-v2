import NewPresenter from './new-presenter';
import { convertBase64ToBlob } from '../../utils';
import * as StoryAPI from '../../data/api';
import { 
  generateLoaderAbsoluteTemplate,
  generateNewStoryFormTemplate,
  generatePhotoOutputTemplate 
} from '../../templates';
import Camera from '../../utils/camera';
import Map from '../../utils/map';

export default class NewPage {
  #presenter;
  #form;
  #camera;
  #isCameraOpen = false;
  #takenPhoto = [];
  #map = null;

  async render() {
    return generateNewStoryFormTemplate(false, await Map.isPermissionsGeolocationGranted());
  }

  async afterRender() {
    this.#presenter = new NewPresenter({
      view: this,
      model: StoryAPI,
    });
    this.#takenPhoto = [];

    if(document.querySelector("#map-req")) {
      document.querySelector("#map-req").addEventListener('click', async () => {
        await Map.tryGetLocation();
      })
    }

    this.#presenter.showNewFormMap();
    this.#setupForm();
  }

  #setupForm() {
    this.#form = document.getElementById('new-form');
    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if(this.#form.elements.namedItem('description').value === '') {
        alert('Keterangan tidak boleh kosong');
        return;
      }

      if(this.#takenPhoto.length === 0) {
        alert('Dokumentasi tidak boleh kosong');
        return;
      }
      
      let data = {
        description: this.#form.elements.namedItem('description').value,
        photo: this.#takenPhoto[0].blob,
      };
      
      if (await Map.isPermissionsGeolocationGranted()) {
        data = {
          ...data,
          lat: this.#form.elements.namedItem('latitude').value,
          lon: this.#form.elements.namedItem('longitude').value,
        }
      }

      await this.#presenter.postNewStory(data);
    });

    document.getElementById('photo-input').addEventListener('change', async (event) => {
      const insertingPicturesPromises = Object.values(event.target.files).map(async (file) => {
        return await this.#addTakenPicture(file);
      });
      await Promise.all(insertingPicturesPromises);

      await this.#populateTakenPictures();
    });

    document.getElementById('photo-input-button').addEventListener('click', () => {
      this.#form.elements.namedItem('photo-input').click();
    });

    const cameraContainer = document.getElementById('camera-container');
    document
      .getElementById('open-photo-camera-button')
      .addEventListener('click', async (event) => {
        this.#setupCamera();
        this.#isCameraOpen = cameraContainer.classList.contains('open');
        if (this.#isCameraOpen) {
          cameraContainer.classList.remove('open');
          event.currentTarget.textContent = 'Buka Kamera';
          this.#camera.stop();
        } else {
          cameraContainer.classList.add('open');
          event.currentTarget.textContent = 'Tutup Kamera';
          await this.#camera.launch();
        }
      });
  }

  async initialMap() {
    if(!document.querySelector("#map")) return;
    this.#map = await Map.build('#map', {
      zoom: 15,
    });
    if(!this.#map) return;
    const centerCoordinate = this.#map.getCenter();
    console.log(this.#map);
    this.#map.changeCamera([centerCoordinate.latitude, centerCoordinate.longitude]);
    this.#updateLatLngInput(centerCoordinate.latitude, centerCoordinate.longitude);
    const draggableMarker = this.#map.addMarker(
      [centerCoordinate.latitude, centerCoordinate.longitude],
      { draggable: 'true' },
    );
    draggableMarker.addEventListener('move', (event) => {
      const coordinate = event.target.getLatLng();
      this.#updateLatLngInput(coordinate.lat, coordinate.lng);
    });

    this.#map.addMapEventListener('click', (event) => {
      draggableMarker.setLatLng(event.latlng);
      
      event.sourceTarget.flyTo(event.latlng);
    });
  }

  #updateLatLngInput(latitude, longitude) {
    this.#form.elements.namedItem('latitude').value = latitude;
    this.#form.elements.namedItem('longitude').value = longitude;
  }

  #setupCamera() {
    if (!this.#camera) {
      this.#camera = new Camera({
        video: document.getElementById('camera-video'),
        cameraSelect: document.getElementById('camera-select'),
        canvas: document.getElementById('camera-canvas'),
      });
    }

    this.#camera.addCheeseButtonListener('#camera-take-button', async () => {
      const image = await this.#camera.takePicture();
      await this.#addTakenPicture(image);
      await this.#populateTakenPictures();
    });
  }

  async #addTakenPicture(image) {
    let blob = image;

    if (image instanceof String) {
      blob =  convertBase64ToBlob(image, 'image/png');
    }

    const newDocumentation = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      blob: blob,
    };
    this.#takenPhoto = [...this.#takenPhoto, newDocumentation];
  }

  async #populateTakenPictures() {
    const html = this.#takenPhoto.reduce((accumulator, picture) => {
      const imageUrl = URL.createObjectURL(picture.blob);
      return accumulator + generatePhotoOutputTemplate(imageUrl, picture.id);
    }, '');
    document.getElementById('photo-taken-list').innerHTML = html;

    document.querySelectorAll('button[data-index]').forEach((button) =>
      button.addEventListener('click', (event) => {
        const pictureIndex = event.currentTarget.dataset.index;
        this.#removePicture(pictureIndex);
        this.#populateTakenPictures();
      }),
    );
  }

  #removePicture(photoId) {
    const photoIndex = this.#takenPhoto.findIndex(photo => 
      (photo.id || '').toString() === photoId.toString()
    );

    if (photoIndex !== -1) {
      const photoElement = document.querySelector(`[data-photo-id="${photoId}"]`);
      if (photoElement) {
        photoElement.style.transition = 'all 0.3s ease';
        photoElement.style.opacity = '0';
        photoElement.style.transform = 'scale(0.  8)';

        setTimeout(() => {
          this.#takenPhoto.splice(photoIndex, 1);
          document.getElementById('photo-input').value = '';
          this.#populateTakenPictures();
        }, 300);
      }
    }
  }

  storeSuccessfully(message) {
    alert(message);
    console.log(message);
    this.clearForm();

    location.hash = '/';
  }

  storeFailed(message) {
    alert(message);
    console.log(message);
  }

  clearForm() {
    this.#form.reset();
  }

  showMapLoading() {
    if(document.getElementById('map-loading-container')) {
      document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
    }
  }

  hideMapLoading() {
    if(document.getElementById('map-loading-container')) {
      document.getElementById('map-loading-container').innerHTML = '';
    }
  }

  showSubmitLoadingButton() {
    if(document.getElementById('submit-button-container')) {
      document.getElementById('submit-button-container').innerHTML = `
        <button class="btn" type="submit" disabled>
          <i class="fas fa-spinner loader-button"></i> Buat Cerita
        </button>
      `;
    }
  }

  hideSubmitLoadingButton() {
    if(document.getElementById('submit-button-container')) {
      document.getElementById('submit-button-container').innerHTML = `
        <button class="btn" type="submit">Buat Cerita</button>
      `;
    }
  }
}