$(document).ready(function() {
    $('#print').on('click', function() {
         window.print();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#toTop').fadeIn(500);               
        } else {
            $('#toTop').fadeOut(500);
        }           
    });
      
    $('#toTop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });
 
    $('.daily-ration').affix({
        offset: {
            top: 600         
        }
    }); 

    $('.btn-hide-limits').click(function() {
        $('.panel-limits').slideToggle(function(){
            if ($('.panel-limits').is(':visible')) {
                $('.btn-hide-limits').html('<i class="fa fa-chevron-up"></i>');
            } else {
                $('.btn-hide-limits').html('<i class="fa fa-chevron-down"></i>');
            }
        });           
    }); 

    $(".btn-type-filter, .btn-reset-filters").click(function() {    
        $('button').removeClass("btn-type-filter-active"); 
        $(this).addClass("btn-type-filter-active");
    }); 
});
