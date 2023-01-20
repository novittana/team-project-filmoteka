// // Toma K

// // шукаю елементи
const CardListMain = document.querySelector('.card-list__main');
// console.log('galleryCardList', galleryCardList);


// // створюю рзмітку карток фільмів для галереї Функція приймає results: (відповідь сервера > response.data.results)
createMainGallery = (results)=>{

    return results.map( el => {
        const {id, poster_path, title, genre_ids, release_date, vote_average} = el;
        console.log('4', id, poster_path, title, genre_ids, release_date, vote_average );
        const year = new Date(release_date).getFullYear();

        return `
            <li class="card-list__item">
                <img class="card-list__img" data-id="${id}" src="https://image.tmdb.org/t/p/w500${poster_path}" alt=" ${title} ">
                <h3 class="card-list__info card-list__title">${title}</h1>
                <p class="card-list__info card-list__text">${genre_ids} |  ${year} </p>
                <div class="card-list__rate">${vote_average}</div>
            </li>`
    } ).join('')
}


// Запит для отримання списку найпопулярніших зараз фільмів
// https://api.themoviedb.org/3/trending/movie/day?api_key=a95ff59f8d48ac961c2785119723c43c


// // встановлюю axios https://axios-http.com/uk/docs/intro
// // $ npm install axios
// // рефакторю >> const axios = require('axios').default; << в:
import axios from 'axios';

const api = {
  BASE_URL: 'https://api.themoviedb.org/',
  API_KEY: 'a95ff59f8d48ac961c2785119723c43c',

  request (){
    // console.log('1 start request');
    return axios.get(`${this.BASE_URL}3/trending/movie/day`, {
      params: {
        api_key: this.API_KEY,
      }
    })
  },

}


// активую запит на сервер  для отримання актуальних трендових фільмів для main gallery >> формую html картки фільмів >> записую в галерею
api.request()
.then( response => {
  // console.log('2', response);
    const movies = response.data.results;
    // console.log('3', movies);

    const moviesHtml = createMainGallery(movies);
    // console.log('5', moviesHtml);
    CardListMain.innerHTML = moviesHtml;
})
