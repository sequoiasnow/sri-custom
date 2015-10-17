<?php
$graph_data = get_data_custom( 'network-speeds' );

$max_graph_val = $graph_data[0]['value'];

foreach ( $graph_data as $item ) {
    if ( $item['value'] > $max_graph_val ) $max_graph_val = $item['value'];
}

$description_data = get_data_global( 'network' );
?>


<section id="network-graph-section" class="page-section">

    <div class="container-large">

        <div id="network-graph">

            <div class="title">
                <span><?php print $description_data['graph-name']; ?></span>
            </div>

            <div class="bars">

                <?php foreach ( $graph_data as $item ) : extract( $item ); ?>

                    <?php $percent = $value / $max_graph_val * 100; ?>

                    <div class="bar percentage-<?php print round( $percent ); ?>">

                        <span class="label"><?php print $title; ?>: <?php print $value; ?>kb/s</span>

                    </div> <!-- .bar -->

                <?php endforeach; ?>

            </div> <!-- .bars -->

        </div> <!-- #network-graph -->

        <div id="network-description">

            <?php print __m( $description_data[ 'description' ] ); ?>

        </div> <!-- #network-description -->

    </div> <!-- .container-large -->

</section> <!-- #network-graph -->
