/* TRISITE CSS 4.0       */
/* (C) 2023 TRISITE      */
/* Pageing jQuery add-on */

$(function() {
    $('.pageing').attr('aria-label', 'pagination');

    $('.pageing > li > :not(a)').each(function(){
        $(this).attr('aria-hidden', true);

        if ( !isNaN($(this).text()) ){
            $(this).attr('aria-current', 'page');
        }
    });

    $('.pageing > :not(li, a)').each(function(){
        $(this).attr('aria-hidden', true);

        if ( !isNaN($(this).text()) ){
            $(this).attr('aria-current', 'page');
        }
    });
});
