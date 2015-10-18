<?php
$graph_data = get_data_custom( 'network-speeds' );

$description_data = get_data_global( 'network' );

add_js( "$componentdir/network.js" );


// Configure the graph data...
usort( $graph_data, function( $a, $b ) {
    if ( $a['value'] == $b['value'] ) {
        return 0;
    }

    return $a['value'] < $b['value'] ? 1 : -1;
});

$max_graph_val = $graph_data[0]['value'];

foreach ( $graph_data as $item ) {
    if ( $item['value'] > $max_graph_val ) $max_graph_val = $item['value'];
}
?>


<section id="network-graph-section" class="page-section">

    <div class="container-large">

        <div id="network-graph" style="position: relative; height: 500px; width: 500px;" chart-data='<?php print json_encode( $graph_data ); ?>' add-visible></div> <!-- #network-graph -->

        <div id="network-description">

            <?php print __m( $description_data[ 'description' ] ); ?>

        </div> <!-- #network-description -->

    </div> <!-- .container-large -->

</section> <!-- #network-graph -->
