$(function () {
  var $form = $('form[name="sampleForm"]');
  var $textInputs = $form.find('input[type="text"]');
  var $passwords = $form.find('input[type="password"]');
  var $errors = $('#errors');
  $form.on('submit', function (event) {
    event.preventDefault();
    var missing = $form.find('input:text, input:password').filter(function () { return $.trim($(this).val()) === ''; });
    var messages = [];
    if (missing.length) messages.push('Complete all fields.');
    if ($('#pass1').val() !== $('#pass2').val()) messages.push('Passwords do not match.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val())) messages.push('Enter a valid email address.');
    $textInputs.add($passwords).css('border-color', '#c8cdd1');
    if (messages.length) {
      $errors.html('<ul><li>' + messages.join('</li><li>') + '</li></ul>').removeClass('hidden success').addClass('visible');
      missing.css('border-color', '#d9534f').first().trigger('focus');
    } else {
      $errors.text('All fields look good.').removeClass('hidden visible').addClass('success');
    }
  });
  $form.find('input[type="text"], input[type="password"]').on('focus', function () { $(this).addClass('selected'); }).on('blur', function () { $(this).removeClass('selected'); });
});
