import { createGallery } from './create-card';
import { MovieAPI } from './movie-api';
import { watchedPagination } from './pagination-main';

const refs = {
  btnWatchedEl: document.querySelector('.js-btn-watched'),
  btnQueueEl: document.querySelector('.js-btn-queue'),
};

let instance = new MovieAPI();

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

function renderPageLibrary() {
  refs.btnWatchedEl.classList.remove('active');
  refs.btnQueueEl.classList.remove('active');

  refs.btnWatchedEl.addEventListener('click', renderWatched);
  refs.btnQueueEl.addEventListener('click', renderQueue);
}

export function renderWatched() {
  let containerElement = document.querySelector('.gallery__container .gallery__card-list');
  if (containerElement) {
    containerElement.innerHTML = ''; //переписати?
  }
  const arrWatchedId = loadFromLS('filmWatched');
  onWatchedBtnClick();
  if (!arrWatchedId || arrWatchedId.length === 0) {
    showNothingInLibrary();
  } else {

    const films = arrWatchedId.map(id => instance.getFilmFullInfo(id));
    Promise.all(films).then(response => {
      watchedPagination(response);
      createGallery(response);
    });
  }
}

function renderQueue() {
  let containerElement = document.querySelector('.gallery__container .gallery__card-list');
  if (containerElement) {
    containerElement.innerHTML = '';//переписати?
  }
  const arrQueueId = loadFromLS('filmQueue');
  onQueueBtnClick();
  if (!arrQueueId || arrQueueId.length === 0) {
    showNothingInLibrary();
  } else {

    const films = arrQueueId.map(id => instance.getFilmFullInfo(id));
    Promise.all(films).then(response => {
      watchedPagination(response);
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
    '.gallery__container .card-list__main',
  ).innerHTML = `
    <li class='library__message'>
      <div class='library__heading-txt'>Sorry... :</div>
      <div class='library__txt-upper'>No movies have been added yet.</div>
      <div class='library__txt-down'>Let's go pick something to your liking!</div>
       <input class='library-btns active nothing-to-show' type='button' onclick='history.back();' value='Go to home'/>
    </li>`;

}
