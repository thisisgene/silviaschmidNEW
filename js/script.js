var preload = function(src, callback) {
  // Create a temporary image.
  if (src != 'noimage'){
    var img = new Image();

    // Invoke the callback as soon as the image is loaded
    // Has to be set **before** the .src attribute. Otherwise
    // `onload` could fire before the handler is set.
    $(img).load(callback);

    img.src = src;
  }
  else {
    callback();
  }
};

var mainScript = function(){

  $('.carousel').slick({
    // centerMode: true,
    // centerPadding: '60px',
    infinite: true,
    dots: true,
    autoplay: true,
    adaptiveHeight: true,
    // fade: true,
    mobileFirst: true,
    // prevArrow: $('.prev'),
    // nextArrow: $('.next'),
  });
  $('.hidden-text').parent().addClass('hascontent');
  $('.hidden-text').parent().click(function(){
    $(this).children('.hidden-text').toggle(100);
  });

}

var desktopScript = function(){
  $('#load-screen').fadeOut(1000);
  // var hd_width;
  // hd_width = $('#header-container').width();
  // $('#header-container').css('width', hd_width);
  // var waypoints = $('#content-container').waypoint(function(direction) {
  //   console.log($('#header-container').css('width'));
  //
  //   // $('#header-container').width(hd_width);
  //   if (direction=='down') {
  //     console.log($('#header-container').css('width'));
  //     $('#header-container').width(hd_width).delay(10).animate({
  //       width: '153px'
  //     },100);
  //     console.log($('#header-container').width());
  //   }
  //   if (direction=='up') {
  //     console.log($('#header-container').width());
  //     $('#header-container').width(hd_width);
  //   }
  //   $('#header-container').removeClass();
  //   $('#header-container').addClass('hd-' + direction);
  //   $('#side-menu').removeClass();
  //   $('#side-menu').addClass('sm-' + direction);
  //   $('#content-container').removeClass();
  //   $('#content-container').addClass('cc-' + direction);
  //   // console.log(direction);
  //   // $('#header-container').css('width', 'auto');
  // }, { offset: '140px'})

  // Example usage:

  $("body").addClass("loading-background");
  if ($('#content').data('bgimage') != undefined){
    var bImage = 'img/'+$('#content').data('bgimage');
  }
  else {
    bImage = 'noimage';
  }
  console.log(bImage);
  preload(bImage, function() {
    if (bImage != 'noimage'){
      $("body").css('backgroundImage','url('+bImage+')');
    }
    else {              // if no background image add random color
      $("body").css('backgroundImage','none');
      $("body").css('backgroundColor', '#'+(Math.random()*0xFFFFFF<<0).toString(16));
    }
    $("body").addClass("background-loaded");
  });
}

$(document).ready(function(){
  mainScript();
  if($('#menu-icon').css('display')=='none'){
    desktopScript();
  }


});
