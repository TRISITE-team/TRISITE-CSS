/* TRISITE CSS 4.0   */
/* (C) 2023 TRISITE  */
/* Nav jQuery add-on */

$(function() {
    // Menu
    let lastInnerWidth = window.innerWidth;
    let scrollBar = window.innerWidth - $(window).width();
    const behavior  = $('html').css('scroll-behavior');
    const menuTransition = 400;
    let bodyScrollY;
    const bodyTop = Number($('body').css('top').replace('px', ''));

    navInit();

    $(window).on('resize', function(){
        if ( lastInnerWidth != window.innerWidth ){
            if ( $('.menu-trigger').prop('open') ){
                $('html').removeClass('open');
                $('#nav-cover').fadeOut('fast');
                $('.main-menu').attr('aria-hidden', true);
                $('.menu-trigger').prop('open', false);
            }

            navInit();
            lastInnerWidth = window.innerWidth;
        }

        scrollBar = window.innerWidth - $(window).width();
    });

    $('#nav-cover, .main-menu').on('click', function(){
        if ( $('.menu-trigger').prop('open') ){
            navClose();
        }
    });

    $('.menu-trigger summary').on('click', function(event){
        if ( $('.menu-trigger summary').is(':visible') ){
            if ( $('.menu-trigger').prop('open') ){
                event.preventDefault();
                navClose();
            }else{
                navOpen();
            }
        }
    });

    function navInit(){
        if ( $('.menu-trigger summary').is(':visible') ){
            $('.menu-trigger').prop('open', false);
            $('.main-menu').attr('aria-hidden', true);
        }else{
            $('.menu-trigger').prop('open', true);
            $('.main-menu').attr('aria-hidden', false);
        }
    }

    function navOpen(){
        bodyScrollY = $(window).scrollTop();

        if ( scrollBar == 0 ){
            $('html').addClass('no-scroll');
        }

        $('html').addClass('open').css('scroll-behavior', 'auto');
        $('body').css('top', bodyTop - bodyScrollY);
        $('#nav-cover').fadeIn('fast');
        $('.main-menu').attr('aria-hidden', false);
    }

    function navClose(){
        $('.menu-trigger').addClass('close');
        $('html').removeClass('open').removeClass('no-scroll');
        $('#nav-cover').fadeOut('fast');
        $('.main-menu').attr('aria-hidden', true);
        $('body').css('top', bodyTop);
        $(window).scrollTop(bodyScrollY);
        $('html').css('scroll-behavior', behavior);

        setTimeout(function(){
            if ( $('.menu-trigger summary').is(':visible') ){
                $('.menu-trigger').prop('open', false);
            }
            $('.menu-trigger').removeClass('close');
        },menuTransition);
    }
});

