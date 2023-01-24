//import { MovieAPI } from "./movie-api";
//import onTrailerClick from './modal-film-info'

const refs = {
    modalOpenElV: document.querySelector('.js-modal-open-video'),
    backdropElV: document.querySelector('.js-backdrop-video'),
    closeModalElV: document.querySelector('.js-modal-close-video'),
    trailerIf:document.querySelector('.videoww'),
 
};

const onModalOpen = () => {
  
    refs.backdropElV.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onEscKeyPress);    
};

const closeModal = () => {  
    refs.trailerIf.innerHTML ='';
  refs.backdropElV.classList.add('is-hidden'); 
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onEscKeyPress);    
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

refs.modalOpenElV.addEventListener('click', onModalOpen);
refs.closeModalElV.addEventListener('click', closeModal);
refs.backdropElV.addEventListener('click', onBackdropElClick);
