import axios from 'axios';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loadEl: document.querySelector('.backdrop'),
};

function fillBreedList(breeds) {
  breeds.forEach(breed => {
    renderBreedOptions(breed.id, breed.name);
  });
  new SlimSelect({
    select: refs.selectEl,
  });
}
function renderBreedOptions(id, name) {
  const selectList = `<option value="${id}">${name}</option>`;
  refs.selectEl.insertAdjacentHTML('beforeend', selectList);
}

showSpinner();
fetchBreeds()
  .then(fillBreedList)
  .catch(error => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      clickToClose: true,
      position: 'center-top',
      distance: '50px',
    });
    console.log(error);
  })
  .finally(() => {
    hideSpinner();
  });

refs.selectEl.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  const breedId = event.target.value;
  refs.catInfo.innerHTML = '';
  showSpinner();
  fetchCatByBreed(breedId)
    .then(renderCatInfo)
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        clickToClose: true,
        position: 'center-top',
        distance: '50px',
      });
      console.error(error);
    })
    .finally(() => {
      hideSpinner();
    });
}
function renderCatInfo({ url, breeds }) {
  const { name, description, temperament } = breeds[0];
  const markup = `<div class="img-wrap">
  <img class="cat-img" src="${url}" alt="${name}" width="360"/>
  </div>
  <div class="cat-description">
  <h2 class="cat-breed">${name}</h2>
  <p class="breed-descript">${description}</p>
  <p class="temperament">
  <span class="temperam-title">Temperament: </span>${temperament}
  </p>
  </div>`;
  refs.catInfo.innerHTML = markup;
}

function showSpinner() {
  refs.loadEl.classList.remove('is-hidden');
}

function hideSpinner() {
  refs.loadEl.classList.add('is-hidden');
}
