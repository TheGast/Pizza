import vars from '../_vars'

export function disableScroll() {
  let paddingOffset = window.innerWidth - vars.body.offsetWidth;
  let pagePosition = window.scrollY;

  vars.body.classList.add('disable-scroll');
  vars.body.dataset.position = pagePosition;
  vars.body.style.paddingRight = paddingOffset + 'px';
  vars.fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset + 'px';
  });
  vars.body.style.top = - pagePosition + 'px';
};
