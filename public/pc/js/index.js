$(function() {
    $go_top = $('.go_top');
    $search_input = $('.header .header_cont input');
    $article_min = $('.main .main_cont .main_cont_left .article .min');

    function top_isshow() {
        if ($(window).scrollTop() > 10) {
            $go_top.fadeIn(500);
        } else {
            $go_top.fadeOut(500);
        }
    };
    top_isshow();
    $(window).scroll(function(e) {
        top_isshow();
    });
    $go_top.click(function() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    });

    $search_input.focus(function() {
        $(this).animate({ 'background-color': '#fff', 'width': '400px' }, 500)
    }).blur(function() {
        $(this).animate({ 'background-color': '#f7f8fa', 'width': '300px' }, 500)
    });

    $article_min.click(function() {
        var $move = $(this).closest('.article');
        console.log($move.innerHeight())
        if ($move.innerHeight() == 200) {
            $(this).attr('src', '../img/up.png');
            $move.animate({ height: '500' }, 500)
        } else {
            $(this).attr('src', '../img/down.png');
            $move.animate({ height: '200' }, 500)
        }
    });
})