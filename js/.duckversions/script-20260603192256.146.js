/* global location, history, Drupal, jQuery, Waypoint */

//Drupal.settings.RPKN_TPS = []; // TPS = theme project settings

(function($, Drupal, drupalSettings) {

  Drupal.behaviors.sso_login = {
    attach: function(context) {
      $("a.sso_login_click", context).click(function() {
        event.preventDefault();
        var currentpage = window.location.pathname;
        var urlsuccess = encodeURIComponent(document.location.protocol + '//' + document.location.hostname + "/netforum_sso_web_login?WebLoginKey={token}&destination=") + currentpage;
        var fullpage = "https://my.aaacn.org/eweb/DynamicPage.aspx?Site=AAACN&WebCode=LoginRequired&DLI=yes&URL_success=" + urlsuccess;
        window.location.href = fullpage;
      });
    }
  };
  
  
  Drupal.behaviors.accordionhash = {
    attach: function(context) {
    $("div.collapsible-container", context).each(function() {
    var tabSelect = "";
    var tabGroup = "";
    var tabBreak = 0;
    if(document.location.hash!='') {
    var hashString = document.location.hash;
    tabBreak = hashString.indexOf("-");
    tabSelect = hashString.substr(1,hashString.length);
    if(tabBreak < 1) {
       tabGroup = "accordion";
    }
    else {
    tabGroup = hashString.substr(1,tabBreak-1);
    }
   jQuery("#"+tabGroup).find('h3.'+tabSelect).trigger("click");
   element_to_scroll_to = jQuery("#"+tabGroup).find('h3.'+tabSelect)[0];
   element_to_scroll_to.scrollIntoView();
    }
      });
    }
  };

  Drupal.behaviors.aaacn_misc = {
    attach: function(context, settings) {

      $(".megamenu-practice-resources .we-mega-menu-submenu-inner .we-mega-menu-submenu-inner",context).each(function () {
        $(this).after('<a class="view-more" href="/practice-resources">View More &raquo;</a>');
      })

      $("#block-aaacnv3-search-form").click(function() {
          window.location.href = '/search/fuse';
      });
      
      $(".region-nav-additional").children().clone(true).prependTo(".main.navbar");

  
      $(".region-sidebar-first .nav-item.dropdown.nolink > .nav-item").click(function() {
        $(".region-sidebar-first .nav-item.dropdown ul").slideUp();
        $(this).parent().children("ul").slideDown();
      })


      $("#headlines").click(function() {
        $("#headlines > .field").toggleClass("alt");
      })


      //$(".collapsible-container.closed .pane", context).slideUp();
      //$(".collapsible-container.closed", context).removeClass("closed");

      $(".collapsible-container h3", context).click(function() {
        $(this).toggleClass("expanded");
        var pane = $(this).next(".pane");
        pane.slideToggle();
      });


      /* 
       * Used by rpkn_theme/js/lib/fadeindiv.js 
       */
      drupalSettings.RPKN_TPS = [];
      drupalSettings.RPKN_TPS.fadein_divs = [{
          "sel": $('.home_video_content h2'),
          "direction": "up",
          "offset": 90,
          "delay": 250,
          "sequential_delay": 200
        },
        {
          "sel": $('.home_video_content .home-button'),
          "direction": "up",
          "offset": 90,
          "delay": 1000,
        },
        {
          "sel": $('.home_video_content .headlines'),
          "direction": "right",
          "offset": 90,
          "delay": 1100
        },

      ];
    }
  };
})(jQuery, Drupal, drupalSettings);

// $('.view-content').slick({
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: false,
//   autoplaySpeed: 2000,
// });
