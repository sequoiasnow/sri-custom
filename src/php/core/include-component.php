<?php
include_once 'functions.php';

/**
 * Includes a component and specifies the data types as passed to this component.
 *
 * The sepecification of the types that are passed to this component comes from
 * that components, data-specification.php file
 */
function include_component( $component_name ) {
    $componentdir = "src/php/components/{$component_name}";
    if ( ! file_exists( "{$componentdir}/{$component_name}.php" ) ) { return; }

    include "{$componentdir}/{$component_name}.php";
}
