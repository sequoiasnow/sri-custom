<?php
session_start();
include_once __DIR__ . '/../../core/functions.php';

// Check if the proper post terms are their...

print_r( $_POST );

if ( ! ( isset( $_POST['email'] )
      && isset( $_POST['name'] )
      && isset( $_POST['message'] )
      && isset( $_POST['form_id'] )
      && isset( $_POST['identity_hash'] ) ) ) {
    exit(); // The form was not filled out correctly
}



// Send the email with a post request, ensure authentication from that page,
// this is stored in $_SESSION and passed as a hidden variable in the form.

if ( isset( $_SESSION[ "contact__identity_hash--{$_POST['form_id']}" ] ) && $_POST[ 'identity_hash' ] === $_SESSION[ "contact__identity_hash--{$_POST['form_id']}" ] ) {
    // Confirmation ok... good to go.
    echo "Confirmation ok";

    // Get information about the contact individual.
    $contact_data = get_data_global( 'contact' );

    // Send confirmation of email being sent to the adress provided.
    $confirmation_email_txt = get_php_template( '_confirmation-email.tpl.php', array(
        'name'    => $_POST['name'],
        'email'   => $_POST['email'],
    ));

    // Send message as html email.
    $headers  = "From: " . strip_tags($contact_data['email']) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    mail( $_POST['email'], 'Thank You For Your Message!', $confirmation_email_txt, $headers );

    // Send an email to the provided email with the message.
    $admin_email_txt = get_php_template( '_admin-email.tpl.php', array(
        'message' => $_POST[ 'message' ],
        'name'    => $_POST['name'],
        'email'   => $_POST['email'],
    ));

    mail( $contact_data['email'], "New Comment From {$_POST['name']}", $admin_email_txt, null );



} else {
    // Inform people of inproper emailing method.
    echo "Please use the provided contact form to send an email...";
}
