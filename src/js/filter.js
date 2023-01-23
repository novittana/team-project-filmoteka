import { createGallery } from './create-card';
import { MovieAPI } from './movie-api';

const refs = {
  btnWatchedEl: document.querySelector('.js-btn-watched'),
  btnQueueEl: document.querySelector('.js-btn-queue'),
  //   refMyLibraryEl: document.querySelector('.js-ref-mylib'),
};

// Вихідні дані LS від Каті
const saveToLS = (key, value) => {
  try {
    const val = JSON.stringify(value);
    localStorage.setItem(key, val);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const ArrFilmWatched = ['76600', '653851', '615777', '36554'];
const ArrFilmQueue = ['996727', '778946', '674324', '990140'];

saveToLS('filmWatched', ArrFilmWatched);

saveToLS('filmQueue', ArrFilmQueue);
// Кінець-- Вихідні дані LS від Каті


//! Тут, виходить, реалізовано логіку 3, 14, 15 задач
// ?загрузка сторінки бібліотеки з усіх фільмів, а потім з фільтром
// refs.refMyLibraryEl.addEventListener('click', renderPageLibrary);

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

// Задача 03 (Настя)
function renderAllList() {
  document.querySelector('.gallery__container').innerHTML = '';
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
    for (let filmId of arrAllFilmsId) {
      MovieAPI.getFilmFullInfo(filmId).then(response => {
        createGallery(response.data, filmId);
      });
    }
  }
}

function renderWatched() {
  document.querySelector('.gallery__container').innerHTML = '';
  const arrWatchedId = loadFromLS('filmWatched');
  onWatchedBtnClick();
  if (!arrWatchedId || arrWatchedId.length === 0) {
    showNothingInLibrary();
  } else {
    for (let filmId of arrWatchedId) {
      MovieAPI.getFilmFullInfo(filmId).then(response => {
        createGallery(response.data, filmId);
      });
    }
  }
}

function renderQueue() {
  document.querySelector('.gallery__container').innerHTML = ' ';
  const arrQueueId = loadFromLS('filmQueue');
  onQueueBtnClick();
  if (!arrQueueId || arrQueueId.length === 0) {
    showNothingInLibrary();
  } else {
    for (let filmId of arrQueueId) {
      MovieAPI.getFilmFullInfo(filmId).then(response => {
        createGallery(response.data, filmId);
      });
    }
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
  document.querySelector('.gallery__container').innerHTML = `
  <li>Sorry...</li>
  <li>
   <a>
      <p class="library__text"> No movies have been added yet. Let's go pick something to your liking!</p>
      <img class="library__picture" src="../images/no-films-img-min.jpg" alt="nothing to show">
    </a>
    </li>
    
  `;
  //? Не треба виводити пагінацію
  //   pagination.style.display = 'none';
}
