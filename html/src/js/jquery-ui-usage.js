$(window).on('load', function () {
    $('.filters__range').slider({
        max: 280,
        min: 0,
        range: true,
        values: [40, 240],
        slide: function(event, ui) {
            $('.filters__range-min').val('$' + ui.values[0]);
            $('.filters__range-max').val('$' + ui.values[1]);
        }
    });

    $('.filters__range-min').on('mousemove change', function() {         
        $('.filters__range').slider('values', 0, $(this).val());
    });

    $('.filters__range-max').on('mousemove change', function() {         
        $('.filters__range').slider('values', 1, $(this).val());
    });
});