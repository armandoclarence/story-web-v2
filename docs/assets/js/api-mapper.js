import{M as e}from"./map.js";async function n(a){return{...a,placeName:await e.getPlaceNameByCoordinate(a.lat,a.lon)}}export{n as s};
