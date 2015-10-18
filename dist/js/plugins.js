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
    $( '*[add-visible]' ).each(function() {

        $( this ).bind( 'inview', function( event, isInView, visiblePartX, visiblePartY ) {

            if ( visiblePartY == 'both' ) {

                $( this ).addClass( $( this ).attr( 'add-visible' ).length ? $( this ).attr( 'add-visible' ) : 'visible' );

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
