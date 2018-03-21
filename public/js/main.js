(function(){

  "use strict";

  // Variables
  // =========================================================================================
  var $html = $('html'),
      $document = $(document),
      $window = $(window),
      i = 0;


  // Scripts initialize
  // ===================

  document.write('<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYjhWq7DvCwCiRKotPu9_IXQxupSQbhuo" type="text/javascript"></script>');

  $window.on('load', function () {

    // =================================================================================
    // Preloader
    // =================================================================================
    var $preloader = $('#page-preloader');
    $preloader.delay(100).fadeOut('slow');

    // =================================================================================
    // WOW
    // =================================================================================
    if ($window.width()>=992) { new WOW().init(); }

    // =================================================================================
    // Google Map
    // =================================================================================
    var map = $(".map");
    if(map.length){
      var mapWrapper = $('#google-map'),
          latlng = new google.maps.LatLng(mapWrapper.data("x-coord"), mapWrapper.data("y-coord")),
          myOptions = {
            scrollwheel: false,
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: false,
          },
          map = new google.maps.Map(mapWrapper[0], myOptions),
          marker = new google.maps.Marker({
            position: {lat: mapWrapper.data("x-coord"), lng: mapWrapper.data("y-coord")},
            draggable: false,
            animation: false,
            map: map,
            icon: 'img/marker.png'
          }),
          infowindow = new google.maps.InfoWindow({
            content: mapWrapper.data("text")
          });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }

  });


  $document.ready(function () {

    // =================================================================================
    // Contact Form
    // =================================================================================
    var contactForm = $(".contact-form");
    if(contactForm.length){
      var contactResault = $("body").append("<span class='form-resault'></span>").find(".form-resault");
      contactForm.each(function(){
        var this_form = $(this);
        var contactFormInput = this_form.find(".form-control.required");

        contactFormInput.on("blur", function(){
          if(!$.trim($(this).val())){
            $(this).parent().addClass("input-error");
          }
        });

        contactFormInput.on("focus", function(){
          $(this).parent().removeClass("input-error");
        });

        this_form.on("submit", function() { 
          var form_data1 = $(this).serialize();
          if(!contactFormInput.parent().hasClass("input-error") && contactFormInput.val()){
            $.ajax({
              type: "POST", 
              url: "/", 
              data: form_data1,
              success: function() {
                contactResault.addClass("correct");
                contactResault.html("Your data has been sent!");
                setTimeout(function(){
                  contactResault.removeClass("incorrect").removeClass("correct");
                }, 4500);
              }
            });
          } else{ 
            if(contactFormInput.val() === ""){
              var contactFormInputEmpty = contactFormInput.filter(function(){ 
                return $(this).val() === ""; 
              });
              contactFormInputEmpty.parent().addClass("input-error");
            }
            contactResault.addClass("incorrect");
            contactResault.html("You must fill in all required fields");
            setTimeout(function(){
              contactResault.removeClass("incorrect").removeClass("correct");
            }, 4500);
          }
          return false;
        }); 
      });
    }

    // =================================================================================
    // jQuery ajaxChimp
    // =================================================================================
    var chimpForm = $('.subscription-form');
    chimpForm.ajaxChimp({
      callback: function(){
        var panel = $('.js-result');
        setTimeout(function () {
          panel.removeClass("error").removeClass("success");
        }, 4500);
      },
      language: 'cm',
      url: '//adr.us14.list-manage.com/subscribe/post?u=474217a166648c3e7e0c53b55&amp;id=57bd6ccefc'
      //XXX.us13.list-manage.com/subscribe/post?u=YYY&amp;id=ZZZ
    });
    $.ajaxChimp.translations.cm = {
      'submit': 'Submitting...',
      0: 'We have sent you a confirmation email',
      1: 'Please enter a value',
      2: 'An email address must contain a single @',
      3: 'The domain portion of the email address is invalid (the portion after the @: )',
      4: 'The username portion of the email address is invalid (the portion before the @: )',
      5: 'This email address looks fake or invalid. Please enter a real email address'
    };

    // =================================================================================
    // Video 
    // =================================================================================
    var video = $('.video-wrap');
    if (video.length) {
      $(".overlay-image").on("click", function(){
        $(this).addClass("hid");
        $("#video")[0].src += "&autoplay=1";
      });
    }

    // =================================================================================
    // Parallax Content
    // =================================================================================
    var parallaxContent = function(el){
      parallax_content.each(function(){
        var it = $(this);
        var parallax_wrap = it.closest(".k-parallax");
        var parall_speed = it.attr("data-speed");
        var st = $(window).scrollTop();
        var ot = it.offset().top + it.height() / 2;
        var elem_pos = (ot - st) - parallax_wrap.height() / 2;
        elem_pos = elem_pos.toFixed(4);
        if($(window).width() >= 992){
          it.css({"-webkit-transform": "translate3d(0," + -elem_pos * (1 - parall_speed) + "px,0)"});
          it.css({"transform": "translate3d(0," + -elem_pos * (1 - parall_speed) + "px,0)"});
          if (it.attr("data-fade") === "true") {
            var op1 = it.offset().top - parallax_wrap.offset().top + it.height() / 2;
            var ht = parallax_wrap.height() * 0.4;
            var hb = parallax_wrap.height() * 0.6;
            if(op1 < ht){
              var op = 1-((ht-op1)/ht);
            } else if(op1 > hb){
              var op = 1-(op1-hb)/ht;
            } else {
              var op = 1;
            }
            it.css({"opacity": op});
          }
        } else {
          it.css({"-webkit-transform": "translate3d(0,0,0)"});
          it.css({"transform": "translate3d(0,0,0)"});
          it.css({"opacity": 1});
        }
      });
      window.requestAnimationFrame(parallaxContent);
    }
    var parallax_content = $(".k-parallax-content");
    if(parallax_content.length){
      parallaxContent();
    }

    // =================================================================================
    // Responsive Nav
    // =================================================================================
    var responsiveNav = new Navigation({
      init: true,
      stuck: true,
      responsive: true,
      breakpoint: 992, // don't forget to change in css as well
    });

    // =================================================================================
    // jQuery Count To
    // =================================================================================
    var counter = $('.counter');
    if (counter.length) {
      var counterToInit = counter.not(".init");
      $document.on("scroll", function () {
        counterToInit.each(function(){
          var item = $(this);
          var item_number = $(this).attr("data-to");
          var cont_on_offset = $(".count-on").offset().top;
          var win_offset = $window.height() + $window.scrollTop();

          if($window.width() >= 768){
            if ((!item.hasClass("init")) && (win_offset >= cont_on_offset)) {
              item.countTo({
                refreshInterval: 20,
                speed: item.attr("data-speed") || 1000
              });
              item.addClass('init');
            }
          } else {
            item.text(item_number);
          }
        });
        $document.trigger("resize");
      });
      $window.trigger("scroll");
    }

    // =================================================================================
    // UIToTop
    // =================================================================================
    $().UItoTop();
   
    // =================================================================================
    // Owl carousel
    // =================================================================================
    var slider_1 = $('.slider_1');
    if (slider_1.length) {
      slider_1.owlCarousel({
        mouseDrag: true,
        nav: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplaySpeed: 1500,
        dots: true,
        items: 3,
        responsive:{
          0:{ items: 1, },
          480:{ items: 2, margin: 20, },
          768:{ items: 3, margin: 30, center: true, },
        }
      });
    }
    var slider_2 = $('.slider_2');
    if (slider_2.length) {
      slider_2.owlCarousel({
        mouseDrag: true,
        nav: false,
        loop: true,
        autoplay: false,
        autoplayTimeout: 3500,
        autoplaySpeed: 1500,
        dots: true,
        items: 1,
      });
    }

    // =================================================================================
    // Backgound gradient
    // =================================================================================
    var bg_grad = $('.bg-gradient, .bg-gradient .shape-after');
    var colors = new Array(
      [62,35,255],
      [60,255,60],
      [255,35,98],
      [45,175,230],
      [255,0,255],
      [255,128,0]);
    var step = 0;
    var colorIndices = [0,1,2,3];
    //transition speed
    var gradientSpeed = 0.002;

    function updateGradient(){
      var c0_0 = colors[colorIndices[0]];
      var c0_1 = colors[colorIndices[1]];
      var c1_0 = colors[colorIndices[2]];
      var c1_1 = colors[colorIndices[3]];

      var istep = 1 - step;
      var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      var color1 = "rgb("+r1+","+g1+","+b1+")";

      var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
      var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
      var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
      var color2 = "rgb("+r2+","+g2+","+b2+")";

      bg_grad.css({ background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"});
      bg_grad.css({ background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
      bg_grad.css({ background: "-ms-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
      
      step += gradientSpeed;
      if (step >= 1){
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      }
    }
    if(bg_grad.length){
      setInterval(updateGradient,10);
    }


  });

})();
