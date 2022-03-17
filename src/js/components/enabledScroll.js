import vars from '../_vars'

export function enableScroll() {
  let pagePosition = vars.body.dataset.position;

  vars.body.classList.remove('disable-scroll');
  window.scroll({ top: pagePosition, left: 0 });
  vars.body.style.paddingRight = 0;
  vars.fixBlocks.forEach((el) => {
    el.style.paddingRight = 0;
  });
  vars.body.removeAttribute('data-position');
  vars.body.style.top = 'auto';
};
