import { MovieAPI } from './movie-api';
import { createGalleryMain } from './create-card-main';
import { createPagination } from './pagination';

const api = new MovieAPI();
const searchFormEl = document.querySelector('.form-search');
const galleryEl = document.querySelector('.gallery__card-list');
const paginationEl = document.getElementById('tui-pagination-container');
const notifyEl = document.querySelector('.notify');

searchFormEl.addEventListener('submit', onLoadMovies);


function onLoadMovies(e) {
  e.preventDefault();
  const keyWord = e.target.elements.searchQuery.value.trim();

  paginationEl.innerHTML = '';
  getMoviesByKeyWord(keyWord, 1);
}

function getMoviesByKeyWord(keyWord, page) {
  galleryEl.innerHTML = '';

  api
    .getFilmListByKeyWord(keyWord, page)
    .then(movies => {
      if (movies.results.length === 0) {
        notifyEl.insertAdjacentText('beforeend', 'Search result not successful. Enter the correct movie name and');
        return movies;
      }
      galleryEl.insertAdjacentHTML(
        'beforeend',
        createGalleryMain(movies.results)
      );
      return movies;
    })
    .then(movies => {
      if (!paginationEl.childNodes.length) {
        const pagination = createPagination(
          movies.total_results,
          movies.results.length,
          7,
          movies.page
        );
        pagination.on('beforeMove', event => {
          getMoviesByKeyWord(keyWord, event.page);
        });
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}
