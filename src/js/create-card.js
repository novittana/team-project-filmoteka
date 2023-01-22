// // Toma K


// // об'єкт для збереження жанрів в форматі id:'genre'
export const genreList = {};


// // встановлюю axios https://axios-http.com/uk/docs/intro
// // $ npm install axios
// // рефакторю >> const axios = require('axios').default; << в:
import axios from 'axios';

const api = {
  BASE_URL: 'https://api.themoviedb.org/',
  API_KEY: 'a95ff59f8d48ac961c2785119723c43c',

  // Запит для отримання списку найпопулярніших зараз фільмів https://api.themoviedb.org/3/trending/movie/day?api_key=a95ff59f8d48ac961c2785119723c43c
  trends() {
    // console.log('1 start request');
    return axios.get(`${this.BASE_URL}3/trending/movie/day`, {
      params: {
        api_key: this.API_KEY,
      },
    });
  },

  // // запит на сервер для отримання і збереження жанрів фільмів в об'єкті в форматі id:'genre'
  // // https://api.themoviedb.org/3/genre/movie/list?api_key=a95ff59f8d48ac961c2785119723c43c&language=en-US
  genre() {
    // console.log('1 start request');
    return axios
      .get(`${this.BASE_URL}3/genre/movie/list`, {
        params: {
          api_key: this.API_KEY,
          language: 'en-US',
        },
      })
      .then(response => {
        const genreArr = response.data.genres;
        // // перероблюю масив об'єктів на об'єкт з жанрами в форматі id:'genre'
        genreArr.map(el => {
          genreList[el.id] = el.name;
        });
        // console.log(this.genreList);
      });
  },
};

// //активую АПІ запит для отримання списку всіх жанрів. І зберігаю в об'єкті в форматі id:'genre'
api.genre();

// // створюю ХТМЛ рзмітку карток фільмів для галереї, ф. приймає results: (відповідь сервера > response.data.results)
export function createGallery(results) {  
  const elements = results.map(el => {
      const { id, poster_path, title, genre_ids, release_date, vote_average } =
        el;

      const year = new Date(release_date).getFullYear();
      const average = vote_average.toFixed(2);
      const genre = genre_ids.slice(0, 2).map(el => ' ' + genreList[el]);

      // // визначаю активну сторінку, якщо відкрита library формую картку з рейтингом
      const actionPage = document.querySelector('.menu__link-active');

      if (actionPage.dataset.action === 'library') {
        return `
          <li class="card-list__item">
            <a href="#" class="card-list_link" id="${id}">
              <img class="card-list__img" data-id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=" ${title} ">
              <h3 class="card-list__title">${title}</h1>
              <div class="card-list__info">
                  <p class="card-list__text">${genre} |  ${year} </p>
                  <div class="card-list__rate-box"><p class="card-list__rate">${average}</p></div>
              </div>
            </a>
          </li>`;
      }

      return `
        <li class="card-list__item">
          <a href="#" class="card-list_link" id="${id}">
            <img class="card-list__img" data-id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=" ${title} ">
            <h3 class="card-list__title">${title}</h1>
            <p class="card-list__text">${genre} |  ${year} </p>
          </a>
        </li>`;
    })
    .join('');
    // // = вставляю ХТМЛ розмітку створену на основі даних АПІ в UL елемент на сторінці
    const cardListEl = document.querySelector('.card-list__main');
    cardListEl.innerHTML = elements;
}

// // виймаю results з відповіді сервера і активую ф. createGallery яка створює галерею на основі отриманих данних (трендові фільми)
api.trends().then(response => {
  createGallery(response.data.results);
});
