import { disableScroll } from './disabledScroll';
import { enableScroll } from './enabledScroll';

const modals = document.querySelector('.modals');
const openModalsBtns = document.querySelectorAll('[data-show]');
const targetModals = document.querySelectorAll('[data-modal]');

openModalsBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let btnAttr = el.getAttribute('data-show');

    targetModals.forEach((el) => {
      let modalAttr = el.getAttribute('data-modal');
      if (btnAttr == modalAttr) {
        openModal(el);
      }
    });
  });
});

const openModal = (el) => {
  const modalsClose = el.querySelector('.modals-close');

  modals.classList.add('show');
  el.classList.add('show');
  disableScroll();

  document.addEventListener('click', (e) => {
    if (e.target == modals || e.target == modalsClose) {
      modals.classList.remove('show');
      el.classList.remove('show');
      enableScroll();
    }
  });
}


