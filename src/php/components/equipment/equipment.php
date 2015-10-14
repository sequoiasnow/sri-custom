<?php
$data = get_data_type( 'equipment-category' );
?>

<section id="equipment" class="page-section">

    <section id="equipment-categories">

        <?php foreach ( $data as $category ) : extract( $category ); ?>

            <article class="category">


                <?php if ( isset( $link ) ) : ?><a href="<?php print $link; ?>"><?php endif; ?>

                    <div class="icon-container">
                        <span class="fa fa-<?php print $icon; ?>"></span>
                    </div> <!-- .icon-container -->

                <?php if ( isset( $link ) ) : ?></a><?php endif; ?>

                <div class="name">
                    <span><?php print __( $name ); ?></span>
                </div> <!-- .name -->

                <div class="description">
                    <span><?php print __( $description ); ?></span>
                </div> <!-- .description -->

            </article> <!-- .category -->

        <?php endforeach; ?>

    </section>

</section> <!-- #equipment -->
