$(function () {
  $('#consume').on('click', function () {
    $('#results').empty().append('<p class="loading-message">Loading posts…</p>');
    $.getJSON('data/posts.json').done(function (posts) {
      var $list = $('<ul class="post-results"></ul>');
      $.each(posts, function (_, post) {
        $('<li></li>').append($('<h2></h2>').text(post.title)).append($('<p></p>').text(post.excerpt)).appendTo($list);
      });
      $('#results').empty().append($list);
    }).fail(function () { $('#results').html('<p class="error-message">Could not load posts. Serve this folder over HTTP and try again.</p>'); });
  });
});
