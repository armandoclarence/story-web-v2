import { showFormattedDate } from '../utils';

export function generateStoriesListEmptyTemplate() {
  return `
    <div id="stories-list-empty" class="stories-list__empty">
      <h2>Tidak ada story yang tersedia</h2>
      <p>Saat ini, tidak ada story yang dapat ditampilkan.</p>
    </div>
  `;
}

export function generateStoriesListErrorTemplate(message) {
  return `
    <div id="stories-list-error" class="stories-list__error">
      <h2>Terjadi kesalahan pengambilan daftar story</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `;
}

export function generateStoryDetailErrorTemplate(message) {
  return `
    <div id="stories-detail-error" class="stories-detail__error">
      <h2>Terjadi kesalahan pengambilan detail story</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `;
}

export const generateStoryItemTemplate = ({
  id,
  description,
  photoUrl,
  createdAt,
  name,
  placeName,
  isFavorited,
  isOffline = false,
}) => `
  <article class="story-item ${isOffline ? 'offline' : ''}" id="story-${id}">
    <div class="story-item__image-container">
      <img class="story-item__image" src="${photoUrl}" alt="${description}" loading="lazy">
      ${
        placeName
          ? `<div class="story-item__location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${placeName}</span>
            </div>`
          : ''
      }
    </div>
    <div class="story-item__content">
      <div class="story-item__header">
        <span class="story-item__title">${name}</span>
        <span class="story-item__date">${showFormattedDate(createdAt)}</span>
      </div>
      <p class="story-item__description">${description}</p>
      <div class="story-item__actions">
        <a href="#/stories/${id}" class="story-item__read-more">
          <span>Baca Selengkapnya</span>
          <i class="fas fa-arrow-right"></i>
        </a>
        <button 
          class="story-item__favorite ${isFavorited ? 'active' : ''}" 
          data-story-id="${id}" 
          aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}"
        >
          <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
    </div>
  </article>
`;

export function generateStoryItemImageTemplate(imageUrl = null, alt = '') {
  if (!imageUrl) {
    return `
      <img class="story-item__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
    `;
  }

  return `
    <img class="story-item__image" src="${imageUrl}" alt="${alt}">
  `;
}

export function generateStoryDetailTemplate(story) {
  return `
    <div class="story-detail__header">
      <h1 class="story-detail__description">${story.description}</h1>
      <div class="story-detail__more-info">
        <div class="story-detail__more-info__inline">
          <span class="story-detail__createdat">
            <i class="fas fa-calendar"></i>
            ${showFormattedDate(story.createdAt)}
          </span>
          ${
            story.location
              ? `<span class="story-detail__location__place-name">
                  <i class="fas fa-map-marker-alt"></i>
                  ${story.location}
                </span>`
              : ''
          }
        </div>
        <span class="story-detail__author">
          <i class="fas fa-user"></i>
          ${story.name}
        </span>
      </div>
    </div>

    <div class="story-detail__images__container">
      <div class="story-detail__images" id="images">
        <div class="story-detail__image-wrapper">
          <img src="${Array.isArray(story.photoUrl) ? story.photoUrl[0] : story.photoUrl}" alt="${story.description}" loading="lazy">
        </div>
      </div>
    </div>

    <div class="story-detail__body">
      <div class="story-detail__body__description__container">
        <h2 class="story-detail__description__title">Deskripsi</h2>
        <p class="story-detail__description__body">${story.description}</p>
      </div>

      ${
        story.lat && story.lon
          ? `
        <div class="story-detail__body__map__container">
          <h2 class="story-detail__map__title">Lokasi</h2>
          <div class="story-detail__map__wrapper">
            <div id="map" class="story-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
          <div class="story-detail__location__coordinate">
            <span class="story-detail__location__latitude">
              <i class="fas fa-map-marker-alt"></i>
              Latitude: ${story.lat}
            </span>
            <span class="story-detail__location__longitude">
              <i class="fas fa-map-marker-alt"></i>
              Longitude: ${story.lon}
            </span>
          </div>
        </div>
      `
          : ''
      }
    </div>

    <div class="story-detail__body__actions__container">
      <h2>Aksi</h2>
      <div class="story-detail__actions__buttons">
        <div id="save-actions-container"></div>
      </div>
    </div>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}

export function generateSaveStoryButtonTemplate() {
  return `
    <button id="story-detail-save" class="btn btn-transparent">
      Simpan cerita <i class="far fa-bookmark"></i>
    </button>
  `;
}

export function generateRemoveStoryButtonTemplate() {
  return `
    <button id="story-detail-remove" class="btn btn-transparent">
      Hapus cerita <i class="fas fa-bookmark"></i>
    </button>
  `;
}

export function generateCarouselTemplate(images, description) {
  return `
    <div class="carousel">
      <div class="carousel__container">
        ${images
          .map(
            (image, index) => `
          <div class="carousel__slide ${index === 0 ? 'active' : ''}">
            <img src="${image}" alt="${description}" loading="lazy">
          </div>
        `
          )
          .join('')}
      </div>
      <button class="carousel__button carousel__button--prev" aria-label="Previous image">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel__button carousel__button--next" aria-label="Next image">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `;
}

export const generateFavoriteButtonTemplate = (isFavorited = false) => `
  <button 
    id="story-detail-favorite" 
    class="story-detail__favorite ${isFavorited ? 'active' : ''}"
    aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}"
  >
    <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
    <span>${isFavorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}</span>
  </button>
`;