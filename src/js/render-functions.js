import { fetchImages } from './pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  searchForm: document.querySelector('form'),
  gallery: document.querySelector('js-gallery'),
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
