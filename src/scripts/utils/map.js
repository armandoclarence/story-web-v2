import { Icon, icon, map, marker, popup, tileLayer, latLng } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import CONFIG from '../config'; 

export default class Map {
  #zoom = 5;
  #map = null;

  static async getPlaceNameByCoordinate(latitude, longitude) {
    if (
      latitude == null || longitude == null ||
      isNaN(latitude) || isNaN(longitude)
    ) {
      console.warn('getPlaceNameByCoordinate: Invalid coordinates.');
      return 'Unknown location';
    }
  
    try {
      const url = new URL(`https://api.maptiler.com/geocoding/${longitude},${latitude}.json`);
      url.searchParams.set('key', CONFIG.MAP_SERVICE_API_KEY);
      url.searchParams.set('language', 'id');
      url.searchParams.set('limit', '1');
  
      const response = await fetch(url);
      const json = await response.json();
      const place = json.features[0]?.place_name;
      return place;
    } catch (error) {
      console.error('getPlaceNameByCoordinate: error:', error);
      return `${latitude}, ${longitude}`;
    }
  }

  static isGeolocationAvailable() {
    return 'geolocation' in navigator;
  }

  static async checkGeolocationPermission() {
    if(!navigator.permissions) return null;

    const status = await navigator.permissions.query({
      name: 'geolocation'
    })
    return status.state;
  }

  static async isPermissionsGeolocationGranted() {
    if(!navigator.permissions) return null;

    const status = await Map.checkGeolocationPermission();
    return status === "granted";
  }

  static getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  static async tryGetLocation() {
    const permission = await Map.checkGeolocationPermission();

    console.log(permission);
    if(permission === 'denied') {
      alert("Location permission is denied. Please enable it in your browser settings");
      return;
    }

    try {
      const position = await Map.getCurrentPosition();
      console.log(`Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`);
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    } catch (error) {
      console.error("Error getting location: ", error.message);
    }
  }

  /**
   * Reference of using Map static method:
   * https://stackoverflow.com/questions/43431550/how-can-i-invoke-asynchronous-code-within-a-constructor
   * */
  static async build(selector, options = {}, detail = false) {
    console.log(selector);
    if ('center' in options && options.center) {
      return new Map(selector, options);
    }
    
    let newOptions = {
      ...options
    };
    if(!detail) {
      const position = await Map.tryGetLocation();
      console.log(position);
      if(!position) return;
      const coordinate = [position.lat, position.lng];
      newOptions = {
        ...newOptions,
        center: coordinate
      }
    }

    return new Map(selector, newOptions);
  }

  constructor(selector, options = {}) {
    if(!document.querySelector(selector)) return;

    this.#zoom = options.zoom ?? this.#zoom;

    const tileOsm = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    });

    this.#map = map(document.querySelector(selector), {
      zoom: this.#zoom,
      scrollWheelZoom: false,
      layers: [tileOsm],
      ...options,
    });
  }

  changeCamera(coordinate, zoomLevel = null) {
    console.log(this.#map);
    if (!zoomLevel) {
      this.#map.setView(latLng(coordinate), this.#zoom);
      return;
    }
    this.#map.setView(latLng(coordinate), zoomLevel);
  }

  getCenter() {
    const position = this.#map.getCenter();
    console.log(position);
    return {
      latitude: position?.lat,
      longitude: position?.lng,
    };
  }

  createIcon(options = {}) {
    return icon({
      ...Icon.Default.prototype.options,
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      ...options,
    });
  }

  addMarker(coordinates, markerOptions = {}, popupOptions = null) {
    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      coordinates[0] == null ||
      coordinates[1] == null ||
      isNaN(coordinates[0]) ||
      isNaN(coordinates[1])
    ) {
      console.warn('addMarker: Invalid coordinates, skipping marker.');
      return null;
    }
  
    if (typeof markerOptions !== 'object') {
      throw new Error('markerOptions must be an object');
    }
  
    const newMarker = marker(coordinates, {
      icon: this.createIcon(),
      ...markerOptions,
    });
  
    if (popupOptions) {
      if (typeof popupOptions !== 'object') {
        throw new Error('popupOptions must be an object');
      }
      if (!('content' in popupOptions)) {
        throw new Error('popupOptions must include `content` property.');
      }
  
      const newPopup = popup(coordinates, popupOptions);
      newMarker.bindPopup(newPopup);
    }
  
    newMarker.addTo(this.#map);
    return newMarker;
  }

  addMapEventListener(eventName, callback) {
    this.#map.addEventListener(eventName, callback);
  }
}