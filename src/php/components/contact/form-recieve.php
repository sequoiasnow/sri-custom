<?php
include_once __DIR__ '../../core/functions.php';

// Send the email with a post request, ensure authentication from that page,
// this is stored in $_SERVER and passed as a hidden variable in the form.

if ( $_SERVER[ component_name() . '__identity_hash' ] == $_POST[ 'identity_hash' ] ) {
    // Confirmation ok... good to go.
} else {
    // Inform people of inproper emailing method.
    echo "Please use the provided contact form to send the email...";
}
