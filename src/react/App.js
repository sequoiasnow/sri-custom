var React  = require( 'react' );
var NavLink = require( './components/NavLink' )
var NavBar = require( './components/NavBar' );

var App = React.createClass({
    componentDidMount: function() { console.log( 'App Loaded' ); },

    render: function() {
        return (
            <NavBar src="/data/types/NavLink.json"></NavBar>
        )
    }
});

module.exports = App;
