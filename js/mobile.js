$(document).click(function(event) {
  if($('#menu-icon').css('display')!='none'){
    if($(event.target).closest('#menu-icon').length==0){

      $('#side-menu').hide(300);

    }
  }
});

function toggleMenu() {
  $('#side-menu').toggle(300);
}
