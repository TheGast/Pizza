const BurgerBtn = document.querySelector(".burger");
const MenuMobile = document.querySelector(".mobile-nav");
const DocumentBody = document.querySelector("body");
const CitySelect = document.querySelector(".header__city");
const CityList = document.querySelector(".header__city-list");
const CurrentCity = document.querySelector(".header__current-city");
const CityItems = document.querySelectorAll(".header__city-item");
const FilterButton = document.querySelector(".filter-btn");



// Бургер и меню
BurgerBtn.addEventListener("click", function(){
	MenuMobile.classList.toggle('opened');
	BurgerBtn.classList.toggle('opened');
	DocumentBody.classList.toggle('hidden-on');
})

// Выбор города
CitySelect.addEventListener("click", function(){
	CityList.classList.toggle("opened");
	CurrentCity.classList.toggle("opened");
})

CityItems.forEach(function(item){
	item.addEventListener("click", function(){
		CurrentCity.innerHTML=item.textContent;
	})
})

// Фильтры

FilterButton.addEventListener("click", function(){
	const Filter = document.querySelector(".filter");
	const FilterWrapper = document.querySelector(".filter__wrapper");
	const BtnClose = document.querySelector(".filter__btn-close");

	DocumentBody.classList.add("hidden-on");
	Filter.classList.add("bluer-on");

	document.addEventListener("click", function(event){
		if(event.target != Filter && event.target != BtnClose){
			event.stopPropagation();
		}
		else{
			DocumentBody.classList.remove("hidden-on");
			Filter.classList.remove("bluer-on");
		}
	})
})