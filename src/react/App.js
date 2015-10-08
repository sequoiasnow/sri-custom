var React  = require( 'react' );
var NavLink = require( './components/NavLink' )
var NavBar = require( './components/NavBar' );

var App = React.createClass({
    componentDidMount: function() { console.log( 'App Loaded' ); },

    render: function() {
        return (
            <NavLink title="Test" link="test-link"></NavLink>
        )
    }
});

module.exports = App;
