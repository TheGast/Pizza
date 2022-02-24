const BurgerBtn = document.querySelector(".burger");
const MenuMobile = document.querySelector(".mobile-nav");
const DocumentBody = document.querySelector("body");

BurgerBtn.addEventListener("click", function(){
	MenuMobile.classList.toggle('opened');
	BurgerBtn.classList.toggle('opened');
	DocumentBody.classList.toggle('hidden-on');
})