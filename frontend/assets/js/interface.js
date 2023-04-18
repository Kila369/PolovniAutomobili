( function($) {
    'use strict';
  $(function(e) {

      
      
  /*------------------------------------------------------------------
      Trending Slider
      -------------------------------------------------------------------*/
      var owl = $("#trending_slider");
      owl.owlCarousel({
        itemsCustom : [
          [0, 1],
          [450, 1],
          [550, 1],
          [700, 3],
        ],
        loop: true,
        nav : true,
        navigation : false,
        autoPlay  : 3000
      });
  
  
  /*------------------------------------------------------------------
      Search-button
      -------------------------------------------------------------------*/
      $("#search_toggle").click(function(){
          $("#header-search-form").slideToggle();
      });
      
  
  
  /*------------------------------------------------------------------
      Filter-Form
      -------------------------------------------------------------------*/
      $("#filter_toggle").click(function(){
          $("#filter_form").slideToggle();
      });
      
      
 
  /*------------------------------------------------------------------
      back to top
      -------------------------------------------------------------------*/
   var top = $('#back-top');
      top .hide();
      $(window).scroll(function () {
          if ($(this).scrollTop() > 100) {
              top .fadeIn();
          } else {
              top .fadeOut();
          }
      });
      $('#back-top a').on('click', function(e) {
          $('body,html').animate({
              scrollTop: 0
          }, 800);
          return false;
      });
       
      $(document).on( "click, mouseover", '.slider.slider-horizontal', function(e) {
          $('.tooltip.tooltip-main.top').css( 'opacity', 1 );
      });
  
  });
  })(jQuery);