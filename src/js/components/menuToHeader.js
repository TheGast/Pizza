import {openSubmenu} from './openSubmenu'

const nav = document.querySelector('.nav');
const headerNav = document.querySelector('.header-nav');
const header = document.querySelector('.header');
const navContainer = document.querySelector('.nav__container');

const navListHtml = navContainer.innerHTML;
const navHeight = nav.clientHeight;
const diffHeight = nav.clientHeight - header.clientHeight;
const navPaddingInitial = getComputedStyle(nav).getPropertyValue('padding-top');




const navToHeader = () => {
  nav.style.paddingTop = navHeight + 'px';
  navContainer.innerHTML = '';
  headerNav.classList.add('visible');
  header.classList.add('hidden');
  headerNav.innerHTML = navListHtml;
}

const navToInitial = () => {
  nav.style.paddingTop = navPaddingInitial;
  headerNav.innerHTML = '';
  headerNav.classList.remove('visible');
  header.classList.remove('hidden');
  navContainer.innerHTML = navListHtml;

}

window.addEventListener('scroll', () => {
  if ((window.pageYOffset - diffHeight) >= 0) {
    navToHeader();
    openSubmenu();
  }
  else {
    navToInitial();
  }
});





