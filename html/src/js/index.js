var burgerMenu = document.querySelector('.header__burger-menu');
var mobileMenu = document.querySelector('.header__list');
var close = document.querySelector('.header__close');
var filterButton = document.querySelector('.filters__title');
var filterForm = document.querySelector('.filters__form');
var filterName = document.querySelectorAll('.filters__name');
var filterSet = document.querySelectorAll('.filters__wrap');
var filterRange = document.querySelector('.filters__range');
var sliderImg = document.querySelectorAll('.slider__img');

if (burgerMenu) {
    burgerMenu.addEventListener('click', function(){
        mobileMenu.classList.add('header__list--show');
        burgerMenu.classList.toggle('header__burger-menu--none');
        close.classList.add('header__close--show');
    });   
}

if (close) {
    close.addEventListener('click', function(){
        mobileMenu.classList.remove('header__list--show');
        close.classList.remove('header__close--show');
        burgerMenu.classList.toggle('header__burger-menu--none');
    });
}

if (filterButton) {
    filterButton.addEventListener('click', function(){
        filterButton.classList.toggle('filters__title--open');
        filterForm.classList.toggle('filters__form--show');
    });
}

if (filterName) {
    for (var i=0; i<filterName.length; i++) {
        filterName[i].addEventListener('click', function(){
            this.classList.toggle('filters__name--open');
            this.nextSibling.classList.toggle('filters__wrap--show');
        });
    }
}

if (window.innerWidth < 768) {
    for (var i = 0; i < sliderImg.length; i++) {
        sliderImg[i].style.height = sliderImg[i].offsetWidth * 1,1;
    }
}




