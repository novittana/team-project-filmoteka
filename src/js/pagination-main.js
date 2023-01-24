import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { MovieApi } from './movie-api';
import { createGallery } from './create-card';

const movieApi = new MovieApi();
const cardListEl = document.querySelector('.card-list__main');
const pagination = new Pagination(container, options);

pagination.on('afterMove', function (eventData) {
  alert('The current page is ' + eventData.page);
});

const container = document.getElementById('tui-pagination-container');

async function createPaginationMain() {
  try {
    const { total_results } = await movieApi.createGallery();

    const options = {
      totalItems: total_results,
      itemsPerPage: 20,
      visiblePages: 5,
    };
  } catch (error) {
    console.log(error.message);
  }
}

// pagination.on('afterMove', function(eventData) {
//     return confirm('Go to page ' + eventData.page);
// });

createPaginationMain();
