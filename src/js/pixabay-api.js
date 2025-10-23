import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '30108062-264069135fbcff220b3f8c28b';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages() {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=cat&image_type=photo`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => console.log(data.hits))
    .catch(err => console.error(err));
}

// console.log(data.hits);
fetchImages();
