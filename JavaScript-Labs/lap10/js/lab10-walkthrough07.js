$(function () {
  $('main figure img').on('mouseenter', function () {
    var $img = $(this), title = $img.attr('alt');
    $('#preview').remove();
    $('<div id="preview"><p></p></div>').appendTo('body').find('p').text(title);
    var offset = $img.offset();
    $('#preview').css({ left: offset.left, top: offset.top + $img.outerHeight(), minWidth: $img.width() }).fadeIn(200);
  }).on('mouseleave', function () { $('#preview').stop(true, true).fadeOut(150, function () { $(this).remove(); }); });
});
