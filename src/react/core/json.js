var fs = require( 'fs' );

module.exports =  function( fileURL ) {
    return JSON.parse( fs.readFileSync( fileURL , 'utf8' ) );
};
