$('.slider__list-big').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider__list-small',
    arrows: true,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slider__prev"></button>',
    nextArrow: '<button type="button" class="slider__next"></button>',

    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
            }
        },
        {
            breakpoint: 576,
            settings: {
                arrows: true,
            }
        },
    ]
});

$('.slider__list-small').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider__list-big',
    arrows: false,
    focusOnSelect: true,

});
