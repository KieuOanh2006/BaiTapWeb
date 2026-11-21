# Bài 2 – jQuery LMS | Advance Front-end

Thực hành đọc nội dung môn học UEH đang mở (Course ID `43861`) bằng jQuery. Script không chứa tên chủ đề, bài tập hay deadline được viết sẵn; tất cả kết quả được đọc từ DOM hiện tại sau khi sinh viên đăng nhập.

## Cấu trúc

- `index.html`: trang giới thiệu và hướng dẫn.
- `jquery-lms.js`: script chạy trong Console của trang LMS.
- `style.css`: giao diện trang hướng dẫn.

## Chạy và kiểm tra trên LMS

1. Mở Chrome và truy cập <https://lms.ueh.edu.vn/course/view.php?id=43861>.
2. Đăng nhập bằng tài khoản sinh viên của bạn; không cung cấp mật khẩu cho người khác.
3. Mở đúng trang môn học Course ID `43861`.
4. Mở DevTools bằng `F12`, chọn tab **Console**.
5. Mở `jquery-lms.js` bằng VS Code hoặc trình soạn thảo, sao chép toàn bộ file, dán vào Console của tab LMS rồi nhấn `Enter`.
6. Xem phần “Bài tập thứ 5”, danh sách bài tập và bảng thống kê chủ đề được chèn vào đầu trang. Tên bài tập thứ 5 cũng được ghi trong Console.
7. Chạy lại script sau khi tải lại trang nếu muốn cập nhật dữ liệu. Khi chạy lại, bảng cũ sẽ được thay thế.

Script chỉ truy vấn DOM trên trang môn học đang mở, không dùng iframe, không tải trang khác, không gửi dữ liệu ra mạng và không sửa nội dung khóa học. Bảng kết quả là một panel riêng có thể đóng.

## Cách đọc dữ liệu và chẩn đoán

- Bài tập lấy bằng selector `.modtype_assign`; tên lấy từ `.instancename`, như ví dụ giảng viên cung cấp. Danh sách được đánh số từ 1.
- Chủ đề được dò qua các cấu trúc section thường gặp của Moodle (`.course-content .section`, `li.section`, `.course-section`). Chỉ các section thực sự có tiêu đề nhận diện được mới được dùng; script không tự suy ra tên chủ đề.
- Deadline được tìm trong phần tử bài tập và các vùng thông tin kề nó, ưu tiên nhãn có nghĩa như “Due date”, “Hạn nộp”, “Ngày đến hạn”. Nếu không tìm thấy thì hiển thị “Chưa xác định deadline”.
- Chủ đề không có bài tập vẫn được đưa vào bảng nếu selector chủ đề và tiêu đề được nhận diện.
- Nếu jQuery chưa được tải, script dừng an toàn và báo cách xử lý. Không dán mã jQuery ngoài trang LMS nếu chính sách môn học hoặc trình duyệt của bạn không cho phép.
- Nếu bảng chẩn đoán báo không nhận diện được chủ đề hoặc deadline, mở Inspect Element trên trang đã đăng nhập để kiểm tra DOM thực tế. Không coi dữ liệu chưa nhận diện là dữ liệu trống hay deadline đã biết.

## Kiểm tra cần thực hiện

Có thể kiểm tra giao diện hướng dẫn bằng cách mở `index.html`. Kết quả LMS thực tế chỉ xác nhận được khi bạn đăng nhập và chạy `jquery-lms.js` trong trang môn học; môi trường phát triển này không có phiên đăng nhập UEH nên không thể xác minh tên bài, chủ đề hoặc deadline của tài khoản.
