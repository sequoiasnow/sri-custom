jQuery( document ).ready(function( $ ) {
    $( window ).on( 'resize', function() {
        // Check if the text must be resized;
        var text = $( '#title-block .container .title' );

        if ( text.width() / 0.8 > $( window ).width() ) {
            // Resize the font size to the proper amount.
            var newWidth = $( window ).width() * 0.8;

            // Reduce the font size to fit this size...
            var fontSize = parseInt( text.css( 'font-size' ), 10 );

            fontSize = fontSize / text.width() * newWidth;

            text.css( 'font-size', fontSize + 'px' );
        }
    });

    $( window ).resize();
});
