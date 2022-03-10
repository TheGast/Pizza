const BurgerBtn = document.querySelector(".burger");
const MenuMobile = document.querySelector(".mobile-nav");
const DocumentBody = document.querySelector("body");
const CitySelect = document.querySelector(".header__city");
const CityList = document.querySelector(".header__city-list");
const CurrentCity = document.querySelector(".header__current-city");
const CityItems = document.querySelectorAll(".header__city-item");
const FilterButtons = document.querySelectorAll(".filter-btn");



// Бургер и меню
BurgerBtn.addEventListener("click", function () {
	MenuMobile.classList.toggle('opened');
	BurgerBtn.classList.toggle('opened');
	DocumentBody.classList.toggle('hidden-on');
})
// Бургер и меню

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
// Выбор города

// Фильтры
FilterButtons.forEach(function (item) {
	item.addEventListener("click", function () {
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
		});
	});
});
// Фильтры

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

// Развернуть/свернуть секцию faq
const faqBtn = document.querySelector(".faq__btn");
const faqTextWrapper = document.querySelector(".faq__text-wrapper");

if (faqBtn) {
	faqBtn.addEventListener("click", function () {
		faqTextWrapper.classList.toggle("open");
	});
}
// Развернуть/свернуть секцию faq


// модальное окно логина
const btnLogin = document.querySelector(".header__btn-login");
const modal = document.querySelector(".modals");
const modalClose = document.querySelector(".modal-close");
const modalLogin = document.querySelector(".modal-login");

btnLogin.addEventListener("click", function () {
	modal.classList.add("is-open");
	DocumentBody.classList.add("hidden-on");

	document.addEventListener("click", function (event) {
		if (event.target != modalClose && event.target != modal) {
			event.stopPropagation();
		}
		else {
			DocumentBody.classList.remove("hidden-on");
			modal.classList.remove("is-open");
		}
	});
});
// модальное окно логина

// свернуть/развернуть заказ
const order = document.querySelector(".order");

if (order) {
	const orderItem = document.querySelectorAll(".order__item");

	orderItem.forEach(function (item) {
		const generalInfo = item.querySelector(".general-info");
		const orderItemWrapper = item.querySelector(".order__item-wrapper");
		const wrapperHeight = orderItemWrapper.scrollHeight;

		generalInfo.addEventListener("click", function () {
			if (orderItemWrapper.classList.contains("is-open")) {
				orderItemWrapper.classList.remove("is-open");
				generalInfo.classList.remove("is-open");
				orderItemWrapper.style.height = 0;
			}
			else {
				orderItemWrapper.classList.add("is-open");
				generalInfo.classList.add("is-open");
				orderItemWrapper.style.height = wrapperHeight + "px";
			}
		});
	});

}

// свернуть/развернуть заказ

// табы
const tabs = document.querySelector(".tabs");

if (tabs) {
	const tabsNavigationItem = document.querySelectorAll(".tabs__navigation-item");
	const tabsContentItem = document.querySelectorAll(".tabs__content-item");

	console.log(tabsNavigationItem);
	console.log(tabsContentItem);

	tabsNavigationItem.forEach(function (item) {

		item.addEventListener("click", function () {
			const itemAttribute = item.getAttribute("data-tabs-nav");

			tabsNavigationItem.forEach(function (item) {
				item.classList.remove("active");
				if (item.getAttribute("data-tabs-nav") == itemAttribute) {
					item.classList.add("active");
				}
			});

			tabsContentItem.forEach(function (item) {
				item.classList.remove("is-open");
				if (item.getAttribute("data-tabs-content") == itemAttribute) {
					item.classList.add("is-open");
				}
			});

		});
	});

	// изменение персональных данных
	const settingsItemBtn=document.querySelectorAll(".settings__item-btn");

	settingsItemBtn.forEach(function(item){
		item.addEventListener("click", function(){
			const settingsItemStatic = item.closest(".settings__item-static");
			settingsItemStatic.style.display = "none";

			const settingsItem = item.closest(".settings__item");
			const settingsItemChange = settingsItem.querySelector(".settings__item-change")
			settingsItemChange.style.display = "block";
		});
	
	});
	// изменение персональных данных

}
// табы

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQnVyZ2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbmNvbnN0IE1lbnVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vYmlsZS1uYXZcIik7XHJcbmNvbnN0IERvY3VtZW50Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG5jb25zdCBDaXR5U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2NpdHlcIik7XHJcbmNvbnN0IENpdHlMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX2NpdHktbGlzdFwiKTtcclxuY29uc3QgQ3VycmVudENpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fY3VycmVudC1jaXR5XCIpO1xyXG5jb25zdCBDaXR5SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhlYWRlcl9fY2l0eS1pdGVtXCIpO1xyXG5jb25zdCBGaWx0ZXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5maWx0ZXItYnRuXCIpO1xyXG5cclxuXHJcblxyXG4vLyDQkdGD0YDQs9C10YAg0Lgg0LzQtdC90Y5cclxuQnVyZ2VyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0TWVudU1vYmlsZS5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuZWQnKTtcclxuXHRCdXJnZXJCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbmVkJyk7XHJcblx0RG9jdW1lbnRCb2R5LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbi1vbicpO1xyXG59KVxyXG4vLyDQkdGD0YDQs9C10YAg0Lgg0LzQtdC90Y5cclxuXHJcbi8vINCS0YvQsdC+0YAg0LPQvtGA0L7QtNCwXHJcbkNpdHlTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRDaXR5TGlzdC5jbGFzc0xpc3QudG9nZ2xlKFwib3BlbmVkXCIpO1xyXG5cdEN1cnJlbnRDaXR5LmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuZWRcIik7XHJcbn0pXHJcblxyXG5DaXR5SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdEN1cnJlbnRDaXR5LmlubmVySFRNTCA9IGl0ZW0udGV4dENvbnRlbnQ7XHJcblx0fSlcclxufSlcclxuLy8g0JLRi9Cx0L7RgCDQs9C+0YDQvtC00LBcclxuXHJcbi8vINCk0LjQu9GM0YLRgNGLXHJcbkZpbHRlckJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnN0IEZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyXCIpO1xyXG5cdFx0Y29uc3QgQnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlcl9fYnRuLWNsb3NlXCIpO1xyXG5cclxuXHRcdERvY3VtZW50Qm9keS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuLW9uXCIpO1xyXG5cdFx0RmlsdGVyLmNsYXNzTGlzdC5hZGQoXCJibHVlci1vblwiKTtcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudC50YXJnZXQgIT0gRmlsdGVyICYmIGV2ZW50LnRhcmdldCAhPSBCdG5DbG9zZSkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdERvY3VtZW50Qm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuLW9uXCIpO1xyXG5cdFx0XHRcdEZpbHRlci5jbGFzc0xpc3QucmVtb3ZlKFwiYmx1ZXItb25cIik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59KTtcclxuLy8g0KTQuNC70YzRgtGA0YtcclxuXHJcbi8vINCf0L7Qu9GD0YfQtdC90LjQtSDQtNCw0L3QvdGL0YUg0LjQtyBqc29uINGE0LDQudC70LBcclxuXHJcbmNvbnN0IGxvYWRQcm9kdWN0cyA9IGZ1bmN0aW9uIChxdWFudGl0eSA9IDgpIHtcclxuXHRmZXRjaChcIi4uL3Jlc291cnNlcy9kYXRhLmpzb25cIilcclxuXHRcdC50aGVuKGZ1bmN0aW9uIChhbnN3ZXIpIHtcclxuXHRcdFx0cmV0dXJuIGFuc3dlci5qc29uKCk7XHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcblx0XHRcdC8vINCX0LDQv9C+0LvQvdC40YLRjCDRgdGC0YDQsNC90LjRhtGDINGC0L7QstCw0YDQsNC80LhcclxuXHRcdFx0Y29uc3QgcHJvZHVjdGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0aW9uLWl0ZW1zXCIpO1xyXG5cclxuXHRcdFx0cHJvZHVjdGlvbkl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHRsZXQgY291bnQgPSAwO1xyXG5cdFx0XHRcdGl0ZW0uaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAoY291bnQgPCBxdWFudGl0eSAmJiBkYXRhW2ldLnR5cGUgPT0gaXRlbS5kYXRhc2V0LnR5cGUpIHtcclxuXHRcdFx0XHRcdFx0aXRlbS5pbm5lckhUTUwgKz0gYFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtICR7ZGF0YVtpXS5wb3B1bGFyfVwiIGRhdGEtaWQ9XCIke2RhdGFbaV0uaWR9XCI+XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByb2R1Y3Rpb24taXRlbV9faW1nXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7ZGF0YVtpXS5pbWd9XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByb2R1Y3Rpb24taXRlbV9fd3JhcHBlclwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGg1IGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtX190aXRsZVwiPiR7ZGF0YVtpXS50aXRsZX08L2g1PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHAgY2xhc3M9XCJwcm9kdWN0aW9uLWl0ZW1fX2Rlc2NyXCI+JHtkYXRhW2ldLmRlc2NyaXB0aW9ufTwvcD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcm9kdWN0aW9uLWl0ZW1fX2JvdHRvbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwiYnRuLXJlc2V0IGJ0biBwcm9kdWN0aW9uLWl0ZW1fX2J0blwiIGRhdGEtYnRuPVwiJHtkYXRhW2ldLnRpdGxlfVwiPtCS0YvQsdGA0LDRgtGMPC9idXR0b24+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicHJvZHVjdGlvbi1pdGVtX19wcmljZVwiPtC+0YIgJHtkYXRhW2ldLnByaWNlfSDigr08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRgO1xyXG5cdFx0XHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8g0JfQsNC/0L7Qu9C90LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0YLQvtCy0LDRgNCw0LzQuFxyXG5cclxuXHRcdFx0Ly/Qn9C+0LrQsNC30LDRgtGMINC60LDRgNGC0L7Rh9C60YMg0YLQvtCy0LDRgNCwXHJcblx0XHRcdGNvbnN0IFByb2RCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9kdWN0aW9uLWl0ZW1fX2J0blwiKTtcclxuXHJcblxyXG5cdFx0XHRQcm9kQnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKTtcclxuXHRcdFx0XHRcdGNvbnN0IHByb2RJdGVtID0gaXRlbS5jbG9zZXN0KFwiLnByb2R1Y3Rpb24taXRlbVwiKTtcclxuXHRcdFx0XHRcdGNvbnN0IHByb2RJdGVtcyA9IGl0ZW0uY2xvc2VzdChcIi5wcm9kdWN0aW9uLWl0ZW1zXCIpO1xyXG5cdFx0XHRcdFx0Ly8gY29uc3QgQnRuQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlcl9fYnRuLWNsb3NlXCIpO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGNhcmRJbWcgPSBDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1nXCIpO1xyXG5cdFx0XHRcdFx0Y2FyZEltZy5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGNhcmRGb3JtVGl0bGUgPSBDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZm9ybS10aXRsZVwiKTtcclxuXHRcdFx0XHRcdGNhcmRGb3JtVGl0bGUuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0XHRcdFx0XHRjb25zdCBjYXJkRm9ybUJvdHRvbSA9IENhcmQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19mb3JtLWJvdHRvbVwiKTtcclxuXHRcdFx0XHRcdGNhcmRGb3JtQm90dG9tLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRpZiAocHJvZEl0ZW0uZGF0YXNldC5pZCA9PSBkYXRhW2ldLmlkICYmIHByb2RJdGVtcy5kYXRhc2V0LnR5cGUgPT0gZGF0YVtpXS50eXBlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNhcmRJbWcuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtkYXRhW2ldLmltZ31cIiBhbHQ9XCJJbWFnZSBQaXp6YVwiPmA7XHJcblx0XHRcdFx0XHRcdFx0Y2FyZEZvcm1UaXRsZS5pbm5lckhUTUwgPSBgJHtkYXRhW2ldLnRpdGxlfWA7XHJcblx0XHRcdFx0XHRcdFx0Y2FyZEZvcm1Cb3R0b20uaW5uZXJIVE1MID0gYFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkX19mb3JtLXRvdGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0XHTQmNGC0L7Qs9C+OiA8c3Bhbj4gJHtkYXRhW2ldLnByaWNlfTwvc3Bhbj4g4oK9XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhcmRfX2Zvcm0td2VpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj40MDA8L3NwYW4+INCzXHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIiBidG4tcmVzZXQgYnRuXCI+0JTQvtCx0LDQstC40YLRjDwvYnV0dG9uPmA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHREb2N1bWVudEJvZHkuY2xhc3NMaXN0LmFkZChcImhpZGRlbi1vblwiKTtcclxuXHRcdFx0XHRcdENhcmQuY2xhc3NMaXN0LmFkZChcImJsdWVyLW9uXCIpO1xyXG5cclxuXHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LnRhcmdldCAhPSBDYXJkIC8qJiYgZXZlbnQudGFyZ2V0ICE9IEJ0bkNsb3NlKi8pIHtcclxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHREb2N1bWVudEJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi1vblwiKTtcclxuXHRcdFx0XHRcdFx0XHRDYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJibHVlci1vblwiKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvL9Cf0L7QutCw0LfQsNGC0Ywg0LrQsNGA0YLQvtGH0LrRgyDRgtC+0LLQsNGA0LBcclxuXHJcblx0XHR9KTtcclxufTtcclxuXHJcbmxvYWRQcm9kdWN0cyg4KTtcclxuXHJcbi8vINCf0LvQsNCy0L3Ri9C5INC/0LXRgNC10YXQvtC0INC6INGP0LrQvtGA0Y/QvFxyXG5jb25zdCBhbmNob3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZpZ2F0aW9uX19pdGVtLWJ0blwiKTtcclxuXHJcbmFuY2hvcnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGNvbnN0IGlkID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIlwiICsgaWQpO1xyXG5cclxuXHRcdHRhcmdldC5zY3JvbGxJbnRvVmlldyh7XHJcblx0XHRcdGJlaGF2aW9yOiBcInNtb290aFwiLFxyXG5cdFx0XHRibG9jazogXCJzdGFydFwiXHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcbi8vINCf0LvQsNCy0L3Ri9C5INC/0LXRgNC10YXQvtC0INC6INGP0LrQvtGA0Y/QvFxyXG5cclxuLy8g0KDQsNC30LLQtdGA0L3Rg9GC0Ywv0YHQstC10YDQvdGD0YLRjCDRgdC10LrRhtC40Y4gZmFxXHJcbmNvbnN0IGZhcUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmFxX19idG5cIik7XHJcbmNvbnN0IGZhcVRleHRXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXFfX3RleHQtd3JhcHBlclwiKTtcclxuXHJcbmlmIChmYXFCdG4pIHtcclxuXHRmYXFCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGZhcVRleHRXcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuXCIpO1xyXG5cdH0pO1xyXG59XHJcbi8vINCg0LDQt9Cy0LXRgNC90YPRgtGML9GB0LLQtdGA0L3Rg9GC0Ywg0YHQtdC60YbQuNGOIGZhcVxyXG5cclxuXHJcbi8vINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQu9C+0LPQuNC90LBcclxuY29uc3QgYnRuTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fYnRuLWxvZ2luXCIpO1xyXG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxzXCIpO1xyXG5jb25zdCBtb2RhbENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC1jbG9zZVwiKTtcclxuY29uc3QgbW9kYWxMb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtbG9naW5cIik7XHJcblxyXG5idG5Mb2dpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cdG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJpcy1vcGVuXCIpO1xyXG5cdERvY3VtZW50Qm9keS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuLW9uXCIpO1xyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRpZiAoZXZlbnQudGFyZ2V0ICE9IG1vZGFsQ2xvc2UgJiYgZXZlbnQudGFyZ2V0ICE9IG1vZGFsKSB7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdERvY3VtZW50Qm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuLW9uXCIpO1xyXG5cdFx0XHRtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtb3BlblwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcbi8vINC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3QviDQu9C+0LPQuNC90LBcclxuXHJcbi8vINGB0LLQtdGA0L3Rg9GC0Ywv0YDQsNC30LLQtdGA0L3Rg9GC0Ywg0LfQsNC60LDQt1xyXG5jb25zdCBvcmRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3JkZXJcIik7XHJcblxyXG5pZiAob3JkZXIpIHtcclxuXHRjb25zdCBvcmRlckl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yZGVyX19pdGVtXCIpO1xyXG5cclxuXHRvcmRlckl0ZW0uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG5cdFx0Y29uc3QgZ2VuZXJhbEluZm8gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuZ2VuZXJhbC1pbmZvXCIpO1xyXG5cdFx0Y29uc3Qgb3JkZXJJdGVtV3JhcHBlciA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi5vcmRlcl9faXRlbS13cmFwcGVyXCIpO1xyXG5cdFx0Y29uc3Qgd3JhcHBlckhlaWdodCA9IG9yZGVySXRlbVdyYXBwZXIuc2Nyb2xsSGVpZ2h0O1xyXG5cclxuXHRcdGdlbmVyYWxJbmZvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChvcmRlckl0ZW1XcmFwcGVyLmNsYXNzTGlzdC5jb250YWlucyhcImlzLW9wZW5cIikpIHtcclxuXHRcdFx0XHRvcmRlckl0ZW1XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xyXG5cdFx0XHRcdGdlbmVyYWxJbmZvLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1vcGVuXCIpO1xyXG5cdFx0XHRcdG9yZGVySXRlbVdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRvcmRlckl0ZW1XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJpcy1vcGVuXCIpO1xyXG5cdFx0XHRcdGdlbmVyYWxJbmZvLmNsYXNzTGlzdC5hZGQoXCJpcy1vcGVuXCIpO1xyXG5cdFx0XHRcdG9yZGVySXRlbVdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gd3JhcHBlckhlaWdodCArIFwicHhcIjtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59XHJcblxyXG4vLyDRgdCy0LXRgNC90YPRgtGML9GA0LDQt9Cy0LXRgNC90YPRgtGMINC30LDQutCw0LdcclxuXHJcbi8vINGC0LDQsdGLXHJcbmNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYnNcIik7XHJcblxyXG5pZiAodGFicykge1xyXG5cdGNvbnN0IHRhYnNOYXZpZ2F0aW9uSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFic19fbmF2aWdhdGlvbi1pdGVtXCIpO1xyXG5cdGNvbnN0IHRhYnNDb250ZW50SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFic19fY29udGVudC1pdGVtXCIpO1xyXG5cclxuXHRjb25zb2xlLmxvZyh0YWJzTmF2aWdhdGlvbkl0ZW0pO1xyXG5cdGNvbnNvbGUubG9nKHRhYnNDb250ZW50SXRlbSk7XHJcblxyXG5cdHRhYnNOYXZpZ2F0aW9uSXRlbS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcblxyXG5cdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRjb25zdCBpdGVtQXR0cmlidXRlID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhYnMtbmF2XCIpO1xyXG5cclxuXHRcdFx0dGFic05hdmlnYXRpb25JdGVtLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0aWYgKGl0ZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS10YWJzLW5hdlwiKSA9PSBpdGVtQXR0cmlidXRlKSB7XHJcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRhYnNDb250ZW50SXRlbS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcblx0XHRcdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtb3BlblwiKTtcclxuXHRcdFx0XHRpZiAoaXRlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhYnMtY29udGVudFwiKSA9PSBpdGVtQXR0cmlidXRlKSB7XHJcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoXCJpcy1vcGVuXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdC8vINC40LfQvNC10L3QtdC90LjQtSDQv9C10YDRgdC+0L3QsNC70YzQvdGL0YUg0LTQsNC90L3Ri9GFXHJcblx0Y29uc3Qgc2V0dGluZ3NJdGVtQnRuPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2V0dGluZ3NfX2l0ZW0tYnRuXCIpO1xyXG5cclxuXHRzZXR0aW5nc0l0ZW1CdG4uZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdGNvbnN0IHNldHRpbmdzSXRlbVN0YXRpYyA9IGl0ZW0uY2xvc2VzdChcIi5zZXR0aW5nc19faXRlbS1zdGF0aWNcIik7XHJcblx0XHRcdHNldHRpbmdzSXRlbVN0YXRpYy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG5cdFx0XHRjb25zdCBzZXR0aW5nc0l0ZW0gPSBpdGVtLmNsb3Nlc3QoXCIuc2V0dGluZ3NfX2l0ZW1cIik7XHJcblx0XHRcdGNvbnN0IHNldHRpbmdzSXRlbUNoYW5nZSA9IHNldHRpbmdzSXRlbS5xdWVyeVNlbGVjdG9yKFwiLnNldHRpbmdzX19pdGVtLWNoYW5nZVwiKVxyXG5cdFx0XHRzZXR0aW5nc0l0ZW1DaGFuZ2Uuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHRcdH0pO1xyXG5cdFxyXG5cdH0pO1xyXG5cdC8vINC40LfQvNC10L3QtdC90LjQtSDQv9C10YDRgdC+0L3QsNC70YzQvdGL0YUg0LTQsNC90L3Ri9GFXHJcblxyXG59XHJcbi8vINGC0LDQsdGLXHJcblxyXG4iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
