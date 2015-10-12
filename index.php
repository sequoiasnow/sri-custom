<?php
session_start();
require_once 'src/php/core/include-component.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Sri Arsls</title>

        <!-- Include the CSS -->
        <link rel="stylesheet" href="dist/css/main.css" type="text/css" />

        <!-- Include jQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

        <!-- Include specific components -->
        <script src="dist/js/plugins.js"></script>
        <script src="dist/js/page.js"></script>
    </head>
    <body>
        <div id="site-contianer">

            <section id="main-page">

                <?php include_component( 'title-block' ); ?>

                <?php include_component( 'contact' ); ?>

            </section> <!-- #main-page -->

        </div> <!-- #site-container -->

        <?php print_js(); ?>
    </body>
</html>
