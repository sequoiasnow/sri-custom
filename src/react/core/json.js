module.exports =  function( fileURL, callback ) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open('GET', fileURL, true);

    xobj.onreadystatechange = function () {
        if ( xobj.readyState == 4 && xobj.status == "200") {

            callback( JSON.parse( xobj.responseText ) );

        } else if ( xobj.status != "200" ) {
            console.log( 'Error in accessing ' + xobj.responseText + ' provided.' );
            console.log( 'state: ' + xobj.readyState );
            console.log( 'status: ' + xobj.status );
        }
    }
    xobj.send(null);
};
