<?php
/**
 * Gets all data from a certain data type.
 */
function get_data_type( $type ) {
    $data_file = "data/types/{$type}.json";
    if ( file_exists( $data_file ) ) {
        return json_decode( file_get_contents( $data_file ) );
    }
}

/**
 * Gets all the data from a certain data global.
 */
function get_data_global( $from ) {
    $data_file = "data/globals/{$from}.json";
    if ( file_exists( $data_file ) ) {
        return json_decode( file_get_contents( $data_file ) );
    }
}


/**
 * Adds js that will later be printed.
 */
$data_js = array();

function add_js( $src ) {
    global $data_js;

    if ( ! in_array( $src, $data_js ) ) {
        $data_js[] = $src;
    }
}

/**
 * Print out all dynamically added javascript files...
 */
function print_js( ) {
    global $data_js;

    $data_js = array_map( function( $src ) {
        return '<script src="' . $src . '"></script>';
    }, $data_js );

    echo implode( $data_js, "\n\r" );
}
