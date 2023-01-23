// // Toma K

// // встановлюю axios https://axios-http.com/uk/docs/intro
// // $ npm install axios
// // рефакторю >> const axios = require('axios').default; << в:
// import axios from 'axios';


// // об'єкт для збереження жанрів в форматі id:'genre'
export const genreList = {};

// // створюю з класу, з АПІ методами, об'єкт і звертаюсь до АПІ
import {MovieAPI} from './movie-api';
const movieApi = new MovieAPI();
const runApi = async () => {
  try{
    // // запит для отримання і збереження жанрів фільмів в об'єкті в форматі id:'genre'
    // // https://api.themoviedb.org/3/genre/movie/list?api_key=a95ff59f8d48ac961c2785119723c43c&language=en-US
    const responseGenre = await movieApi.getFilmsByGenres();
    const genreArr = responseGenre.genres;
    // // трансформую масив об'єктів в об'єкт з жанрами в форматі id:'genre'
    genreArr.map(el => {
      genreList[el.id] = el.name;
    });

    // // запит для отримання списку найпопулярніших зараз фільмів 
    // // https://api.themoviedb.org/3/trending/movie/day?api_key=a95ff59f8d48ac961c2785119723c43c
    const responseTrending = await movieApi.getPopularFilmList();
    createGallery(responseTrending.results);
  } catch(err){
    console.log(err);
  }
}
// // активую АПІ запити
runApi();


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
              <div class="card-list__img-box">
                <img class="card-list__img" data-id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=" ${title} ">
              </div>
              <div class="card-list__info-box">
                <h3 class="card-list__title">${title}</h1>
                <div class="card-list__info">
                  <p class="card-list__text">${genre} |  ${year} </p>
                  <div class="card-list__rate-box">
                    <p class="card-list__rate">${average}</p>
                  </div> 
                </div>
              </div>
            </a>
          </li>`;
      }

      return `
        <li class="card-list__item">
          <a href="#" class="card-list_link" id="${id}">
            <div class="card-list__img-box">
              <img class="card-list__img" data-id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=" ${title} ">
            </div>
            <h3 class="card-list__title">${title}</h3>
            <p class="card-list__text">${genre} |  ${year} </p>
          </a>
        </li>`;
    })
    .join('');
    // // = вставляю ХТМЛ розмітку створену на основі даних АПІ в UL елемент на сторінці
    const cardListEl = document.querySelector('.card-list__main');
    cardListEl.innerHTML = elements;
}
