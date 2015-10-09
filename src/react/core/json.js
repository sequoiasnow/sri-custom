module.exports =  function( fileURL, callback ) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open('GET', fileURL, true);

    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

        // .open will NOT return a value but simply returns undefined in async mode so use a callback
        callback( JSON.parse( xobj.responseText ) );

        }

    }
    xobj.send(null);
};
