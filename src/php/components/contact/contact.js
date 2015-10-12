jQuery( document ).ready(function( $ ) {

var validationClasses = {
    validated: "validated",
    nonValidated: "not-validated"
}


// Validates the contact form using javsacript and then ajaxs the request.
$( '#contact #contact-send' ).click(function() {
    // Validate the contact form, for each item
    var passesValidation = true;


    var data = {};

    $( '#contact form#contact-form .input-element' ).each(function() {
        var regexMatched = true;

        if ( $(this).attr( 'type' ) == 'email' ) {
            regexMatched = $( this ).val().match( /^[\w\.-]+@[\w\.-]+$/i );
        }

        if ( $( this ).val() && regexMatched ) {
            $( this ).removeClass( 'not-validated' );
            $( this ).addClass( 'validated' );

            data[ $( this ).attr( 'name' ) ] = $( this ).val();
        } else {
            $( this ).removeClass( 'validated' );
            $( this ).addClass( 'not-validated' );

            passesValidation = false;
        }
    });

    // Add all hidden input values
    $( '#contact form#contact-form input[type=hidden]' ).each(function() {
        data[ $( this ).attr( 'name' ) ] = $( this ).val();
    });

    if ( passesValidation ) {
        // Send the ajax request.
        $.ajax({
            type: "POST",
            url: $( '#contact-form' ).attr( 'action' ),
            data: data
        }).done(function( res ) {

            console.log( res );

            $( '#contact-form' ).addClass('submitted');

            var removeSubmitted = function() {
                $( '#contact-form' ).removeClass( 'submitted' );

                $( '#contact-form .input-element' ).unbind( 'change', removeSubmitted );
            }

            $( '#contact-form .input-element' ).bind( 'change', removeSubmitted );

            // Remove all the information concerning the contact form. To allow for next request
            $( '#contact-form .input-element' ).each(function() {
                $( this ).val( '' );
            });
        });
    }

});

});
