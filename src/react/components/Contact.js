var React = require( 'react' );
var getJson = require( '../core/json' );

var Contact = React.createClass({

    componentDidMount: function() {
        if ( typeof this.props.data === 'undefined' ) {
            this.props.data = [];
        }

        if ( this.props.data.length == 0 && this.props.src !== 'undefined' ) {
            getJson( this.props.src, function( r ) {
                this.props.data = r;
                this.forceUpdate();
            }.bind( this ) );
        }

        for ( var key in data ) {
            if ( ! this.props.hasOwnProperty( key ) ) {
                this.props[ key ] = data[ key ];
            }
        }
    },

    render: function() {
        return (
            <section className="contact-container">

                <span className="title">Contact</span>

                <span className="slogan">{this.props.slogan}</span>

                <section className="information">

                    <article className="location">
                        <span className="value">{this.props.location}</span>
                    </article>

                    <article className="email">
                        <span className="value">{this.props.email}</span>
                    </article>

                    <article className="phone">
                        <span className="value">{this.props.phone}</span>
                    </article>

                </section>

                <form className="contact-form">

                    <input type="text" placeholder="Name" name="name" required />

                    <input type="email" placeholder="Email" name="email" required />

                    <textarea name="message" placeholder="Message" required></textarea>

                    <input type="submit" value="Send" />

                </form>

            </section>
        )
    }
});
