export const generateNewStoryFormTemplate = (guest, geoLocation) => `
  <section>
    <div class="new-story__header">
      <div class="container">
        <h1 class="new-story__header__title">Buat Cerita Baru ${guest ? '(Guest)' : ''}</h1>
        <p class="new-story__header__description">
          Silakan lengkapi formulir di bawah untuk membuat cerita baru.<br>
          Pastikan cerita yang dibuat adalah valid.
        </p>
      </div>
    </div>
  </section>

  <section class="container">
    <div class="new-form__container">
      <form id="new-form" class="new-form">
        <div class="form-control">
          <label for="description-input" class="new-form__description__title">Keterangan</label>

          <div class="new-form__description__container">
            <textarea
              id="description-input"
              name="description"
              placeholder="Masukkan keterangan lengkap cerita. Anda dapat menjelaskan apa kejadiannya, dimana, kapan, dll."
            ></textarea>
          </div>
        </div>
        <div class="form-control">
          <label for="photo-input" class="new-form__photo__title">Foto Cerita</label>
          <div class="new-form__photo__container">
            <div class="new-form__photo__buttons">
              <button id="photo-input-button" class="btn btn-outline" type="button">
                Ambil Gambar
              </button>
              <input
                id="photo-input"
                name="photo"
                type="file"
                accept="image/*"
                hidden="hidden"
                aria-multiline="true"
                aria-describedby="photo-more-info"
              >
              <button id="open-photo-camera-button" class="btn btn-outline" type="button">
                Buka Kamera
              </button>
            </div>
            <div id="camera-container" class="new-form__camera__container">
              <video id="camera-video" class="new-form__camera__video">
                Video stream not available.
              </video>
              <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>

              <div class="new-form__camera__tools">
                <select id="camera-select"></select>
                <div class="new-form__camera__tools_buttons">
                  <button id="camera-take-button" class="btn" type="button">
                    Ambil Gambar
                  </button>
                </div>
              </div>
            </div>
            <ul id="photo-taken-list" class="new-form__photo__outputs"></ul>
          </div>
        </div>
        <div class="form-control">
          <div class="new-form__location__title">Lokasi</div>
          ${
            !geoLocation ? (
              `
                <div class="new-form__location__container">
                  <div id="status">Not Granted</div>
                  <button class="btn btn-outline" id="map-req" type="button">Request Permission</button>
                </div>
              `
            ) : ''
          }
          <div class="new-form__location__container" data-map="${geoLocation ? 'true' : 'false'}">
            <div class="new-form__location__map__container">
              <div id="map" class="new-form__location__map"></div>
              <div id="map-loading-container"></div>
            </div>
            <div class="new-form__location__lat-lng">
              <input type="number" name="latitude" value="-6.175389" disabled>
              <input type="number" name="longitude" value="106.827139" disabled>
            </div>
          </div>
        </div>
        <div class="form-buttons">
          <span id="submit-button-container">
            <button class="btn" type="submit">Buat Cerita</button>
          </span>
          <a class="btn btn-outline" href="#/">Batal</a>
        </div>
      </form>
    </div>
  </section>
`;

export const generatePhotoOutputTemplate = (photoUrl, id) => `
  <li class="new-form__photo__outputs-item" data-photo-id="${id}">
    <img src="${photoUrl}" alt="Preview ${id}" loading="lazy">
    <button
      class="new-form__photo__outputs-item__delete-btn"
      data-index="${id}"
      type="button"
      aria-label="Remove photo"
    >
      <i class="fas fa-times"></i>
    </button>
  </li>
`;