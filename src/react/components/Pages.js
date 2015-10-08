var React = require( 'react' );

var Pages = React.createClass({

    switchToPage: function( page ) {
        var pageId = page;
        if ( typeof page === 'string' ) {
            page =
        }
    },

    render: function() {
        return (
            <section class="pages">
                {this.props.children}
            </section>
        )
    }

});

module.exports = Pages;
