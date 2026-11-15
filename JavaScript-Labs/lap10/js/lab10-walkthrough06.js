$(function () {
  var $image = $('main figure');
  $image.hide();
  $('#btnFadeIn').on('click', function () { $image.fadeIn(700); });
  $('#btnFadeOut').on('click', function () { $image.fadeOut(700); });
  $('#btnFade').on('click', function () { $image.fadeToggle(700); });
  $('#btnSlideUp').on('click', function () { $image.slideUp(700); });
  $('#btnSlideDown').on('click', function () { $image.slideDown(700); });
  $('#btnSlide').on('click', function () { $image.slideToggle(700); });
});
