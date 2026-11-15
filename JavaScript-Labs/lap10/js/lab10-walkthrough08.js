$(function () {
  var $box = $('#box'), moved = false;
  $('#commandLine button').on('click', function () {
    if (!moved) $box.animate({ left: '+=260px', top: '+=150px', width: '+=80px', height: '+=40px', opacity: 0.85 }, 900);
    else $box.animate({ left: '38px', top: '95px', width: '200px', height: '150px', opacity: 0.4 }, 900);
    moved = !moved;
  });
});
