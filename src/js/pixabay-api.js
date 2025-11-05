const API_KEY = '30108062-264069135fbcff220b3f8c28b';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}?${params.toString()}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        const err = new Error(`HTTP ${res.status}`);
        err.status = res.status;
        throw err; // передаємо помилку далі у .catch
      }
      return res.json(); // повертаємо проміс із JSON
    })
    .then(data => {
      return data.hits; // повертаємо тільки масив картинок
    })
    .catch(err => {
      console.error('❌ Fetch error:', err);
      throw err; // проброс помилки далі, щоб її побачив onSearchSubmit
    });
}

