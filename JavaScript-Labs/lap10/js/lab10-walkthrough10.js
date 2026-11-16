$(function () {
  var $button = $('#consume');
  var $loading = $('.animLoading');
  var $list = $('#results ul');

  $button.on('click', function () {
    var startedAt = Date.now();
    $button.prop('disabled', true);
    $list.empty();
    $loading.prop('hidden', false);

    $.get('data/cities.json', function (cities) {
      $.each(cities, function (_, city) {
        $('<li></li>').text(city.name + (city.country ? ', ' + city.country : '')).appendTo($list);
      });
    }, 'json')
      .done(function () {
        if (!$list.children().length) {
          $('<li class="loading-message"></li>').text('Không có thành phố để hiển thị.').appendTo($list);
        }
      })
      .fail(function () {
        $list.empty().append(
          $('<li class="error-message" role="alert"></li>').text('Không tải được danh sách thành phố. Hãy chạy trang qua localhost hoặc GitHub Pages.')
        );
      })
      .always(function () {
        // Keep the indicator visible long enough to notice on fast local requests.
        var remaining = Math.max(0, 1500 - (Date.now() - startedAt));
        window.setTimeout(function () {
          $loading.prop('hidden', true);
          $button.prop('disabled', false);
        }, remaining);
      });
  });
});
