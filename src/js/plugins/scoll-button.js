(function($) {

    $.scrollTo = function( selector, time ) {
        if ( typeof time === undefined ) {
            time = 1000;
        }

        var element = selector;

        if ( ! selector instanceof jQuery ) {
            element = $( selector );
        }

        if ( element.length > 1 ) {
            element = $( element[0] );
        }

        $("html, body").animate({ scrollTop: element.offset().top }, time);
    }

})(jQuery);


/**
 * Work with the scroll to functionality for the various types of button.
 */
jQuery(document).ready(function($) {

    $( 'button [scroll-to-next], .button[scroll-to-next]' ).on( 'click', function() {

        var scrollTo = $( this ).closest( '.page-section' ).next( '.page-section' );

        $.scrollTo ( scrollTo );

    });

    $( '.button[scroll-to], button[scroll-to]' ).on( 'click', function() {
        var scrollToString = $( this ).attr( 'scroll-to' );

        $.scrollTo( scrollToString );
    });

});
