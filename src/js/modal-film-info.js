import { MovieAPI } from "./movie-api";

const refs = {
    modalOpenEl: document.querySelector('.js-modal-open'),
    backdropEl: document.querySelector('.js-backdrop'),
    closeModalEl: document.querySelector('.js-modal-close'),
    infoCard:document.querySelector('.description-modal_info'),
     watchedBtn:document.querySelector('.js-watched'),
     queueBtn:document.querySelector('.js-queue'),
    //watchedBtn1:document.querySelector('.card-list_link'),
    //queueBtn1:document.querySelector('.description-modal_info .queue'),
};

// console.log(watchedBtn1);
// console.log(queueBtn1);


// refs.watchedBtn1.addEventListener('click', ()=>{
//   console.log('Hell');
// })

const movieAPI = new MovieAPI();

const createCards = cardInfo => {
    const { poster_path, title, vote_average, vote_count, popularity, original_title, genres, overview,id } = cardInfo
    const genresEl = [];
    for (genre of genres) {
        genresEl.push(genre.name);        
    }
    refs.watchedBtn.dataset.filmId = id;
    refs.queueBtn.dataset.filmId = id;
    return `
               <img
        class="description-modal_img"
        src="https://image.tmdb.org/t/p/w500${poster_path}"
        alt="poster"
      />
    <div class="description-modal_wrap">
        <h2 class="description-modal_title">${title}</h2>
        <ul class="description-modal_list">
          <li class="description-modal_item">
            <p class="slash">Vote/Voles</p>
            <div>
              <span class="description-rating">${vote_average.toFixed(1)} </span> &nbsp;/ 
              <span class="description-rating1">  ${vote_count}</span>
            </di>
          </li>
          <li class="description-modal_item">
            <p>Popularity</p>
            <span>${popularity.toFixed(1)}</span>
          </li>
          <li class="description-modal_item">
            <p>Original Title</p>
            <span>${original_title}</span>
          </li>
          <li class="description-modal_item">
            <p class="genres">Genre</p>
            <span class="genres">${genresEl.join(', ')}</span>
          </li>
          <li class="description-modal_item">
            <p class="description-modal_about">ABOUT</p>
            <p class="description-modal_about">${overview}</p>
          </li>          
        </ul>
            
    </div>        
            `;    
};

const addMoveInfo = async (id) => {
    try {
        const data = await movieAPI.getFilmFullInfo(id);
        //console.log('61',data);        
        refs.infoCard.innerHTML = createCards(data);                  
    } catch (err) {
        console.log(err);
    }
};

const saveToLS = (key, value) => {
  try {
    const val = JSON.stringify(value);
    localStorage.setItem(key, val);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const loadToLS = key => {
  try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? [] : JSON.parse(serializedState);
    } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const onModalOpen =async e => {
    e.preventDefault();    
    //console.log('88',e.target.dataset);    
    if (e.target.offsetParent.className!=="card-list__item") {
        return;
    } 
    const idFilm = e.target.dataset.id;
    //const data = await movieAPI.getFilmFullInfo(idFilm);
    //console.log('96',data);

    addMoveInfo(idFilm)    
    refs.backdropEl.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onEscKeyPress);    
};

// localStorage.removeItem('filmWatched');
// localStorage.removeItem('filmQueue');

let arrFilmWatched=loadToLS('filmWatched');  
let arrFilmQueue=loadToLS('filmQueue');

//arrFilmWatched=loadToLS('filmWatched')
console.log(arrFilmWatched);
//arrFilmQueue=loadToLS('filmQueue')
console.log(arrFilmQueue);

const onBtnWatchedClick=e=>{
  e.preventDefault();
       
  const idFilm=refs.watchedBtn.dataset.filmId
  arrFilmWatched.push(idFilm)
  const filterArrFilmWatched=arrFilmWatched.filter((value, i, arr)=>arr.indexOf(value)===i)
  // console.log('122',filterArrFilmWatched);
  // console.log('123',arrFilmWatched);
  saveToLS('filmWatched', filterArrFilmWatched)
 }

const onBtnQueueClick= e=>{
e.preventDefault();  
const idFilm=refs.queueBtn.dataset.filmId
arrFilmQueue.push(idFilm)
const filterArrFilmQueue=arrFilmQueue.filter((value, i, arr)=>arr.indexOf(value)===i)    
// console.log('135',filterArrFilmQueue);
// console.log('136',arrFilmQueue);
saveToLS('filmQueue', filterArrFilmQueue)   
}

const closeModal = () => {    
    refs.backdropEl.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onEscKeyPress);
    refs.infoCard.innerHTML = '';
};

const onEscKeyPress = e => {
    if (e.code === 'Escape') {
        closeModal();
    }
};

const onBackdropElClick = e => {
    const { target, currentTarget } = e;
    if (target !== currentTarget) {
        return;
    }
    closeModal();
};

refs.modalOpenEl.addEventListener('click', onModalOpen);
refs.closeModalEl.addEventListener('click', closeModal);
refs.backdropEl.addEventListener('click', onBackdropElClick);
refs.watchedBtn.addEventListener('click', onBtnWatchedClick);
refs.queueBtn.addEventListener('click', onBtnQueueClick);






//     const saveToLS = (key, value) => {
//       try {
//         const val = JSON.stringify(value);
//         localStorage.setItem(key, val);
//       } catch (error) {
//         console.error("Set state error: ", error.message);
//       }
//     };

// const ArrFilmWatched = ["76600","653851","615777","36554"]
// const ArrFilmQueue = ["996727","778946","674324","990140"]

//     saveToLS('filmWatched', ArrFilmWatched)

//     saveToLS('filmQueue', ArrFilmQueue)


// localStorage.removeItem('filmWatched1');
// localStorage.removeItem('filmQueue1');