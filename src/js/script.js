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
