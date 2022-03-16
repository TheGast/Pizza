const locationBtn = document.querySelector('.location__btn');
const spanLocationBtn = locationBtn.querySelector('span');
const locationCityList = document.querySelector('.location__city-list');
const locationCityItem = document.querySelectorAll('.location__city-item');

locationBtn.addEventListener('click', () => {
  locationBtn.classList.toggle('opened');
  locationCityList.classList.toggle('opened');

  locationCityItem.forEach((item) => {
    item.addEventListener('click', () => {
      const itemHtml = item.innerText;
      spanLocationBtn.innerText = itemHtml;
      locationBtn.classList.remove('opened');
      locationCityList.classList.remove('opened');
    });
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.location__btn') && !e.target.closest('.location__city-list')) {
    locationBtn.classList.remove('opened');
    locationCityList.classList.remove('opened');
  }
});
