import store from '../store';

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    } else {
      reject(new Error('GeoLocation is not available'));
    }
  });
}

let geoLocationGetterIntervalId;

export function init() {
  geoLocationGetterIntervalId = window.setInterval(async () => {
    const position = await getCurrentPosition();
    store.commit('SET_LOCATION', position);
  }, 10000);
}

export function stop() {
  window.clearInterval(geoLocationGetterIntervalId);
}
