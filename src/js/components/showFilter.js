import {disableScroll} from'./disabledScroll';
import {enableScroll} from'./enabledScroll';

const filterBtns = document.querySelectorAll('.filter-btn');
const modals = document.querySelector('.modals');
const modalsClose = document.querySelector('.modals__close');


filterBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
    modals.classList.add('show');
    disableScroll();

    document.addEventListener('click', (e)=>{
      if(e.target==modals || e.target==modalsClose){
        modals.classList.remove('show');
        enableScroll();
      }
    });
  });
});
