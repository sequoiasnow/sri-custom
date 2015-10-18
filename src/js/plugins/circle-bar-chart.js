(function( $ ) {
    /**
     * Plugin for the creation of a circular bar chart.
     *
     * Copyright Sequpia Snow 2015
     */

    /**
     * Some default variables that can be overriden globally that define the
     * function.
     */
    $.circleCharDefaults = {
        lineThickness: 25,
        lineColors: [
            'red',
            'green',
            'blue',
            'orange',
            '#B6B6B4',
            'purple',
            'aqua',
            'yellow',
            'cyan',
            'iridium',
            'beer',
            'rust'
        ],
        maxArcVal:  300,
        centerRadius: 50,
        backgroundColor: '#FFFFFF'
    };

    /**
     * The actual plugin to draw the chart.
     */
    $.fn.circleChart = function( overrides, data ) {
        if (typeof data === 'undefined') {
            // Access the data from the element itself.
            if (this.attr('chart-data')) {
                // Set the data to json encoded in the object.
                data = JSON.parse(this.attr('chart-data'));
            } else {
                // There is no data to create the chart
                console.log('Error, no chart data provided');
                return this;
            }
        }

        // Ovverride default setting values
        var settings = $.circleCharDefaults;
        if ( typeof overrides === 'object' ) {
            settings =  (function objectMerge( orig, over ) {
            	for ( var key in over ) {
            		if ( orig.hasOwnProperty( key ) ) {

            			if ( typeof over[key] === 'object' ) {
            				orig[ key ] = objectMerge( orig[key], over[key] );
            			} else {
            				orig[ key ] = over[key];
            			}
            		}
            	}
            	return orig;
            })( settings, overrides );
        }

        // Clear out child elements.
        this.html('');

        // Rotate for proper orientation.
        this.css({
            '-webkit-transform': 'rotate(90deg)',
            '-ms-transform': 'rotate(90deg)',
            '-o-transform': 'rotate(90deg)',
            'transform': 'rotate(90deg)'
        });

        var overlay = $( '<div></div>', { class: 'text-layer' } );
        overlay.css({
            'width': '100%',
            'height': '100%',
            'left': 0,
            'top': 0,
            'position': 'absolute',
            'z-index': '10',

            '-webkit-transform': 'rotate(-90deg)',
            '-ms-transform': 'rotate(-90deg)',
            '-o-transform': 'rotate(-90deg)',
            'transform': 'rotate(-90deg)'
        });

        this.append( overlay );

        var height = this.height();
        var width  = this.width();

        var arcs = [];

        // Default center arc...
        arcs.push({
            r: settings.centerRadius,
            percent: 1,
            color: settings.backgroundColor
        });

        // Some globals.
        var center = {
            x: width / 2,
            y: height / 2
        };

        maxDataValue = (function( data ) {
            var mv = data[0].value;
            for ( var i = 0; i < data.length; i++ ) {
                if ( data[ i ].value > mv ) { mv = data[ i ].value; }
            }
            return mv;
        })( data );



        // Start defining the arcs.
        for ( var i = 0; i < data.length; i++ ) {
            var arcData = data[i];

            arcs.push({
                r: ((i + 1) * settings.lineThickness) + (settings.centerRadius),
                percent: arcData.value / maxDataValue,
                color: ( arcData.hasOwnProperty( 'color' ) ) ? arcData.color : settings.lineColors[i],
                title: arcData.title
            });
        }

        arcs = arcs.sort(function( a, b ) {
            if (a.r < b.r)
                return 1;
            if (a.r > b.r)
                return -1;
            return 0;
        });

        for (var i = 0; i < arcs.length; i++) {
            // Draw each individual arc.
            var arc = arcs[i];

            var arcDiv = $( '<div></div>', { class: 'arc' } );

            arcDiv.css({
                'border-radius': '50%',
                'background-color': arc.color,

                'width': arc.r * 2 + 'px',
                'height': arc.r * 2 + 'px',

                'position': 'absolute',
                'left': width / 2 - arc.r + 'px',
                'top': height / 2 - arc.r + 'px'
            });

            this.append( arcDiv );

            if ( arc.hasOwnProperty( 'title' ) && arc.title.length ) {

                var arcLabel = $( '<div></div>', { class: 'label' } );

                arcLabel.css({
                    'position': 'absolute',
                    'text-align': 'right',
                    'top': 'calc(50% - '+arc.r+'px)',
                    'right': '50%',
                    'font-size': settings.lineThickness * 0.6 + 'px',
                    'padding-right': '6px'
                });

                arcLabel.html( arc.title );

                overlay.append( arcLabel );
            }

            // Overlay div should be slightly overlapping
            arc.r += 1;

            var overlayDivOne = $( '<div></div>', { class: 'overlay' } );

            overlayDivOne.css({
                'background-color': settings.backgroundColor,
                'border-radius': arc.r * 2 + 'px ' + arc.r * 2 + 'px 0 0',

                // Transform origion
                '-webkit-transform-origin': '50% 100%',
                '-ms-transform-origin': '50% 100%',
                'o-transform-origin': '50% 100%',
                'transform-origin': '50% 100%',

                'width': arc.r * 2 + 'px',
                'height': arc.r + 'px',

                'position': 'absolute',
                'left': width / 2 - arc.r + 'px',
                'top': height / 2 - arc.r + 'px'
            })

            this.append( overlayDivOne );

            // Allow for transitioning if so desired
            overlayDivOne.css({
                '-webkit-transform': 'rotate('+ arc.percent * settings.maxArcVal +'deg)',
                '-ms-transform': 'rotate('+ arc.percent * settings.maxArcVal +'deg)',
                '-o-transform': 'rotate('+ arc.percent * settings.maxArcVal +'deg)',
                'transform': 'rotate('+ arc.percent * settings.maxArcVal +'deg)'
            });

            if ( arc.percent * settings.maxArcVal <= 180 ) {
                var overlayDivTwo = overlayDivOne.clone();
                this.append( overlayDivTwo );

                overlayDivTwo.css({
                    '-webkit-transform': 'rotate(180deg)',
                    '-ms-transform': 'rotate(180deg)',
                    '-o-transform': 'rotate(180deg)',
                    'transform': 'rotate(180deg)'
                });

            }

            if ( arc.percent * settings.maxArcVal > 270 ) {
                var arcDivTwo = arcDiv.clone();

                arc.r -= 0;

                arcDivTwo.css({
                    'border-radius': arc.r * 2 + 'px ' + arc.r * 2 + 'px 0 0',

                    'width': arc.r * 2 + 'px',
                    'height': arc.r + 'px',

                    'left': width / 2 - arc.r - 1 + 'px',
                    'top': height / 2 - arc.r - 1 + 'px'
                });

                this.append( arcDivTwo );
            }
        }

        return this;
    }

})( jQuery );


/**
 * Automatically activate the plugin with a class
 */
jQuery(document).ready(function($) {
    $( '.circle-chart[chart-data]' ).each(function() {

        $( this ).circleChart();
    });
});
