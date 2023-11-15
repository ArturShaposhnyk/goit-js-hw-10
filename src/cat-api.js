import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_qxTnD3jhVl6578RK0prg9nwS5Dey83K0wSY3HQOjt5EDEqHjW3eralCOdokqj8sr';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_qxTnD3jhVl6578RK0prg9nwS5Dey83K0wSY3HQOjt5EDEqHjW3eralCOdokqj8sr';

export function fetchBreeds() {
  const END_POINT = '/breeds';
  return fetch(`${BASE_URL}${END_POINT}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search?limit=5';
  const params = new URLSearchParams({
    breed_ids: breedId,
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}${END_POINT}&${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    // console.log(`${BASE_URL}${END_POINT}?${params}`);
    return resp.json();
  });
}
