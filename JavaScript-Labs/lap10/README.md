# Lab 10 — JavaScript 3: jQuery

Mở `index.html` để vào các bài thực hành. Source HTML, CSS, ảnh và jQuery 3.1.1 được giữ từ ZIP; `Lab10.pdf` nằm trong thư mục này để đối chiếu. Trang 10.1 thêm CDN jQuery cùng bản fallback cục bộ.

## Các bài

| Bài | Trang | Nội dung đã làm |
|---|---|---|
| 10.1 | `lab10-walkthrough01.html` | Nạp jQuery từ CDN, dự phòng bằng `js/jquery-3.1.1.min.js`. |
| 10.2 | `lab10-walkthrough01.html` + `js/lab10-walkthrough02.js` | Selector cơ bản, `val`, `html`, `attr`, `css`, `addClass`; thay đổi textarea, tiêu đề, button, nền và icon counters. |
| 10.3 | `lab10-walkthrough03.html` + `js/lab10-walkthrough03.js` | Selector nâng cao cho input, filter field trống, kiểm tra email/password và hiện lỗi/thành công. |
| 10.4 | `lab10-walkthrough04.html` + `js/lab10-walkthrough04.js` | Bắt `mouseenter`/`mouseleave`, cập nhật kiểu panel và nội dung status. |
| 10.5 | `lab10-walkthrough05.html` + `js/lab10-walkthrough05.js` | Thêm và chèn HTML bằng jQuery; nút xóa nội dung mới. |
| 10.6 | `lab10-walkthrough06.html` + `js/lab10-walkthrough06.js` | `fadeIn`, `fadeOut`, `fadeToggle`, `slideUp`, `slideDown`, `slideToggle`. |
| 10.7 | `lab10-walkthrough07.html` + `js/lab10-walkthrough07.js` | Hover ảnh để hiện popover lấy nội dung từ `alt`. |
| 10.8 | `lab10-walkthrough08.html` + `js/lab10-walkthrough08.js` | `animate()` thay đổi vị trí, kích thước và opacity của hộp; nhấn lại để hoàn nguyên. |
| 10.9 | `lab10-walkthrough09.html` + `js/lab10-walkthrough09.js` | `$.getJSON()` tải bài viết rồi tạo danh sách kết quả. |
| 10.10 | `lab10-walkthrough10.html` + `js/lab10-walkthrough10.js` | `$.ajax()` tải cùng JSON, hiện spinner khi chờ và dựng cards có ảnh. |

Bài 10.9–10.10 tải `data/posts.json` bằng AJAX. Mở các trang đó qua GitHub Pages hoặc máy chủ localhost; mở trực tiếp bằng `file://` sẽ bị trình duyệt chặn request tới file JSON.

## Kiểm tra tương tác và ảnh có thể chụp cho báo cáo

- 10.1–10.2: mở 10.1, xác nhận jQuery đã nạp trong Console bằng `jQuery.fn.jquery`; chụp trang sau khi tiêu đề/nền/nút đổi.
- 10.3: thử gửi form rỗng, sai email/password khác nhau, rồi nhập dữ liệu hợp lệ; chụp trạng thái lỗi và thành công.
- 10.4: rê chuột vào rồi rời panel; chụp hai trạng thái.
- 10.5: kiểm tra phần tử được thêm, sau đó bấm nút xóa; chụp kết quả.
- 10.6: thử từng nút fade/slide; chụp một trạng thái ảnh ẩn/hiện.
- 10.7: rê chuột lên từng ảnh; chụp popover.
- 10.8: nhấn Animate và chụp hộp ở vị trí mới.
- 10.9–10.10: mở qua localhost/GitHub Pages, bấm Consume; chụp danh sách JSON và cards sau khi hoàn tất. Spinner chỉ hiện trong lúc request đang chờ nên có thể xuất hiện nhanh.

Các bài đều là code; không có bước thay đổi cài đặt trình duyệt như Lab 08. Các ảnh trên là ảnh kết quả tương tác để bạn tự chụp nếu cần đưa vào báo cáo.
