var React   = require( 'react' );
var NavLink = require( './NavLink' );
var getJSON = require( '../core/json' );


var NavBar = React.createClass({
    componentDidMount: function() {
        if ( typeof this.props.data === 'undefined' ) {
            this.props.data = [];
        }

        if ( typeof this.props.data === 'undefined' && typeof this.props.src !== 'undefined' ) {
            getJSON( this.props.src, function( r ) {
                this.props.data = r;

                console.log( r );
            }.bind( this ) );
        }
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
                    {this.props.data.map(function( linkData, i ) {
                        return (
                            <NavLink onClick={this.handleClick.bind( this, i )} data={linkData} key={i}></NavLink>
                        )
                    }, this )}
                </ul>
            </section>
        )
    }
});

module.exports = NavBar;
