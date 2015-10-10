var React   = require( 'react' );
var getJSON = require( '../core/json' );


var NavBar = React.createClass({
    // Set the initial state of data to an empty array, it iwll be loaded by ajax.
    getInitialState: function() {
        return { data: [] };
    },

    componentDidMount: function() {
        // Load the data from a json file.
        $.get( this.props.src, function( result ) {

            if (this.isMounted()) {
                this.setState({
                    data: result
                });
            }
        }.bind( this ) );
    },

    // Handle a click from the links, this often dispached to the page, rather than to the links themeselves.
    handleClick: function( i ) {
        if ( typeof this.props.linkClick !== undefined ) {
            var link = linkData[ i ].link;

            this.props.linkClick( link );
        }
    },

    render: function() {
        return (
            <section id="nav-bar">
                <ul className="nav-entries">
                    { /* Include the mapped entreis of data */ }
                    {this.state.data.map(function( linkData, i ) {
                        return (
                            <NavBar.NavLink onClick={this.handleClick.bind( this, i )} key={i} {...linkData} />
                        )
                    }, this )}

                    { /* Any other custom links are given less priority */ }
                    {this.props.children}
                </ul>
            </section>
        )
    }
});

/**
 * Simply the container for a  single link of the nav bar types.
 */
NavBar.NavLink = React.createClass({
    render: function() {
        return (
            <li className="nav-element">
                <span className="title">{this.props.title}</span>
            </li>
        )
    }
});


module.exports = NavBar;
