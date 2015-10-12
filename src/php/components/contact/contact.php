<?php
// Set some default variables.
$data = get_data_global( 'contact' );

add_js( "$componentdir/contact.js" );

$id = uniqid();

// A random hash generated to disallow spaming.
$random_hash = bin2hex(openssl_random_pseudo_bytes(16));
$_SESSION[ "contact__identity_hash--$id" ] = $random_hash;

?>

<section id="contact" class="page-section">

    <section class="container">

        <h1 class="title">Contact</h1>



        <form id="contact-form" method="post" action="<?php echo "$componentdir/form-recieve.php" ?>">
            <input type="hidden" name="identity_hash" value="<?php print $random_hash; ?>" />
            <input type="hidden" name="form_id" value="<?php print $id; ?>" />

            <input class="input-element" type="text" name="name" placeholder="Name" required />
            <input class="input-element" type="email" name="email" placeholder="Email" required />

            <textarea class="input-element" name="message" placeholder="Message"></textarea>

            <div id="contact-send"><span>Send</span></div>

        </form> <!-- #contact-form -->

    </section>

</section> <!-- #contact -->
