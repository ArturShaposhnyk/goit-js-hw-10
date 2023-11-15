import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { getSlider } from 'simple-slider';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

var simpleslider = require('simple-slider');

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
  container: document.getElementById('myslider'),
};

elements.error.classList.add('is-hidden');
elements.loader.classList.add('is-hidden');
elements.select.classList.add('is-hidden');

let selectedArr = null;

fetchBreeds()
  .then(data => {
    selectedArr = data;
    if (data.length) {
      elements.select.classList.remove('is-hidden');
    }
    elements.loader.classList.add('is-hidden');
    elements.select.insertAdjacentHTML('afterbegin', selectedOptions(data));
    new SlimSelect({
      select: '#single',
    });
  })
  .catch(err => {
    elements.select.innerHTML = '';
    elements.loader.classList.remove('is-hidden');

    Notiflix.Notify.failure(err);
  });

function selectedOptions(arr) {
  selectedArr = arr;
  return arr
    .map(
      obj => `
    <option value="${obj.id}">${obj.name}</option>
  `
    )
    .join('');
}

elements.select.addEventListener('change', handlerOption);

function handlerOption(evt) {
  elements.catInfo.innerHTML = '';
  elements.loader.classList.remove('is-hidden');
  let selectedId = evt.target.value;

  fetchCatByBreed(selectedId)
    .then(data => {
      elements.catInfo.insertAdjacentHTML(
        'beforeend',
        createMarkup(selectedArr, selectedId)
      );
      elements.container.insertAdjacentHTML('afterbegin', createCatImg(data));
      simpleslider.getSlider({
        container: elements.container,
        prop: 'left',
        init: -312,
        show: 0,
        end: 312,
        unit: 'px',
      });
    })
    .catch(err => {
      Notiflix.Notify.failure(err);
    })
    .finally(() => {
      elements.loader.classList.add('is-hidden');
    });
}

function createMarkup(arr, id) {
  const index = arr.findIndex(el => el.id === id);
  return `
    <div id="myslider" style="width:312px; height:312px"></div>
      <h2>${arr[index].name}</h2>
      <p>${arr[index].description}</p>
      <h3>Temperament</h3>
      <p>${arr[index].temperament}</p>
    `;
}

function createCatImg(arr) {
  return arr
    .map(
      obj => `
        <img src="${obj.url}" width="312px">
        `
    )
    .join('');
}
