var React = require( 'react' );
var getData = require( '../core/data' );


var NavLink = React.createClass({
    componentDidMount: function() {
        getData.call( this );

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
