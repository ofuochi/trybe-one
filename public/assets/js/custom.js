AOS.init();

$('.cardslides').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite:false,
  arrows: true,
  centerPadding: '25px',
  dots: true,
  centerMode: true,
  focusOnSelect: true
});

document.addEventListener("DOMContentLoaded", function(event) {
  var element = document.querySelector('.mdc-drawer');

  function resize() {
    if (window.innerWidth < 768) {
      element.classList.remove('mdc-drawer--open'); 
    } else {
      element.classList.add('mdc-drawer--open');
    }
  }
  window.onresize = resize;
});
