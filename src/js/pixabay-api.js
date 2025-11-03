import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '30108062-264069135fbcff220b3f8c28b';
const BASE_URL = 'https://pixabay.com/api/';





const refs = {
  searchForm: document.querySelector('form'),
  gallery: document.querySelector('.js-gallery'),
};

const onSearchSubmit = e => {
  e.preventDefault();
  const { target: searchForm } = e;
  const value = searchForm.elements.query.value.trim();
  if (value.length === 0) {
    iziToast.warning({ title: 'Увага', message: 'Введи пошуковий запит' });
    return;
  }
  fetchImages(value);
};

refs.searchForm.addEventListener('submit', onSearchSubmit);




export function fetchImages(value) {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = res.json();
      return data;
    })
    .then(data => {
      console.log(data.hits);
      const galleryCardsTemplate = data.hits
        .map(cardInfo => createGalleryCardTemplate(cardInfo))
        .join('');
      console.log(galleryCardsTemplate);
      refs.gallery.innerHTML = galleryCardsTemplate;
    })
    .catch(err => {
      if (err.status === '404') {
        console.log('❌ Error 404: Not Found');
      } else {
        console.log('⚠️ Network or other error:', err.message);
      }
    });
}

const createGalleryCardTemplate = cardInfo => {
  return `<li class="gallery-card">
    <img class="gallery-img" src=${cardInfo.webformatURL} alr='${cardInfo.tags}' />
  </li>`;
};
