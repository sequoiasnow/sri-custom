var React = require( 'react' );
var getData = require( '../core/data' );


var NavLink = React.createClass({
    componentWillMount: function() {

        if ( typeof this.props.data !== 'undefined' ) {
            for ( var key in this.props.data ) {
                if ( ! this.props.hasOwnProperty( key ) ) {
                    this.props[ key ] = this.props.data[ key ];
                }
            }
        }

        console.log( this.props );
    },


    render: function() {
        return (
            <li className="nav-element">
                <span className="title">{this.props.title}</span>
            </li>
        )
    }
});

module.exports = NavLink;
