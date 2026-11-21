/*
 * Bài 2 – jQuery LMS
 * Chạy toàn bộ file trong Console của trang môn học UEH sau khi đăng nhập.
 * Script chỉ đọc DOM hiện tại và thêm một panel kết quả có thể đóng.
 */
(function ($, window, document) {
  'use strict';

  if (!$ || !$.fn || typeof $.fn.each !== 'function') {
    window.alert('Không tìm thấy jQuery trên trang này. Hãy xác nhận đang mở trang môn học LMS đã tải xong, rồi thử lại. Script đã dừng và không thay đổi trang.');
    return;
  }

  var PANEL_ID = 'jquery-lms-report-panel';
  var $oldPanel = $('#' + PANEL_ID);
  if ($oldPanel.length) $oldPanel.remove();

  var diagnostics = [];
  var assignmentSelector = '.modtype_assign';
  var sectionSelector = '.course-content .section, li.section, section.course-section, .course-section';
  var datePattern = /\b(?:\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+\d{4}|\d{1,2}\s+tháng\s+\d{1,2}\s+năm\s+\d{4})\b/i;
  var deadlineLabel = /due\s*date|due date|deadline|hạn\s*nộp|ngày\s*(?:đến\s*)?hạn|thời\s*hạn/i;

  function cleanText(value) {
    return $.trim(String(value || '').replace(/\s+/g, ' '));
  }

  function sectionTitle($section) {
    var selectors = [
      '.sectionname',
      '.course-section-header .sectionname',
      '.sectionname a',
      'h3.sectionname',
      '[data-region="section-title"]'
    ];
    for (var i = 0; i < selectors.length; i += 1) {
      var title = cleanText($section.find(selectors[i]).first().text());
      if (title) return title;
    }
    return '';
  }

  function assignmentName($assignment) {
    var name = cleanText($assignment.find('.instancename').first().text());
    if (!name) name = cleanText($assignment.attr('aria-label'));
    return name;
  }

  function deadlineFor($assignment) {
    var candidates = [];
    $assignment.find('.activityinfo, .contentafterlink, .activity-dates, .completion-info, .description, time, [datetime], [data-region*="activity-dates"]').each(function () {
      candidates.push(cleanText($(this).text()));
      var datetime = $(this).attr('datetime');
      if (datetime) candidates.push(datetime);
    });
    candidates.push(cleanText($assignment.text()));

    for (var i = 0; i < candidates.length; i += 1) {
      var text = candidates[i];
      if (!text || !deadlineLabel.test(text)) continue;
      var match = text.match(datePattern);
      if (match) return match[0];
      // Một số Moodle hiển thị thời gian trong thẻ <time> cạnh nhãn.
      var timeMatch = text.match(/\b\d{1,2}:\d{2}\b/);
      if (timeMatch) return text;
    }
    return 'Chưa xác định deadline';
  }

  // Gom các bài tập từ DOM; giữ thứ tự xuất hiện trên trang.
  var assignments = [];
  $(assignmentSelector).each(function () {
    var $assignment = $(this);
    var $name = $assignment.find('.instancename').first();
    var name = assignmentName($assignment);
    if (!name) {
      diagnostics.push('Có phần tử .modtype_assign nhưng không tìm thấy tên trong .instancename.');
      name = 'Không nhận diện được tên bài tập';
    }
    assignments.push({
      name: name,
      deadline: deadlineFor($assignment),
      element: this,
      titleElement: $name[0] || null
    });
  });

  if (!assignments.length) {
    diagnostics.push('Không tìm thấy bài tập bằng selector .modtype_assign trên trang hiện tại.');
  }

  // Tạo danh sách section, bỏ selector trùng lặp và section con lồng trong section cha.
  var sections = [];
  var seenSections = [];
  $(sectionSelector).each(function () {
    if (seenSections.indexOf(this) !== -1) return;
    seenSections.push(this);
    var $section = $(this);
    var title = sectionTitle($section);
    if (!title) return;

    // Chỉ nhận bài tập thuộc trực tiếp section này, tránh tính trùng section lồng nhau.
    var sectionAssignments = assignments.filter(function (item) {
      return $(item.element).closest(sectionSelector)[0] === $section[0];
    });
    sections.push({ title: title, assignments: sectionAssignments });
  });

  if (!sections.length) {
    diagnostics.push('Không nhận diện được chủ đề. Đã thử các selector section Moodle và tiêu đề .sectionname / [data-region="section-title"].');
  }

  // Ghi kết quả bài thứ 5 theo mẫu giảng viên.
  var fifth = assignments[4] || null;
  if (fifth) {
    console.log('Bài tập thứ 5: ' + fifth.name);
  } else {
    console.log('Không có đủ 5 bài tập trên trang LMS hiện tại (tìm thấy ' + assignments.length + ').');
  }
  console.log('Danh sách bài tập tìm thấy trên LMS:');
  $.each(assignments, function (index, item) {
    console.log((index + 1) + '. ' + item.name);
  });

  // Dựng panel ngoài nội dung khóa học, dùng text() để tránh diễn giải dữ liệu trang thành HTML.
  var $panel = $('<aside>', { id: PANEL_ID, 'aria-live': 'polite' });
  var $style = $('<style>').text(
    '#' + PANEL_ID + '{position:fixed;z-index:99999;inset:16px 16px 16px auto;width:min(760px,calc(100vw - 32px));overflow:auto;background:#fff;color:#24332b;border:1px solid #cbd9cf;border-radius:12px;box-shadow:0 12px 48px #10251a44;font:14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;padding:20px}' +
    '#' + PANEL_ID + ' *{box-sizing:border-box}' +
    '#' + PANEL_ID + ' h2{font-size:20px;margin:0 0 12px;color:#205b3d}' +
    '#' + PANEL_ID + ' h3{font-size:16px;margin:22px 0 8px}' +
    '#' + PANEL_ID + ' .jlms-head{display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid #e2eae4;padding-bottom:12px}' +
    '#' + PANEL_ID + ' button{cursor:pointer;border:0;border-radius:6px;padding:8px 12px;background:#205b3d;color:#fff;font-weight:600}' +
    '#' + PANEL_ID + ' .jlms-close{background:#edf3ee;color:#24332b}' +
    '#' + PANEL_ID + ' .jlms-callout{padding:12px 14px;background:#eef6f0;border-left:4px solid #318052;border-radius:4px;margin:14px 0}' +
    '#' + PANEL_ID + ' .jlms-warn{background:#fff7e8;border-color:#c48a32}' +
    '#' + PANEL_ID + ' table{width:100%;border-collapse:collapse;margin:10px 0 18px}' +
    '#' + PANEL_ID + ' th,#' + PANEL_ID + ' td{text-align:left;vertical-align:top;padding:9px;border-bottom:1px solid #e4ebe6}' +
    '#' + PANEL_ID + ' th{background:#f1f6f2}' +
    '#' + PANEL_ID + ' .jlms-muted{color:#66736c;font-size:12px}' +
    '@media(max-width:600px){#' + PANEL_ID + '{inset:8px;width:calc(100vw - 16px);padding:14px}#' + PANEL_ID + ' table{font-size:12px}#' + PANEL_ID + ' th,#' + PANEL_ID + ' td{padding:6px}}'
  );
  var $head = $('<div>', { 'class': 'jlms-head' });
  $head.append($('<h2>').text('Báo cáo jQuery LMS · Course 43861'));
  $head.append($('<button>', { type: 'button', 'class': 'jlms-close', text: 'Đóng' }).on('click', function () { $panel.remove(); $style.remove(); }));
  $panel.append($head);

  var $fifthBox = $('<div>', { 'class': 'jlms-callout' });
  $fifthBox.append($('<strong>').text('Bài tập thứ 5'));
  $fifthBox.append($('<div>').text(fifth ? 'STT 5: ' + fifth.name : 'Không đủ 5 bài tập. Tìm thấy ' + assignments.length + ' bài tập.'));
  $panel.append($fifthBox);

  $panel.append($('<h3>').text('Danh sách bài tập (' + assignments.length + ')'));
  var $assignTable = $('<table><thead><tr><th>STT</th><th>Bài tập</th><th>Deadline</th></tr></thead><tbody></tbody></table>');
  $.each(assignments, function (index, item) {
    var $row = $('<tr>');
    $row.append($('<td>').text(index + 1), $('<td>').text(item.name), $('<td>').text(item.deadline));
    $assignTable.find('tbody').append($row);
  });
  if (!assignments.length) $assignTable.find('tbody').append($('<tr>').append($('<td>', { colspan: 3, text: 'Không tìm thấy bài tập bằng selector .modtype_assign.' })));
  $panel.append($assignTable);

  $panel.append($('<h3>').text('Thống kê chủ đề (' + sections.length + ')'));
  var $topicTable = $('<table><thead><tr><th>STT</th><th>Chủ đề</th><th>Số bài</th><th>Tên bài tập</th><th>Deadline</th><th>Trạng thái</th></tr></thead><tbody></tbody></table>');
  $.each(sections, function (index, section) {
    var names = section.assignments.length ? section.assignments.map(function (item) { return item.name; }).join('\n') : 'Không có';
    var deadlines = section.assignments.length ? section.assignments.map(function (item) { return item.deadline; }).join('\n') : '—';
    var status = section.assignments.length ? 'Có bài tập' : 'Không có bài tập';
    var $row = $('<tr>');
    $row.append(
      $('<td>').text(index + 1),
      $('<td>').text(section.title),
      $('<td>').text(section.assignments.length),
      $('<td>').text(names),
      $('<td>').text(deadlines),
      $('<td>').text(status)
    );
    $topicTable.find('tbody').append($row);
  });
  if (!sections.length) $topicTable.find('tbody').append($('<tr>').append($('<td>', { colspan: 6, text: 'Chưa nhận diện được cấu trúc chủ đề. Xem chẩn đoán bên dưới.' })));
  $panel.append($topicTable);

  $panel.append($('<h3>').text('Chẩn đoán DOM'));
  var $diag = $('<div>', { 'class': diagnostics.length ? 'jlms-callout jlms-warn' : 'jlms-callout' });
  if (diagnostics.length) {
    var $list = $('<ul>');
    $.each(diagnostics, function (_, message) { $list.append($('<li>').text(message)); });
    $diag.append($list);
  } else {
    $diag.text('Đã nhận diện được danh sách bài tập và tiêu đề chủ đề. Deadline không có trong dữ liệu trang sẽ được ghi là “Chưa xác định deadline”.');
  }
  $diag.append($('<div>', { 'class': 'jlms-muted', text: 'Selector bài tập: .modtype_assign · tên bài: .instancename · section Moodle: ' + sectionSelector }));
  $panel.append($diag);

  $(document.head || document.documentElement).append($style);
  $(document.body || document.documentElement).append($panel);
}(window.jQuery, window, document));
