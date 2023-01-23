// перенесла все в 1 універсальну функцію в create-card

// // об'єкт в якому зберігаються жанри в форматі id:'genre'
import { genreList } from './create-card';

// // ф. для створення галереї, ф. приймає results: (відповідь сервера > response.data.results)
import { createGallery } from './create-card';
import { loadToLS } from './modal-film-info';

import { MovieAPI } from './movie-api';

// Get array with full fillms without repeat

// const movieAPI = new MovieAPI();

// const getFullFilms = () => {
//   let fullFilmList = getWatchedFilms();
//   let queueFilms = getQueueFilms();
//   queueFilms.forEach(element =>
//     fullFilmList.includes(element) ? -1 : fullFilmList.push(element)
//   );
//   return fullFilmList;
// };

// const requestToFilmDatabase = async () => {
//   const data = await movieAPI.getFilmFullInfo('536554');
//   console.log(data);
// };

// getWatchedFilms = () => loadToLS(`filmWatched`);
// getQueueFilms = () => loadToLS(`filmQueue`);
// requestToFilmDatabase();
