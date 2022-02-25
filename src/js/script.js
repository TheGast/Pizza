const BurgerBtn = document.querySelector(".burger");
const MenuMobile = document.querySelector(".mobile-nav");
const DocumentBody = document.querySelector("body");
const CitySelect = document.querySelector(".header__city");
const CityList = document.querySelector(".header__city-list");
const CurrentCity = document.querySelector(".header__current-city");
const CityItems = document.querySelectorAll(".header__city-item");



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