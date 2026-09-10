/*global Drupal, jQuery, konsole */
/*eslint no-shadow-restricted-names: "undefined"*/

(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.fadeindiv = {
    attach: function(context, settings) {
      
      /* 
       * blox is an array of objects, each of which specifies a selector "sel" and direction "up, left or right"
       * var blox = [{
       *   "sel" : $('main article .paragraph-rkfigure').not(".fadeindiv-exclude"),
       *   "direction": "up"
       * }];
       *
       */

      function hideBlocks(blocks, offset) {
  	    $(blocks).each(function(i, divs) {
    	    if ($(divs.sel).length) {
    	      if (divs.offset) offset = divs.offset;
  	        // ($(divs.sel).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(divs.sel).addClass('fadeindiv-hide');
  	        $(divs.sel).addClass('fadeindiv-hide');
    	    }
  	    });
      }
      
      function showBlocks(blocks, offset) {
    	  $(blocks).each(function(i, divs) {
	        var oneoffset = divs.offset || 0.8;
        	$(divs.sel).each(function(i, onediv) {
      	    if ($(onediv).length) {
      	      if ($(onediv).offset().top <= $(window).scrollTop()+$(window).height()*oneoffset && $(onediv).hasClass('fadeindiv-hide')) {
      	        
      	        if (divs.delay) {
      	          basedelay = divs.delay;
      	        } else {
      	          basedelay = 0;
      	        }
      	        
      	        if (divs.sequential_delay) {
      	          var seqdelay = divs.sequential_delay * i;
      	        } else {
      	          var seqdelay = 0;
      	        }
      	        
    	          setTimeout(function () {
    	            $(onediv).removeClass('fadeindiv-hide').addClass('fadeindiv-show').addClass('fadeindiv-show-' + divs.direction);
    	          },(basedelay + seqdelay));
      	        
      	      }
      	    }
      	  });
    	  });
      }

      console.log('fadeindiv starting');
      var defaults = [
        {
          "sel": $('.home_video_content h2 span'),
          "direction": "up",
          "offset": 90,
          "delay": 500,
          "sequential_delay": 100
        }
      ];
      
      if (typeof drupalSettings.RPKN_TPS === 'undefined') {
        var blox = defaults;
      } else {
        var blox = defaults.concat(drupalSettings.RPKN_TPS.fadein_divs);
      }
      
      console.groupCollapsed('Fade In Divs loaded.');
      console.log(blox);
      console.groupEnd();

      var offset = 0.6;

      //hide blocks which are outside the viewport
  	  hideBlocks(blox, offset);
  	  
  	  // define scroll handler to show blocks as they come into view
  	  $(window).on('scroll', function() {
    	  (!window.requestAnimationFrame) 
    	    ? setTimeout(function(){ showBlocks(blox, offset); }, 100)
    	    : window.requestAnimationFrame(function(){ showBlocks(blox, offset); });
      });
      showBlocks(blox, offset);
    }
  };
}) (jQuery, Drupal, this, this.document);