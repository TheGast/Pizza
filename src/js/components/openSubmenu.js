export function openSubmenu() {
  const submenuBtn = document.querySelector('.nav-submenu__btn');
  const submenuList = document.querySelector('.nav-submenu__list');

  submenuBtn.addEventListener('click', (e) => {
    submenuBtn.classList.toggle('opened');
    submenuList.classList.toggle('opened');
  });

  document.addEventListener('click', (e) => {
    if (e.target != submenuList && e.target != submenuBtn) {
      submenuBtn.classList.remove('opened');
      submenuList.classList.remove('opened');
    }
  });
};

