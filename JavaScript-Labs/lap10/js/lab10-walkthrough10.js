$(function () {
  var $button = $('#consume'), $spinner = $('.animLoading'), $list = $('#results ul');
  $spinner.hide();
  $button.on('click', function () {
    $button.prop('disabled', true);
    $list.empty();
    $spinner.show();
    $.ajax({ url: 'data/posts.json', dataType: 'json', cache: false })
      .done(function (posts) {
        $.each(posts, function (_, post) {
          var $item = $('<li class="post-card"></li>');
          $('<img>').attr({ src: post.image, alt: post.title }).appendTo($item);
          var $detail = $('<div></div>').appendTo($item);
          $('<h2></h2>').text(post.title).appendTo($detail);
          $('<p class="post-meta"></p>').text(post.author + ' · ' + post.date).appendTo($detail);
          $('<p></p>').text(post.excerpt).appendTo($detail);
          $list.append($item);
        });
      })
      .fail(function () { $list.html('<li class="error-message">Unable to load posts. Run this page from localhost or GitHub Pages.</li>'); })
      .always(function () { $spinner.hide(); $button.prop('disabled', false); });
  });
});
