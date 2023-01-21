// // Toma K

// // шукаю елементи
const CardListMain = document.querySelector('.card-list__main');
// console.log('galleryCardList', galleryCardList);


// // створюю рзмітку карток фільмів для галереї Функція приймає results: (відповідь сервера > response.data.results)
createGalleryMain = (results)=>{

    return results.map( el => {

        const {id, poster_path, title, genre_ids, release_date, vote_average} = el;
        // console.log('4', id, poster_path, title, genre_ids, release_date, vote_average );

        const year = new Date(release_date).getFullYear();
        const average = vote_average.toFixed(2);
        const genre = genre_ids.slice(0, 2).map( el => ' ' + api.genreList[el] );

        return `
            <li class="card-list__item">
                <a href="#" class="card-list_link" id="${id}">
                  <img class="card-list__img" data-id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=" ${title} ">
                  <h3 class="card-list__title">${title}</h1>
                  <p class="card-list__text">${genre} |  ${year} </p>
                </a>
            </li>`
    } ).join('')
}



// // встановлюю axios https://axios-http.com/uk/docs/intro
// // $ npm install axios
// // рефакторю >> const axios = require('axios').default; << в:
import axios from 'axios';

const api = {
  BASE_URL: 'https://api.themoviedb.org/',
  API_KEY: 'a95ff59f8d48ac961c2785119723c43c',

  // // масив для збереження жанрів
  genreList: {},


  // Запит для отримання списку найпопулярніших зараз фільмів https://api.themoviedb.org/3/trending/movie/day?api_key=a95ff59f8d48ac961c2785119723c43c
  trends (){
    // console.log('1 start request');
    return axios.get(`${this.BASE_URL}3/trending/movie/day`, {
      params: {
        api_key: this.API_KEY,
      }
    })
  },

  // // запит на сервер для отримання і збереження жанрів фільмів в об'єкті в форматі id:'genre'
  // // https://api.themoviedb.org/3/genre/movie/list?api_key=a95ff59f8d48ac961c2785119723c43c&language=en-US
  genre (){
    // console.log('1 start request');
    return axios.get(`${this.BASE_URL}3/genre/movie/list`, {
      params: {
        api_key: this.API_KEY,
        language: 'en-US',
      }
    })
    .then( response => {
      const genreArr = response.data.genres;
      // // перероблюю масив об'єктів на об'єкт з жанрами в форматі id:'genre'
      genreArr.map(el => {
        this.genreList[el.id] = el.name;
      });
      // console.log(this.genreList);
    })
  },

}



// активую запит на сервер для отримання і збереження жанрів в об'єкті в форматі id:'genre'
api.genre()
// console.log('GENRE',api.genreList);


// активую запит на сервер  для отримання актуальних трендових фільмів для main gallery >> формую html картки фільмів >> записую в галерею
api.trends()
.then( response => {
//   console.log('2', response);
    const movies = response.data.results;
    // console.log('3', movies);


    const moviesHtml = createGalleryMain(movies);
    // console.log('5', moviesHtml);
    CardListMain.innerHTML = moviesHtml;

})
