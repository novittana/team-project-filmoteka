import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { MovieApi } from './movie-api';
import { createGallery } from './create-card';
import { createPagination } from './pagination';

let movieApiMain = new MovieApi;
const paginationMain = createPagination(total_items, 20, 5, page);
console.log(page);