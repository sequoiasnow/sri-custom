<?php
include_once __DIR__ . '/../plugins/Parsedown.php';

/**
 * Prints a string in an html encoded manner.
 */
function __( $stirng = '' ) {
    return htmlentities( $stirng );
}

/**
 * Prints a string as rendered in markdown.
 */
function __m( $string = '' ) {
    return (new Parsedown)->text( $string );
}

/**
 * Gets all data from a certain data type.
 */
function get_data_type( $name ) {
    $data_file = "data/types/{$name}.json";
    if ( file_exists( $data_file ) ) {
        return json_decode( file_get_contents( $data_file ), true );
    }
}


/**
 * Gets all the data from a certain data global.
 */
function get_data_global( $name ) {
    $data_file = "data/globals/{$name}.json";
    if ( file_exists( $data_file ) ) {
        $data = json_decode( file_get_contents( $data_file ), true );

        return $data;
    }
}

/**
 * Returnes a directly json decoded custom data file.
 */
function get_data_custom( $name ) {
    $data_file = "data/custom/{$name}.json";
    if ( file_exists( $data_file ) ) {
        return json_decode( file_get_contents( $data_file ), true );
    } else {
        return 'file not found';
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

/**
 * Loads a php file as a template, all variables passed will be provided. As
 * well as all of the functions in the functions.php file.
 */
function get_php_template( $file, $args = array() ) {
    if ( file_exists( $file ) ) {
        foreach ( $args as $var_name => $value ) {
            $$var_name = $value;
        }

        ob_start();
        include $file;
        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }
}

/**
 * Returns the relative path to an image.
 */
function get_image_path( $image ) {

    if ( 0 !== strpos( $image, "data/images/" ) && 0 !== strpos( $image, 'http' ) ) {
        return "data/images/$image";
    }
}

/**
 * Renders an image into a full tag.
 */
function render_image( $image ) {
    $image = get_image_path( $image );
return <<<TAG
<img src="{$image}" />
TAG;
}

/**
 * Shows the
 */
function style_bgimage( $image ) {
    $image = get_image_path( $image );
    return "style=\"background-image: url({$image});\"";
}
