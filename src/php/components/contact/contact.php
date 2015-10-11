<?php
// Set some default variables.
$data = get_data_global( 'contact' );

add_js( "$componentdir/contact.js" );

?>

<section id="contact">

    <section class="container">

        <h1 class="title">Contact</h1>



        <form id="contact-form" method="post" action="<?php echo "$componentdir/form-recieve.php" ?>">


            <input class="input-element" type="text" name="name" placeholder="Name" required />
            <input class="input-element" type="email" name="email" placeholder="Email" required />

            <textarea class="input-element" name="message" placeholder="Message"></textarea>

            <div id="contact-send"><span>Send</span></div>

        </form> <!-- #contact-form -->

    </section>

</section> <!-- #contact -->
