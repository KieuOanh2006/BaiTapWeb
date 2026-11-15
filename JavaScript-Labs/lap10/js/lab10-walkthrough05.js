$(function () {
  $('.panel').prepend('<h2 class="added-title">jQuery created this heading</h2>');
  $('.panel').append('<p class="added-copy">This paragraph was appended with jQuery.</p>');
  $('.panel p').after('<p class="added-copy">This paragraph was inserted after the original.</p>');
  $('.panel').append('<span class="dom-label">Wrapped content</span>');
  $('.panel').append('<button id="removeAdded" type="button">Remove added paragraphs</button>');
  $('#removeAdded').on('click', function () { $('.added-copy').remove(); $(this).text('Added paragraphs removed').prop('disabled', true); });
});
