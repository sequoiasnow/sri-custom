<?php
include_once __DIR__ '/../../core/functions.php';

// Send the email with a post request, ensure authentication from that page,
// this is stored in $_SERVER and passed as a hidden variable in the form.

if ( in_array( $_SERVER[ component_name() . '__identity_hashs' ], $_POST[ 'identity_hash' ] ) ) {
    // Confirmation ok... good to go.

    // Unset that hash, so it can never be used again
    $_SERVER[ component_name() . '__identity_hashs' ] = array_diff( $_SERVER[ component_name() . '__identity_hashs' ], $_POST[ 'identity_hash' ] ) );

    // Get information about the contact individual.
    $contact_data = get_data_global( 'contact' );

    // Send confirmation of email being sent to the adress provided.
    $confirmation_email_txt = get_php_templat( '_confirmation-email.tpl.php', array(
        'name'    => $_POST['name'],
        'email'   => $_POST['email'],
    ));

    // Send message as html email.
    $headers  = "From: " . strip_tags($contact_data['email']) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    mail( $_POST['email'], 'Thank You For Your Message!', $confirmation_email_txt, $headers );

    // Send an email to the provided email with the message.
    $admin_email_txt = get_php_templat( '_admin-email.tpl.php', array(
        'message' => $_POST[ 'message' ],
        'name'    => $_POST['name'],
        'email'   => $_POST['email'],
    ));

    mail( $contact_data['email'], "New Comment From {$_POST['name']}", $admin_email_txt, null );



} else {
    // Inform people of inproper emailing method.
    echo "Please use the provided contact form to send an email...";
}
