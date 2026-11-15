$(function () {
  $('.panel').on('mouseenter', function () { $(this).css({ backgroundColor: '#176b87', color: '#fff' }); $('#message').text('Mouse entered the panel.'); })
    .on('mouseleave', function () { $(this).css({ backgroundColor: '#CFD8DC', color: '#172b3a' }); $('#message').text('Mouse left the panel.'); });
});
