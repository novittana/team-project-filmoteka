import { createGallery } from './create-card';
import { MovieAPI } from './movie-api';

const refs = {
  btnWatchedEl: document.querySelector('.js-btn-watched'),
  btnQueueEl: document.querySelector('.js-btn-queue'),
};

let instance = new MovieAPI();

// // Вихідні дані LS від Каті
// const saveToLS = (key, value) => {
//   try {
//     const val = JSON.stringify(value);
//     localStorage.setItem(key, val);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   }
// };

// const ArrFilmWatched = ['76600', '653851', '615777', '36554'];
// const ArrFilmQueue = ['996727', '778946', '674324', '990140'];

// saveToLS('filmWatched', ArrFilmWatched);

// saveToLS('filmQueue', ArrFilmQueue);
// // Кінець-- Вихідні дані LS від Каті

const loadFromLS = key => {
  try {
    let filmState = localStorage.getItem(key);
    return (filmState = JSON.parse(filmState) || undefined);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

const actionPage = document.querySelector('.menu__link-active');
if (actionPage.dataset.action === 'library') {
  renderPageLibrary();
}

async function renderPageLibrary(event) {
  refs.btnWatchedEl.classList.remove('active');
  refs.btnQueueEl.classList.remove('active');

  renderAllList();

  refs.btnWatchedEl.addEventListener('click', renderWatched);
  refs.btnQueueEl.addEventListener('click', renderQueue);
}

function renderAllList() {
  document.querySelector('.gallery__container .gallery__card-list').innerHTML =
    '';
  let arrWatchedId = [];
  let arrQueueId = [];
  if (loadFromLS('filmWatched')) {
    arrWatchedId = loadFromLS('filmWatched');
  }
  if (loadFromLS('filmQueue')) {
    arrQueueId = loadFromLS('filmQueue');
  }
  const arrAllFilmsId = [...arrWatchedId, ...arrQueueId];
  if (arrWatchedId.length === 0 && arrQueueId.length === 0) {
    showNothingInLibrary();
  } else {

    const films = arrAllFilmsId.map(id => instance.getFilmFullInfo(id));
    Promise.all(films).then(response => {
      createGallery(response);
    });
    // for (let filmId of arrAllFilmsId) {
    //   instance.getFilmFullInfo(filmId).then(response => {
    //     createGallery([response], filmId);
    //   });
    // }

  }
}

function renderWatched() {
  document.querySelector('.gallery__container .gallery__card-list').innerHTML =
    '';
  const arrWatchedId = loadFromLS('filmWatched');
  onWatchedBtnClick();
  if (!arrWatchedId || arrWatchedId.length === 0) {
    showNothingInLibrary();
  } else {

    const films = arrWatchedId.map(id => instance.getFilmFullInfo(id));
    Promise.all(films).then(response => {
      createGallery(response);
    });
    // for (let filmId of arrWatchedId) {
    //   instance.getFilmFullInfo(filmId).then(response => {
    //     // console.log(response.data);
    //     console.log(response);
    //     createGallery([response], filmId);
    //   });
    // }

  }
}

function renderQueue() {
  document.querySelector('.gallery__container .gallery__card-list').innerHTML =
    ' ';
  const arrQueueId = loadFromLS('filmQueue');
  onQueueBtnClick();
  if (!arrQueueId || arrQueueId.length === 0) {
    showNothingInLibrary();
  } else {

    const films = arrQueueId.map(id => instance.getFilmFullInfo(id));
     Promise.all(films).then(response => {
      createGallery(response);
    });
    // for (let filmId of arrQueueId) {
    //   instance.getFilmFullInfo(filmId).then(response => {
    //     // console.log(response.data);
    //     console.log(response);
    //     createGallery([response], filmId);
  //     });
  //   }

   
  }
}

function onWatchedBtnClick() {
  refs.btnQueueEl.classList.remove('active');
  refs.btnWatchedEl.classList.add('active');
}

function onQueueBtnClick() {
  refs.btnWatchedEl.classList.remove('active');
  refs.btnQueueEl.classList.add('active');
}

function showNothingInLibrary() {
  document.querySelector(
    '.gallery__container .gallery__card-list'
  ).innerHTML = `
  <li>Sorry...</li>
  <li>
   <a>
      <p class="library__text"> No movies have been added yet. Let's go pick something to your liking!</p>
      <img class="library__picture" src="../images/no-films-img-min.jpg" alt="nothing to show">
    </a>
    </li>
    
  `;
  // Не треба виводити пагінацію
  //   pagination.style.display = 'none';
}
