import { createGallery } from './create-card';
import { MovieAPI } from './movie-api';

const refs = {
  btnWatchedEl: document.querySelector('.js-btn-watched'),
  btnQueueEl: document.querySelector('.js-btn-queue'),
};

let instance = new MovieAPI();

const loadFromLS = key => {
  // console.log('key*', key);
  try {
    let filmState = localStorage.getItem(key);
    // console.log('filmState*', filmState);
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
  }
}

export function renderWatched() {
  document.querySelector('.gallery__container .gallery__card-list').innerHTML =
    '';
  // Масив айдішек
  const arrWatchedId = loadFromLS('filmWatched');
  // console.log('arrWatchedId*', arrWatchedId);
  
  onWatchedBtnClick();
  if (!arrWatchedId || arrWatchedId.length === 0) {
    showNothingInLibrary();
  } else {

    const films = arrWatchedId.map(id => instance.getFilmFullInfo(id));
    Promise.all(films)
    .then(response => {
      createGallery(response);
    });
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
      <img class="library__picture" src="../images/no-films-img-min.jpg" alt="Nothing to show picture">
    </a>
    </li>
    
  `;
  // Не треба виводити пагінацію
  //   pagination.style.display = 'none';
}
