<?php
$data = get_data_global( 'title-block' );
extract( $data );

add_js( "$componentdir/title-block.js" );
?>

<section id="title-block" class="page-section">

    <section class="container center-singlular-vertically">

        <article class="content">

            <div class="title-container">
                <span class="title"><?php print $title; ?></span>
            </div> <!-- .title-container -->

            <?php if ( isset( $slogan ) ) : ?>

                <div class="slogan-container">
                    <span class="slogan"><?php print $slogan; ?></span>
                </div> <!-- .slogan-container -->

            <?php endif; ?>

            <footer>

                <button scroll-to-next>Learn More</button>

            </footer>

        </article> <!-- .content -->


    </section> <!-- .contianer -->

</section> <!-- .page-section -->
