const refs = {
    modalOpenEl: document.querySelector('.js-modal-open'),
    backdropEl: document.querySelector('.js-backdrop'),
    closeModalEl: document.querySelector('.js-modal-close'),
};

const onModalOpen = () => {
    refs.backdropEl.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onEscKeyPress);
};

const closeModal = () => {
    refs.backdropEl.classList.add('is-hidden');
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

refs.modalOpenEl.addEventListener('click', onModalOpen);
refs.closeModalEl.addEventListener('click', closeModal);
refs.backdropEl.addEventListener('click', onBackdropElClick);