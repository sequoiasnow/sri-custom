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

/**
 * author Christopher Blum
 *    - based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *    - forked from http://github.com/zuk/jquery.inview/
 */
(function (factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS
    module.exports = factory(require('jquery'));
  } else {
      // Browser globals
    factory(jQuery);
  }
}(function ($) {
  var inviewObjects = {}, viewportSize, viewportOffset,
      d = document, w = window, documentElement = d.documentElement, expando = $.expando, timer;

  $.event.special.inview = {
    add: function(data) {
      inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };

      // Use setInterval in order to also make sure this captures elements within
      // "overflow:scroll" elements or elements that appeared in the dom tree due to
      // dom manipulation and reflow
      // old: $(window).scroll(checkInView);
      //
      // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
      // intervals while the user scrolls. Therefore the inview event might fire a bit late there
      //
      // Don't waste cycles with an interval until we get at least one element that
      // has bound to the inview event.
      if (!timer && !$.isEmptyObject(inviewObjects)) {
         timer = setInterval(checkInView, 250);
      }
    },

    remove: function(data) {
      try { delete inviewObjects[data.guid + "-" + this[expando]]; } catch(e) {}

      // Clear interval when we no longer have any elements listening
      if ($.isEmptyObject(inviewObjects)) {
         clearInterval(timer);
         timer = null;
      }
    }
  };

  function getViewportSize() {
    var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };

    // if this is correct then return it. iPad has compat Mode, so will
    // go into check clientHeight/clientWidth (which has the wrong value).
    if (!size.height) {
      mode = d.compatMode;
      if (mode || !$.support.boxModel) { // IE, Gecko
        domObject = mode === 'CSS1Compat' ?
          documentElement : // Standards
          d.body; // Quirks
        size = {
          height: domObject.clientHeight,
          width:  domObject.clientWidth
        };
      }
    }

    return size;
  }

  function getViewportOffset() {
    return {
      top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
      left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
    };
  }

  function checkInView() {
    var $elements = [], elementsLength, i = 0;

    $.each(inviewObjects, function(i, inviewObject) {
      var selector  = inviewObject.data.selector,
          $element  = inviewObject.$element;
      $elements.push(selector ? $element.find(selector) : $element);
    });

    elementsLength = $elements.length;
    if (elementsLength) {
      viewportSize   = viewportSize   || getViewportSize();
      viewportOffset = viewportOffset || getViewportOffset();

      for (; i<elementsLength; i++) {
        // Ignore elements that are not in the DOM tree
        if (!$.contains(documentElement, $elements[i][0])) {
          continue;
        }

        var $element      = $($elements[i]),
            elementSize   = { height: $element.height(), width: $element.width() },
            elementOffset = $element.offset(),
            inView        = $element.data('inview'),
            visiblePartX,
            visiblePartY,
            visiblePartsMerged;

        // Don't ask me why because I haven't figured out yet:
        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
        // Even though it sounds weird:
        // It seems that the execution of this function is interferred by the onresize/onscroll event
        // where viewportOffset and viewportSize are unset
        if (!viewportOffset || !viewportSize) {
          return;
        }

        if (elementOffset.top + elementSize.height > viewportOffset.top &&
            elementOffset.top < viewportOffset.top + viewportSize.height &&
            elementOffset.left + elementSize.width > viewportOffset.left &&
            elementOffset.left < viewportOffset.left + viewportSize.width) {
          visiblePartX = (viewportOffset.left > elementOffset.left ?
            'right' : (viewportOffset.left + viewportSize.width) < (elementOffset.left + elementSize.width) ?
            'left' : 'both');
          visiblePartY = (viewportOffset.top > elementOffset.top ?
            'bottom' : (viewportOffset.top + viewportSize.height) < (elementOffset.top + elementSize.height) ?
            'top' : 'both');
          visiblePartsMerged = visiblePartX + "-" + visiblePartY;
          if (!inView || inView !== visiblePartsMerged) {
            $element.data('inview', visiblePartsMerged).trigger('inview', [true, visiblePartX, visiblePartY]);
          }
        } else if (inView) {
          $element.data('inview', false).trigger('inview', [false]);
        }
      }
    }
  }

  $(w).bind("scroll resize scrollstop", function() {
    viewportSize = viewportOffset = null;
  });

  // IE < 9 scrolls to focused elements without firing the "scroll" event
  if (!documentElement.addEventListener && documentElement.attachEvent) {
    documentElement.attachEvent("onfocusin", function() {
      viewportOffset = null;
    });
  }
}));



jQuery(document).ready(function($) {
    $( '*[add-animated]' ).each(function() {

        $( this ).bind( 'inview', function( event, isInView, visiblePartX, visiblePartY ) {

            if ( visiblePartY == 'both' ) {

                $( this ).addClass( $( this ).attr( 'add-animated' ).length ? $( this ).attr( 'add-animated' ) : 'animated' );

                $( this ).unbind( 'inview' );
            }
        });
    });
});

(function($) {

    $.scrollTo = function( selector, time ) {
        if ( typeof time === 'undefined' ) {
            time = 1200;
        }

        var element = selector;

        if ( ! selector instanceof jQuery ) {
            element = $( selector );
        }

        if ( element.length > 1 ) {
            element = $( element[0] );
        }

        $("html, body").animate({ scrollTop: element.offset().top }, time);
    }

})(jQuery);


/**
 * Work with the scroll to functionality for the various types of button.
 */
jQuery(document).ready(function($) {

    $( 'button[scroll-to-next], .button[scroll-to-next]' ).on( 'click', function() {

        var scrollTo = $( this ).closest( '.page-section' ).next( '.page-section' );

        $.scrollTo ( scrollTo );



    });

    $( '.button[scroll-to], button[scroll-to]' ).on( 'click', function() {
        var scrollToString = $( this ).attr( 'scroll-to' );

        $.scrollTo( scrollToString );
    });

});
