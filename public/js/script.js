const BurgerBtn = document.querySelector(".burger");
const MenuMobile = document.querySelector(".mobile-nav");
const DocumentBody = document.querySelector("body");
const CitySelect = document.querySelector(".header__city");
const CityList = document.querySelector(".header__city-list");
const CurrentCity = document.querySelector(".header__current-city");
const CityItems = document.querySelectorAll(".header__city-item");
const FilterButton = document.querySelector(".filter-btn");



// Бургер и меню
BurgerBtn.addEventListener("click", function () {
	MenuMobile.classList.toggle('opened');
	BurgerBtn.classList.toggle('opened');
	DocumentBody.classList.toggle('hidden-on');
})

// Выбор города
CitySelect.addEventListener("click", function () {
	CityList.classList.toggle("opened");
	CurrentCity.classList.toggle("opened");
})

CityItems.forEach(function (item) {
	item.addEventListener("click", function () {
		CurrentCity.innerHTML = item.textContent;
	})
})

// Фильтры

FilterButton.addEventListener("click", function () {
	const Filter = document.querySelector(".filter");
	const BtnClose = document.querySelector(".filter__btn-close");

	DocumentBody.classList.add("hidden-on");
	Filter.classList.add("bluer-on");

	document.addEventListener("click", function (event) {
		if (event.target != Filter && event.target != BtnClose) {
			event.stopPropagation();
		}
		else {
			DocumentBody.classList.remove("hidden-on");
			Filter.classList.remove("bluer-on");
		}
	})
})




// Получение данных из json файла

const loadProducts = function (quantity = 8) {
	fetch("../resourses/data.json")
		.then(function (answer) {
			return answer.json();
		})
		.then(function (data) {

			// Заполнить страницу товарами
			const productionItems = document.querySelectorAll(".production-items");

			productionItems.forEach(function (item) {
				let count = 0;
				item.innerHTML = "";

				for (let i = 0; i < data.length; i++) {
					if (count < quantity && data[i].type == item.dataset.type) {
						item.innerHTML += `
									<div class="production-item ${data[i].popular}" data-id="${data[i].id}">			
										<div class="production-item__img">
											<img src="${data[i].img}">
										</div>
										<div class="production-item__wrapper">
											<h5 class="production-item__title">${data[i].title}</h5>
											<p class="production-item__descr">${data[i].description}</p>
											<div class="production-item__bottom">
												<button class="btn-reset btn production-item__btn" data-btn="${data[i].title}">Выбрать</button>
												<span class="production-item__price">от ${data[i].price} ₽</span>
											</div>
										</div>
									</div>
								`;
						count++;
					};
				};
			});
			// Заполнить страницу товарами

			//Показать карточку товара
			const ProdButtons = document.querySelectorAll(".production-item__btn");


			ProdButtons.forEach(function (item) {
				item.addEventListener("click", function () {
					const Card = document.querySelector(".card");
					const prodItem = item.closest(".production-item");
					const prodItems = item.closest(".production-items");
					// const BtnClose = document.querySelector(".filter__btn-close");

					const cardImg = Card.querySelector(".card__img");
					cardImg.innerHTML = "";

					const cardFormTitle = Card.querySelector(".card__form-title");
					cardFormTitle.innerHTML = "";

					const cardFormBottom = Card.querySelector(".card__form-bottom");
					cardFormBottom.innerHTML = "";


					for (let i = 0; i < data.length; i++) {
						if (prodItem.dataset.id == data[i].id && prodItems.dataset.type == data[i].type) {

							cardImg.innerHTML = `<img src="${data[i].img}" alt="Image Pizza">`;
							cardFormTitle.innerHTML = `${data[i].title}`;
							cardFormBottom.innerHTML = `
							<div class="card__form-total">
								Итого: <span> ${data[i].price}</span> ₽
							</div>
							<div class="card__form-weight">
								<span>400</span> г
							</div>
							<button class=" btn-reset btn">Добавить</button>`;
						}
					}

					DocumentBody.classList.add("hidden-on");
					Card.classList.add("bluer-on");

					document.addEventListener("click", function (event) {
						if (event.target != Card /*&& event.target != BtnClose*/) {
							event.stopPropagation();
						}
						else {
							DocumentBody.classList.remove("hidden-on");
							Card.classList.remove("bluer-on");
						}
					});
				});
			});
			//Показать карточку товара

		});
};

loadProducts(8);

// Плавный переход к якорям
const anchors = document.querySelectorAll(".navigation__item-btn");

anchors.forEach(function (item) {
	item.addEventListener("click", function (event) {
		event.preventDefault();
		const id = item.getAttribute("href");
		const target = document.querySelector("" + id);

		target.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	});
});
// Плавный переход к якорям
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQnVyZ2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbmNvbnN0IE1lbnVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vYmlsZS1uYXZcIik7XHJcbmNvbnN0IERvY3VtZW50Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG5jb25zdCBDaXR5U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2NpdHlcIik7XHJcbmNvbnN0IENpdHlMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2NpdHktbGlzdFwiKTtcclxuY29uc3QgQ3VycmVudENpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fY3VycmVudC1jaXR5XCIpO1xyXG5jb25zdCBDaXR5SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhlYWRlcl9fY2l0eS1pdGVtXCIpO1xyXG5jb25zdCBGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlci1idG5cIik7XHJcblxyXG5cclxuXHJcbi8vINCR0YPRgNCz0LXRgCDQuCDQvNC10L3RjlxyXG5CdXJnZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRNZW51TW9iaWxlLmNsYXNzTGlzdC50b2dnbGUoJ29wZW5lZCcpO1xyXG5cdEJ1cmdlckJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuZWQnKTtcclxuXHREb2N1bWVudEJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuLW9uJyk7XHJcbn0pXHJcblxyXG4vLyDQktGL0LHQvtGAINCz0L7RgNC+0LTQsFxyXG5DaXR5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0Q2l0eUxpc3QuY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5lZFwiKTtcclxuXHRDdXJyZW50Q2l0eS5jbGFzc0xpc3QudG9nZ2xlKFwib3BlbmVkXCIpO1xyXG59KVxyXG5cclxuQ2l0eUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRDdXJyZW50Q2l0eS5pbm5lckhUTUwgPSBpdGVtLnRleHRDb250ZW50O1xyXG5cdH0pXHJcbn0pXHJcblxyXG4vLyDQpNC40LvRjNGC0YDRi1xyXG5cclxuRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgRmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXJcIik7XHJcblx0Y29uc3QgQnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlcl9fYnRuLWNsb3NlXCIpO1xyXG5cclxuXHREb2N1bWVudEJvZHkuY2xhc3NMaXN0LmFkZChcImhpZGRlbi1vblwiKTtcclxuXHRGaWx0ZXIuY2xhc3NMaXN0LmFkZChcImJsdWVyLW9uXCIpO1xyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRpZiAoZXZlbnQudGFyZ2V0ICE9IEZpbHRlciAmJiBldmVudC50YXJnZXQgIT0gQnRuQ2xvc2UpIHtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0RG9jdW1lbnRCb2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW4tb25cIik7XHJcblx0XHRcdEZpbHRlci5jbGFzc0xpc3QucmVtb3ZlKFwiYmx1ZXItb25cIik7XHJcblx0XHR9XHJcblx0fSlcclxufSlcclxuXHJcblxyXG5cclxuXHJcbi8vINCf0L7Qu9GD0YfQtdC90LjQtSDQtNCw0L3QvdGL0YUg0LjQtyBqc29uINGE0LDQudC70LBcclxuXHJcbmNvbnN0IGxvYWRQcm9kdWN0cyA9IGZ1bmN0aW9uIChxdWFudGl0eSA9IDgpIHtcclxuXHRmZXRjaChcIi4uL3Jlc291cnNlcy9kYXRhLmpzb25cIilcclxuXHRcdC50aGVuKGZ1bmN0aW9uIChhbnN3ZXIpIHtcclxuXHRcdFx0cmV0dXJuIGFuc3dlci5qc29uKCk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcblx0XHRcdC8vINCX0LDQv9C+0LvQvdC40YLRjCDRgdGC0YDQsNC90LjRhtGDINGC0L7QstCw0YDQsNC80LhcclxuXHRcdFx0Y29uc3QgcHJvZHVjdGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0aW9uLWl0ZW1zXCIpO1xyXG5cclxuXHRcdFx0cHJvZHVjdGlvbkl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHRsZXQgY291bnQgPSAwO1xyXG5cdFx0XHRcdGl0ZW0uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAoY291bnQgPCBxdWFudGl0eSAmJiBkYXRhW2ldLnR5cGUgPT0gaXRlbS5kYXRhc2V0LnR5cGUpIHtcclxuXHRcdFx0XHRcdFx0aXRlbS5pbm5lckhUTUwgKz0gYFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtICR7ZGF0YVtpXS5wb3B1bGFyfVwiIGRhdGEtaWQ9XCIke2RhdGFbaV0uaWR9XCI+XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByb2R1Y3Rpb24taXRlbV9faW1nXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7ZGF0YVtpXS5pbWd9XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByb2R1Y3Rpb24taXRlbV9fd3JhcHBlclwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGg1IGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtX190aXRsZVwiPiR7ZGF0YVtpXS50aXRsZX08L2g1PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJwcm9kdWN0aW9uLWl0ZW1fX2Rlc2NyXCI+JHtkYXRhW2ldLmRlc2NyaXB0aW9ufTwvcD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcm9kdWN0aW9uLWl0ZW1fX2JvdHRvbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwiYnRuLXJlc2V0IGJ0biBwcm9kdWN0aW9uLWl0ZW1fX2J0blwiIGRhdGEtYnRuPVwiJHtkYXRhW2ldLnRpdGxlfVwiPtCS0YvQsdGA0LDRgtGMPC9idXR0b24+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtX19wcmljZVwiPtC+0YIgJHtkYXRhW2ldLnByaWNlfSDigr08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRgO1xyXG5cdFx0XHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8g0JfQsNC/0L7Qu9C90LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0YLQvtCy0LDRgNCw0LzQuFxyXG5cclxuXHRcdFx0Ly/Qn9C+0LrQsNC30LDRgtGMINC60LDRgNGC0L7Rh9C60YMg0YLQvtCy0LDRgNCwXHJcblx0XHRcdGNvbnN0IFByb2RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0aW9uLWl0ZW1fX2J0blwiKTtcclxuXHJcblxyXG5cdFx0XHRQcm9kQnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKTtcclxuXHRcdFx0XHRcdGNvbnN0IHByb2RJdGVtID0gaXRlbS5jbG9zZXN0KFwiLnByb2R1Y3Rpb24taXRlbVwiKTtcclxuXHRcdFx0XHRcdGNvbnN0IHByb2RJdGVtcyA9IGl0ZW0uY2xvc2VzdChcIi5wcm9kdWN0aW9uLWl0ZW1zXCIpO1xyXG5cdFx0XHRcdFx0Ly8gY29uc3QgQnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlcl9fYnRuLWNsb3NlXCIpO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGNhcmRJbWcgPSBDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1nXCIpO1xyXG5cdFx0XHRcdFx0Y2FyZEltZy5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGNhcmRGb3JtVGl0bGUgPSBDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZm9ybS10aXRsZVwiKTtcclxuXHRcdFx0XHRcdGNhcmRGb3JtVGl0bGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0XHRcdFx0XHRjb25zdCBjYXJkRm9ybUJvdHRvbSA9IENhcmQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19mb3JtLWJvdHRvbVwiKTtcclxuXHRcdFx0XHRcdGNhcmRGb3JtQm90dG9tLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRpZiAocHJvZEl0ZW0uZGF0YXNldC5pZCA9PSBkYXRhW2ldLmlkICYmIHByb2RJdGVtcy5kYXRhc2V0LnR5cGUgPT0gZGF0YVtpXS50eXBlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNhcmRJbWcuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtkYXRhW2ldLmltZ31cIiBhbHQ9XCJJbWFnZSBQaXp6YVwiPmA7XHJcblx0XHRcdFx0XHRcdFx0Y2FyZEZvcm1UaXRsZS5pbm5lckhUTUwgPSBgJHtkYXRhW2ldLnRpdGxlfWA7XHJcblx0XHRcdFx0XHRcdFx0Y2FyZEZvcm1Cb3R0b20uaW5uZXJIVE1MID0gYFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkX19mb3JtLXRvdGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0XHTQmNGC0L7Qs9C+OiA8c3Bhbj4gJHtkYXRhW2ldLnByaWNlfTwvc3Bhbj4g4oK9XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmRfX2Zvcm0td2VpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj40MDA8L3NwYW4+INCzXHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIiBidG4tcmVzZXQgYnRuXCI+0JTQvtCx0LDQstC40YLRjDwvYnV0dG9uPmA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHREb2N1bWVudEJvZHkuY2xhc3NMaXN0LmFkZChcImhpZGRlbi1vblwiKTtcclxuXHRcdFx0XHRcdENhcmQuY2xhc3NMaXN0LmFkZChcImJsdWVyLW9uXCIpO1xyXG5cclxuXHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LnRhcmdldCAhPSBDYXJkIC8qJiYgZXZlbnQudGFyZ2V0ICE9IEJ0bkNsb3NlKi8pIHtcclxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHREb2N1bWVudEJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi1vblwiKTtcclxuXHRcdFx0XHRcdFx0XHRDYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJibHVlci1vblwiKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvL9Cf0L7QutCw0LfQsNGC0Ywg0LrQsNGA0YLQvtGH0LrRgyDRgtC+0LLQsNGA0LBcclxuXHJcblx0XHR9KTtcclxufTtcclxuXHJcbmxvYWRQcm9kdWN0cyg4KTtcclxuXHJcbi8vINCf0LvQsNCy0L3Ri9C5INC/0LXRgNC10YXQvtC0INC6INGP0LrQvtGA0Y/QvFxyXG5jb25zdCBhbmNob3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZpZ2F0aW9uX19pdGVtLWJ0blwiKTtcclxuXHJcbmFuY2hvcnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGNvbnN0IGlkID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIlwiICsgaWQpO1xyXG5cclxuXHRcdHRhcmdldC5zY3JvbGxJbnRvVmlldyh7XHJcblx0XHRcdGJlaGF2aW9yOiBcInNtb290aFwiLFxyXG5cdFx0XHRibG9jazogXCJzdGFydFwiXHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcbi8vINCf0LvQsNCy0L3Ri9C5INC/0LXRgNC10YXQvtC0INC6INGP0LrQvtGA0Y/QvFxyXG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
