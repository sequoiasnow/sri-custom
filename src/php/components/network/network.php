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

        <div id="network-graph" class="circle-chart" style="position: relative; height: 500px; width: 500px;" chart-data='<?php print json_encode( $graph_data ); ?>'>

        </div> <!-- #network-graph -->

        <div id="network-description">

            <?php print __m( $description_data[ 'description' ] ); ?>

        </div> <!-- #network-description -->

    </div> <!-- .container-large -->

</section> <!-- #network-graph -->
