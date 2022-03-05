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
