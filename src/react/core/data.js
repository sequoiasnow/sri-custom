var getJson = require( './json' );

var dataProps = function() {
    if ( typeof this.props.data !== 'undefined' ) {
        for ( var propName in this.props.data ) {
            this.props[ propName ] = this.props.data[ propName ];
        }
    } else if ( typeof this.props.src !== 'undefined' ) {
        this.props.data = getJson( this.props.src );

        dataProps.call( this );
    }
};



module.exports = dataProps;
