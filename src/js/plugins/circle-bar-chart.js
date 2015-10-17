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
        lineThickness: 10,
        lineColors: [
            'red',
            'green',
            'blue',
            'orange',
            'tomatoe',
            'purple',
            'red',
            'green',
            'blue',
            'orange',
            'tomatoe',
            'purple'
        ],
        maxArcVal:  300,
        centerRadius: 20
    };

    /**
     * The actual plugin to draw the chart.
     */
    $.fn.circleChart = function( data, overrides ) {
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

        // Create the canvas element within the object.
        var canvas = $('<canvas height="500px" width="500px" class="chart-canvas"></canvas>');

        canvas.css({
            position: 'absolute',
            left: '0',
            right: '0'
        });

        this.append(canvas);

        // Refresh the canvas..
        canvas = this.find( 'canvas.chart-canvas' );
        // Get the context from the canvas, as well as other variables.
        var ctx = canvas[0].getContext('2d');
        ctx.scale(2,2);

        var height = canvas.height();
        var width = canvas.width();

        var arcs = [];

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
                r: (i * settings.lineThickness) + (settings.centerRadius),
                percent: arcData.value / maxDataValue,
                color: ( arcData.hasOwnProperty( 'color' ) ) ? arcData.color : settings.lineColors[i],
                title: arcData.title
            });
        }



        function draw() {
            for (var i = 0; i < arcs.length; i++) {
                // Draw each individual arc.
                var arc = arcs[i];

                ctx.beginPath();

                ctx.arc( center.x / 2, center.y / 2, arc.r, 0, arc.percent * settings.maxArcVal, false );

                console.log( arc.percent * settings.maxArcVal );

                ctx.lineWidth   = settings.lineThickness;



                ctx.strokeStyle = arc.color;
                ctx.stroke();

            }
        }

        draw();


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
