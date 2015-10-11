<?php require_once 'src/php/core/include-component.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <title>Sri Arsls</title>

        <!-- Include the CSS -->
        <link rel="stylesheet" href="dist/css/main.css" type="text/css" />

        <!-- Include jQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

        <!-- Include specific components -->
        <script src="dist/js/variables.js"></script>
        <script src="dist/js/plugins.js"></script>
        <script src="dist/js/elements.js"></script>
        <script src="dist/js/page.js"></script>
    </head>
    <body>
        <div id="site-contianer">

            <section id="nav-bar-container">

                <?php include_component( 'nav-bar' ); ?>

            </section> <!-- #nav-bar-container -->

            <section id="main-page">

                <section id="title-block" class="page-section">

                    <?php /* include_component( 'title-block' ); */ ?>

                </section> <!-- #title-block -->

                <section id="contact-block" class="page-section">

                    <?php include_component( 'contact' ); ?>

                </section> <!-- #contact-block -->

            </section> <!-- #main-page -->

        </div> <!-- #site-container -->

        <?php print_js(); ?>
    </body>
</html>
