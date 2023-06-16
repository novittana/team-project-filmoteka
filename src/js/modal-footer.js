const refs = {
  footerModalOpenEl: document.querySelector('[data-modal__footer-open]'),
  footerCloseBtnEl: document.querySelector('.footer__close-btn'),
  footerModalEl: document.querySelector('[data__footer-modal]'),
};


refs.footerModalOpenEl.addEventListener('click', openModalWindow);
refs.footerCloseBtnEl.addEventListener('click', closeModalWindow);

function openModalWindow() {
  refs.footerModalEl.classList.remove('is-hidden');
}

function closeModalWindow() {
  refs.footerModalEl.classList.add('is-hidden');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && refs.footerModalEl.classList) {
    closeModalWindow();
  }
});









