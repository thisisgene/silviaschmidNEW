

var convertLinks = function(){

  var documentRoot = document;

  // Get all links
  var links = documentRoot.querySelectorAll(".pjax");

  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var href = $(link).attr('href');
    if (href.indexOf('http://') !== 0) {


      (function(href){

        $(link).on('click', function(e){
          console.log(href);
          if (e.metaKey || e.ctrlKey) return;

          e.preventDefault();

          openPage(href);

        });
      })(href);
    };
  }

};

window.onpopstate = function(event) {
  var href = event.state.href;
  loadPage(href);
};

function openPage(href, bonus) {
  history.pushState({ href: href }, href, href);
  loadPage(href, bonus);
}

function loadPage(href, bonus) {
  $('#content-container').addClass('loading');
  $("body").removeClass("background-loaded");
  for (var i = 0; i < $('.pjax').length; i++) {
    var link = $('.pjax').eq(i);

    if (link.attr('href')==href) {
      link.parent().addClass('active')
    }
    else {
      link.parent().removeClass('active')
    }
  }

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if(xmlhttp.status == 200) {

        finishedLoading(xmlhttp.response, bonus);


      }
      else { console.log("something else other than 200 was returned"); }
    }
  }
  console.log(href);

  console.log($('#content-container').prop('class'));
  xmlhttp.open("GET", href, true);

  // Tells the browser to retrieve the response as a HTML document
  xmlhttp.responseType = "document";

  xmlhttp.send();


  // $.ajax({
  //   type: 'GET',
  //   url: href,
  //   dataType: 'document'
  // }).done(function(e){
  //   console.log(e)
  // })
}

function finishedLoading(responseHtml, bonus) {
  var newHTML = responseHtml.querySelector('#content-container').innerHTML;
  var mainElement = document.querySelector('#content-container');
  mainElement.innerHTML = responseHtml.querySelector('#content-container').innerHTML;

  $('#content-container').removeClass('loading');
  mainScript();
  if (!$('#content').hasClass('logo-intro')){
    $('#logo').delay(300).fadeIn(300);
    $('.logo-intro').removeClass('logo-intro');
    $('.body-home').removeClass('body-home');
  }
  else {
    $('body').addClass('body-home');
    console.log('homescreen');
    $('#logo').fadeOut(100);
    $('#content').addClass('logo-intro');
    $('#header-container').addClass('logo-intro');
  }
  if($('#menu-icon').css('display')=='none'){
    desktopScript();
  }
  if (bonus!==undefined) {
    showAlert(bonus.type, bonus.text);
  }

}

$(document).ready(function(){
  convertLinks();
});
