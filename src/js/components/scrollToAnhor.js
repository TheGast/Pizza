import vars from '../_vars'


export function scrollToAnhor(){
  const scrollBtns = document.querySelectorAll('[data-scroll-btn]');
  const scrollTargets = document.querySelectorAll('[data-scroll-target]');

  scrollBtns.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const scrollBtnAttr = el.getAttribute('data-scroll-btn');

      scrollTargets.forEach((el) => {
        let scrollTargetAttr = el.getAttribute('data-scroll-target');

        if (scrollBtnAttr == scrollTargetAttr) {
          let targetScrollPosition = el.offsetTop;

          window.scrollTo({
            top: targetScrollPosition - vars.header.clientHeight,
            behavior: "smooth"
        });
        }
      });
    });
  });
}



