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

					Card.innerHTML = "";

					for (let i = 0; i < data.length; i++) {
						if (prodItem.dataset.id == data[i].id && prodItems.dataset.type == data[i].type) {
							Card.innerHTML = `
								<div class="card__wrapper">
									<div class="card__img">
										<img src="${data[i].img}" alt="Image Pizza">
									</div>
									<form class="card__form" action="">
										<h4 class="card__form-title">${data[i].title}</h4>

										<div class="card__form-item card-item">

											<label class="card-checkbox">
												<input class="card-checkbox__input" type="checkbox" checked>
												<div class="card-checkbox__fake">
													<div class="card-checkbox__fake-img">
														<svg>
															<use xlink:href="img/sprite.svg#chiese"></use>
														</svg>
													</div>
													<span class="card-checkbox__fake-name">Моцарелла</span>
												</div>
												<svg class="card-checkbox__deleted">
													<use xlink:href="img/sprite.svg#deleted"></use>
												</svg>
											</label>

											<label class="card-checkbox">
												<input class="card-checkbox__input" type="checkbox" checked>
												<div class="card-checkbox__fake">
													<div class="card-checkbox__fake-img">
														<svg>
															<use xlink:href="img/sprite.svg#cucumber"></use>
														</svg>
													</div>
													<span class="card-checkbox__fake-name">Огурцы маринованные</span>
												</div>
												<svg class="card-checkbox__deleted">
													<use xlink:href="img/sprite.svg#deleted"></use>
												</svg>
											</label>

											<label class="card-checkbox">
												<input class="card-checkbox__input" type="checkbox" checked>
												<div class="card-checkbox__fake">
													<div class="card-checkbox__fake-img">
														<svg>
															<use xlink:href="img/sprite.svg#pepperoni"></use>
														</svg>
													</div>
													<span class="card-checkbox__fake-name">Пепперони</span>
												</div>
												<svg class="card-checkbox__deleted">
													<use xlink:href="img/sprite.svg#deleted"></use>
												</svg>
											</label>

											<label class="card-checkbox">
												<input class="card-checkbox__input" type="checkbox" checked>
												<div class="card-checkbox__fake">
													<div class="card-checkbox__fake-img">
														<svg>
															<use xlink:href="img/sprite.svg#sauce-stroke"></use>
														</svg>
													</div>
													<span class="card-checkbox__fake-name">Томатный соус</span>
												</div>
												<svg class="card-checkbox__deleted">
													<use xlink:href="img/sprite.svg#deleted"></use>
												</svg>
											</label>

										</div>

										<div class="card__form-item card-item card-item--radio">

											<label class="card-radio">
												<input class="card-radio__input" type="radio" name="dough_type" value="traditional" checked>
												<div class="card-radio__fake">
													Традиционное
												</div>
											</label>

											<label class="card-radio">
												<input class="card-radio__input" type="radio" name="dough_type" value="slim">
												<div class="card-radio__fake">
													Тонкое
												</div>
											</label>

										</div>

										<div class="card__form-item card-item card-item--radio">

											<label class="card-radio">
												<input class="card-radio__input" type="radio" name="size" value="20" checked>
												<div class="card-radio__fake">
													20 см
												</div>
											</label>

											<label class="card-radio">
												<input class="card-radio__input" type="radio" name="size" value="28">
												<div class="card-radio__fake">
													28см
												</div>
											</label>

											<label class="card-radio">
												<input class="card-radio__input" type="radio" name="size" value="33">
												<div class="card-radio__fake">
													30см
												</div>
											</label>

										</div>

										<div class="card__form-item card-item card-item--add">
											<div class="card-item__title">Добавьте в пиццу</div>

											<div class="card-item__wrapper">
												<label class="card-checkbox">
													<input class="card-checkbox__input card-checkbox__input--add" type="checkbox">
													<div class="card-checkbox__fake">
														<div class="card-checkbox__fake-img card-checkbox__fake-img--add">
															<svg>
																<use xlink:href="img/sprite.svg#chiese"></use>
															</svg>
														</div>
														<span class="card-checkbox__fake-name">Моцарелла</span>
													</div>
													<svg class="card-checkbox__add">
														<use xlink:href="img/sprite.svg#add"></use>
													</svg>
													<span class="card-checkbox__price">59 ₽</span>
												</label>

												<label class="card-checkbox">
													<input class="card-checkbox__input card-checkbox__input--add" type="checkbox">
													<div class="card-checkbox__fake">
														<div class="card-checkbox__fake-img card-checkbox__fake-img--add">
															<svg>
																<use xlink:href="img/sprite.svg#mushroom"></use>
															</svg>
														</div>
														<span class="card-checkbox__fake-name">Шампиньоны</span>
													</div>
													<svg class="card-checkbox__add">
														<use xlink:href="img/sprite.svg#add"></use>
													</svg>
													<span class="card-checkbox__price">59 ₽</span>
												</label>

												<label class="card-checkbox">
													<input class="card-checkbox__input card-checkbox__input--add" type="checkbox">
													<div class="card-checkbox__fake">
														<div class="card-checkbox__fake-img card-checkbox__fake-img--add">
															<svg>
																<use xlink:href="img/sprite.svg#onion"></use>
															</svg>
														</div>
														<span class="card-checkbox__fake-name">Красный лук</span>
													</div>
													<svg class="card-checkbox__add">
														<use xlink:href="img/sprite.svg#add"></use>
													</svg>
													<span class="card-checkbox__price">59 ₽</span>
												</label>

												<label class="card-checkbox">
													<input class="card-checkbox__input card-checkbox__input--add" type="checkbox">
													<div class="card-checkbox__fake">
														<div class="card-checkbox__fake-img card-checkbox__fake-img--add">
															<svg>
																<use xlink:href="img/sprite.svg#pepper"></use>
															</svg>
														</div>
														<span class="card-checkbox__fake-name">Сладкий перец</span>
													</div>
													<svg class="card-checkbox__add">
														<use xlink:href="img/sprite.svg#add"></use>
													</svg>
													<span class="card-checkbox__price">59 ₽</span>
												</label>
											</div>

										</div>

										<div class="card__form-bottom">
											<div class="card__form-total">
												Итого: <span> ${data[i].price}</span> ₽
											</div>
											<div class="card__form-weight">
												<span>400</span> г
											</div>
											<button class=" btn-reset btn">Добавить</button>
										</div>

									</form>
								</div>
							`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQnVyZ2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbmNvbnN0IE1lbnVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vYmlsZS1uYXZcIik7XHJcbmNvbnN0IERvY3VtZW50Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG5jb25zdCBDaXR5U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2NpdHlcIik7XHJcbmNvbnN0IENpdHlMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2NpdHktbGlzdFwiKTtcclxuY29uc3QgQ3VycmVudENpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fY3VycmVudC1jaXR5XCIpO1xyXG5jb25zdCBDaXR5SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhlYWRlcl9fY2l0eS1pdGVtXCIpO1xyXG5jb25zdCBGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlci1idG5cIik7XHJcblxyXG5cclxuXHJcbi8vINCR0YPRgNCz0LXRgCDQuCDQvNC10L3RjlxyXG5CdXJnZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRNZW51TW9iaWxlLmNsYXNzTGlzdC50b2dnbGUoJ29wZW5lZCcpO1xyXG5cdEJ1cmdlckJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuZWQnKTtcclxuXHREb2N1bWVudEJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuLW9uJyk7XHJcbn0pXHJcblxyXG4vLyDQktGL0LHQvtGAINCz0L7RgNC+0LTQsFxyXG5DaXR5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0Q2l0eUxpc3QuY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5lZFwiKTtcclxuXHRDdXJyZW50Q2l0eS5jbGFzc0xpc3QudG9nZ2xlKFwib3BlbmVkXCIpO1xyXG59KVxyXG5cclxuQ2l0eUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRDdXJyZW50Q2l0eS5pbm5lckhUTUwgPSBpdGVtLnRleHRDb250ZW50O1xyXG5cdH0pXHJcbn0pXHJcblxyXG4vLyDQpNC40LvRjNGC0YDRi1xyXG5cclxuRmlsdGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgRmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXJcIik7XHJcblx0Y29uc3QgQnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlcl9fYnRuLWNsb3NlXCIpO1xyXG5cclxuXHREb2N1bWVudEJvZHkuY2xhc3NMaXN0LmFkZChcImhpZGRlbi1vblwiKTtcclxuXHRGaWx0ZXIuY2xhc3NMaXN0LmFkZChcImJsdWVyLW9uXCIpO1xyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRpZiAoZXZlbnQudGFyZ2V0ICE9IEZpbHRlciAmJiBldmVudC50YXJnZXQgIT0gQnRuQ2xvc2UpIHtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0RG9jdW1lbnRCb2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW4tb25cIik7XHJcblx0XHRcdEZpbHRlci5jbGFzc0xpc3QucmVtb3ZlKFwiYmx1ZXItb25cIik7XHJcblx0XHR9XHJcblx0fSlcclxufSlcclxuXHJcblxyXG5cclxuXHJcbi8vINCf0L7Qu9GD0YfQtdC90LjQtSDQtNCw0L3QvdGL0YUg0LjQtyBqc29uINGE0LDQudC70LBcclxuXHJcbmNvbnN0IGxvYWRQcm9kdWN0cyA9IGZ1bmN0aW9uIChxdWFudGl0eSA9IDgpIHtcclxuXHRmZXRjaChcIi4uL3Jlc291cnNlcy9kYXRhLmpzb25cIilcclxuXHRcdC50aGVuKGZ1bmN0aW9uIChhbnN3ZXIpIHtcclxuXHRcdFx0cmV0dXJuIGFuc3dlci5qc29uKCk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcblx0XHRcdC8vINCX0LDQv9C+0LvQvdC40YLRjCDRgdGC0YDQsNC90LjRhtGDINGC0L7QstCw0YDQsNC80LhcclxuXHRcdFx0Y29uc3QgcHJvZHVjdGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0aW9uLWl0ZW1zXCIpO1xyXG5cclxuXHRcdFx0cHJvZHVjdGlvbkl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHRsZXQgY291bnQgPSAwO1xyXG5cdFx0XHRcdGl0ZW0uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAoY291bnQgPCBxdWFudGl0eSAmJiBkYXRhW2ldLnR5cGUgPT0gaXRlbS5kYXRhc2V0LnR5cGUpIHtcclxuXHRcdFx0XHRcdFx0aXRlbS5pbm5lckhUTUwgKz0gYFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtICR7ZGF0YVtpXS5wb3B1bGFyfVwiIGRhdGEtaWQ9XCIke2RhdGFbaV0uaWR9XCI+XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByb2R1Y3Rpb24taXRlbV9faW1nXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7ZGF0YVtpXS5pbWd9XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByb2R1Y3Rpb24taXRlbV9fd3JhcHBlclwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGg1IGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtX190aXRsZVwiPiR7ZGF0YVtpXS50aXRsZX08L2g1PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJwcm9kdWN0aW9uLWl0ZW1fX2Rlc2NyXCI+JHtkYXRhW2ldLmRlc2NyaXB0aW9ufTwvcD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcm9kdWN0aW9uLWl0ZW1fX2JvdHRvbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwiYnRuLXJlc2V0IGJ0biBwcm9kdWN0aW9uLWl0ZW1fX2J0blwiIGRhdGEtYnRuPVwiJHtkYXRhW2ldLnRpdGxlfVwiPtCS0YvQsdGA0LDRgtGMPC9idXR0b24+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtX19wcmljZVwiPtC+0YIgJHtkYXRhW2ldLnByaWNlfSDigr08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRgO1xyXG5cdFx0XHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8g0JfQsNC/0L7Qu9C90LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0YLQvtCy0LDRgNCw0LzQuFxyXG5cclxuXHRcdFx0Ly/Qn9C+0LrQsNC30LDRgtGMINC60LDRgNGC0L7Rh9C60YMg0YLQvtCy0LDRgNCwXHJcblx0XHRcdGNvbnN0IFByb2RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0aW9uLWl0ZW1fX2J0blwiKTtcclxuXHJcblxyXG5cdFx0XHRQcm9kQnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKTtcclxuXHRcdFx0XHRcdGNvbnN0IHByb2RJdGVtID0gaXRlbS5jbG9zZXN0KFwiLnByb2R1Y3Rpb24taXRlbVwiKTtcclxuXHRcdFx0XHRcdGNvbnN0IHByb2RJdGVtcyA9IGl0ZW0uY2xvc2VzdChcIi5wcm9kdWN0aW9uLWl0ZW1zXCIpO1xyXG5cdFx0XHRcdFx0Ly8gY29uc3QgQnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlcl9fYnRuLWNsb3NlXCIpO1xyXG5cclxuXHRcdFx0XHRcdENhcmQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0aWYgKHByb2RJdGVtLmRhdGFzZXQuaWQgPT0gZGF0YVtpXS5pZCAmJiBwcm9kSXRlbXMuZGF0YXNldC50eXBlID09IGRhdGFbaV0udHlwZSkge1xyXG5cdFx0XHRcdFx0XHRcdENhcmQuaW5uZXJIVE1MID0gYFxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmRfX3dyYXBwZXJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmRfX2ltZ1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiJHtkYXRhW2ldLmltZ31cIiBhbHQ9XCJJbWFnZSBQaXp6YVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGZvcm0gY2xhc3M9XCJjYXJkX19mb3JtXCIgYWN0aW9uPVwiXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGg0IGNsYXNzPVwiY2FyZF9fZm9ybS10aXRsZVwiPiR7ZGF0YVtpXS50aXRsZX08L2g0PlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZF9fZm9ybS1pdGVtIGNhcmQtaXRlbVwiPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImNhcmQtY2hlY2tib3hcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY2FyZC1jaGVja2JveF9faW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19mYWtlLWltZ1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHN2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjY2hpZXNlXCI+PC91c2U+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2Zha2UtbmFtZVwiPtCc0L7RhtCw0YDQtdC70LvQsDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzdmcgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19kZWxldGVkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjZGVsZXRlZFwiPjwvdXNlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvbGFiZWw+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiY2FyZC1jaGVja2JveFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19pbnB1dFwiIHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19mYWtlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2Zha2UtaW1nXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNjdWN1bWJlclwiPjwvdXNlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJjYXJkLWNoZWNrYm94X19mYWtlLW5hbWVcIj7QntCz0YPRgNGG0Ysg0LzQsNGA0LjQvdC+0LLQsNC90L3Ri9C1PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHN2ZyBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2RlbGV0ZWRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNkZWxldGVkXCI+PC91c2U+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9sYWJlbD5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJjYXJkLWNoZWNrYm94XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2lucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2Zha2VcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZS1pbWdcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzdmc+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI3BlcHBlcm9uaVwiPjwvdXNlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJjYXJkLWNoZWNrYm94X19mYWtlLW5hbWVcIj7Qn9C10L/Qv9C10YDQvtC90Lg8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnIGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZGVsZXRlZFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2RlbGV0ZWRcIj48L3VzZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xhYmVsPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImNhcmQtY2hlY2tib3hcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY2FyZC1jaGVja2JveF9faW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19mYWtlLWltZ1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHN2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHVzZSB4bGluazpocmVmPVwiaW1nL3Nwcml0ZS5zdmcjc2F1Y2Utc3Ryb2tlXCI+PC91c2U+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2Zha2UtbmFtZVwiPtCi0L7QvNCw0YLQvdGL0Lkg0YHQvtGD0YE8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnIGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZGVsZXRlZFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2RlbGV0ZWRcIj48L3VzZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xhYmVsPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmRfX2Zvcm0taXRlbSBjYXJkLWl0ZW0gY2FyZC1pdGVtLS1yYWRpb1wiPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cImNhcmQtcmFkaW9cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY2FyZC1yYWRpb19faW5wdXRcIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwiZG91Z2hfdHlwZVwiIHZhbHVlPVwidHJhZGl0aW9uYWxcIiBjaGVja2VkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1yYWRpb19fZmFrZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdNCi0YDQsNC00LjRhtC40L7QvdC90L7QtVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvbGFiZWw+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiY2FyZC1yYWRpb1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3M9XCJjYXJkLXJhZGlvX19pbnB1dFwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJkb3VnaF90eXBlXCIgdmFsdWU9XCJzbGltXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLXJhZGlvX19mYWtlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx00KLQvtC90LrQvtC1XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9sYWJlbD5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkX19mb3JtLWl0ZW0gY2FyZC1pdGVtIGNhcmQtaXRlbS0tcmFkaW9cIj5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJjYXJkLXJhZGlvXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNhcmQtcmFkaW9fX2lucHV0XCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cInNpemVcIiB2YWx1ZT1cIjIwXCIgY2hlY2tlZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmQtcmFkaW9fX2Zha2VcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQyMCDRgdC8XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9sYWJlbD5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJjYXJkLXJhZGlvXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNhcmQtcmFkaW9fX2lucHV0XCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cInNpemVcIiB2YWx1ZT1cIjI4XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLXJhZGlvX19mYWtlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MjjRgdC8XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9sYWJlbD5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJjYXJkLXJhZGlvXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNhcmQtcmFkaW9fX2lucHV0XCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cInNpemVcIiB2YWx1ZT1cIjMzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLXJhZGlvX19mYWtlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MzDRgdC8XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9sYWJlbD5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkX19mb3JtLWl0ZW0gY2FyZC1pdGVtIGNhcmQtaXRlbS0tYWRkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1pdGVtX190aXRsZVwiPtCU0L7QsdCw0LLRjNGC0LUg0LIg0L/QuNGG0YbRgzwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWl0ZW1fX3dyYXBwZXJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiY2FyZC1jaGVja2JveFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2lucHV0IGNhcmQtY2hlY2tib3hfX2lucHV0LS1hZGRcIiB0eXBlPVwiY2hlY2tib3hcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2Zha2UtaW1nIGNhcmQtY2hlY2tib3hfX2Zha2UtaW1nLS1hZGRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHN2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNjaGllc2VcIj48L3VzZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZS1uYW1lXCI+0JzQvtGG0LDRgNC10LvQu9CwPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzdmcgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19hZGRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2FkZFwiPjwvdXNlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiY2FyZC1jaGVja2JveF9fcHJpY2VcIj41OSDigr08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvbGFiZWw+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJjYXJkLWNoZWNrYm94XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY2FyZC1jaGVja2JveF9faW5wdXQgY2FyZC1jaGVja2JveF9faW5wdXQtLWFkZFwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19mYWtlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZS1pbWcgY2FyZC1jaGVja2JveF9fZmFrZS1pbWctLWFkZFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI211c2hyb29tXCI+PC91c2U+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2Zha2UtbmFtZVwiPtCo0LDQvNC/0LjQvdGM0L7QvdGLPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzdmcgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19hZGRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI2FkZFwiPjwvdXNlPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiY2FyZC1jaGVja2JveF9fcHJpY2VcIj41OSDigr08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvbGFiZWw+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJjYXJkLWNoZWNrYm94XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiY2FyZC1jaGVja2JveF9faW5wdXQgY2FyZC1jaGVja2JveF9faW5wdXQtLWFkZFwiIHR5cGU9XCJjaGVja2JveFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWNoZWNrYm94X19mYWtlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZS1pbWcgY2FyZC1jaGVja2JveF9fZmFrZS1pbWctLWFkZFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI29uaW9uXCI+PC91c2U+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2Zha2UtbmFtZVwiPtCa0YDQsNGB0L3Ri9C5INC70YPQujwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnIGNsYXNzPVwiY2FyZC1jaGVja2JveF9fYWRkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNhZGRcIj48L3VzZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX3ByaWNlXCI+NTkg4oK9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xhYmVsPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiY2FyZC1jaGVja2JveFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2lucHV0IGNhcmQtY2hlY2tib3hfX2lucHV0LS1hZGRcIiB0eXBlPVwiY2hlY2tib3hcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX2Zha2UtaW1nIGNhcmQtY2hlY2tib3hfX2Zha2UtaW1nLS1hZGRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHN2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNwZXBwZXJcIj48L3VzZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiY2FyZC1jaGVja2JveF9fZmFrZS1uYW1lXCI+0KHQu9Cw0LTQutC40Lkg0L/QtdGA0LXRhjwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnIGNsYXNzPVwiY2FyZC1jaGVja2JveF9fYWRkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNhZGRcIj48L3VzZT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImNhcmQtY2hlY2tib3hfX3ByaWNlXCI+NTkg4oK9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xhYmVsPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZF9fZm9ybS1ib3R0b21cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkX19mb3JtLXRvdGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdNCY0YLQvtCz0L46IDxzcGFuPiAke2RhdGFbaV0ucHJpY2V9PC9zcGFuPiDigr1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmRfX2Zvcm0td2VpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPjQwMDwvc3Bhbj4g0LNcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIiBidG4tcmVzZXQgYnRuXCI+0JTQvtCx0LDQstC40YLRjDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9mb3JtPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0YDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdERvY3VtZW50Qm9keS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuLW9uXCIpO1xyXG5cdFx0XHRcdFx0Q2FyZC5jbGFzc0xpc3QuYWRkKFwiYmx1ZXItb25cIik7XHJcblxyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQudGFyZ2V0ICE9IENhcmQgLyomJiBldmVudC50YXJnZXQgIT0gQnRuQ2xvc2UqLykge1xyXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdERvY3VtZW50Qm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuLW9uXCIpO1xyXG5cdFx0XHRcdFx0XHRcdENhcmQuY2xhc3NMaXN0LnJlbW92ZShcImJsdWVyLW9uXCIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdC8v0J/QvtC60LDQt9Cw0YLRjCDQutCw0YDRgtC+0YfQutGDINGC0L7QstCw0YDQsFxyXG5cclxuXHRcdH0pO1xyXG59O1xyXG5cclxubG9hZFByb2R1Y3RzKDgpO1xyXG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
