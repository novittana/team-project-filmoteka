import { MovieAPI } from "./movie-api";

const refs = {
    modalOpenEl: document.querySelector('.js-modal-open'),
    backdropEl: document.querySelector('.js-backdrop'),
    closeModalEl: document.querySelector('.js-modal-close'),
    infoCard:document.querySelector('.description-modal_info'),
};

const createCards = cardInfo => {
    const { poster_path, title, vote_average, vote_count, popularity, original_title, genres, overview } = cardInfo
    const genresEl = [];
    for (genre of genres) {
        genresEl.push(genre.name);
}
    return `
               <img
        class="description-modal_img"
        src="https://image.tmdb.org/t/p/w500${poster_path}"
        alt=""
      />
    <div>
        <h2 class="description-modal_title">${title}</h2>
        <ul class="description-modal_list">
          <li class="description-modal_item">
            <p>Vote/Voles</p>
            <span class="description-rating">${vote_average.toFixed(1)} </span>
            <span> / ${vote_count}</span>
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
            <p>Genre</p>
            <span>${genresEl.join(', ')}</span>
          </li>
          <li class="description-modal_item">
            <p class="description-modal_about">ABOUT</p>
            <p class="description-modal_about">${overview}</p>
          </li>          
        </ul>
        <div class="description-btn">
        <button class="description-modal_btn watched">add to Watched</button>
        <button class="description-modal_btn queue">add to queue</button>
        </div>
    </div>        
            `;    
};

const addMoveInfo = async (id) => {
    try {
        const data = await movieAPI.getFilmFullInfo(id);
        //console.log(data);        
        refs.infoCard.innerHTML = createCards(data);  
                
    } catch (err) {
        console.log(err);
    }
};

const movieAPI = new MovieAPI();

const onModalOpen = e => {
    e.preventDefault();    
    //console.log(e);    
    if (e.target.offsetParent.className!=="card-list__item") {
        return;
    }
    const idFilm = e.target.dataset.id;
    addMoveInfo(idFilm)
    //console.log(movieAPI.getFilmFullInfo(idFilm));

    refs.backdropEl.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onEscKeyPress);
};

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

