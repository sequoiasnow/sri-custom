var getJson = require( './json' );

var dataProps = function() {
    if ( typeof this.props.data !== 'undefined' ) {
        for ( var propName in this.props.data ) {
            this.props[ propName ] = this.props.data[ propName ];
        }
    } else if ( typeof this.props.src !== 'undefined' ) {

        getJson( this.props.src, function( r ) {
            this.props.data = r
        }.bind( this ) );

        dataProps.call( this );
    } else if ( typeof this.props.data === 'undefined' ) {
        this.props.data = [];
    }
};



module.exports = dataProps;
