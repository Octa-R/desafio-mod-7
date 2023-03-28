import { state } from "../state";

function success(pos: { coords: any; }) {
  const crd = pos.coords;
  const cs = state.getState()
  cs.currentPosition = {
    lat: crd.latitude,
    lng: crd.longitude,
    acc: crd.accuracy
  }
  state.setState(cs)
}

function error(err: { code: any; message: any; }) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
function setCurrentPosition() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  navigator.geolocation.getCurrentPosition(success, error, options);
}

export { setCurrentPosition }