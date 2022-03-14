b = document.querySelector('body');
console.log(b);
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav__container');
const headerNav = document.querySelector('.header__nav');
const header = document.querySelector('.header');
const j = nav.clientHeight;
const summ = nav.clientHeight - header.clientHeight;
console.log(nav.clientHeight);
const navToHeader = () => {
  const h = navList.innerHTML;

  nav.style.paddingTop = j + 'px';
  nav.innerHTML = '';
  nav.classList.add('hidden');
  // headerNav.innerHTML = h;

}

window.addEventListener('scroll', function () {
  // console.log(window.pageYOffset - summ);
  if ((window.pageYOffset - summ) >= 0) {

    navToHeader();
  }

});
// console.log(nav.clientHeight);
// console.log(header.clientHeight);





