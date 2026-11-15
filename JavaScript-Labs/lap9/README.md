# Lab 09 — JavaScript 2: DOM and Events

Mở `index.html` để vào đủ 8 bài. Các trang dùng source HTML, CSS, ảnh và dữ liệu mẫu từ ZIP giảng viên; những trang thiếu trong source (9.6) đã được bổ sung. Lab09.pdf được giữ trong thư mục để đối chiếu.

## Bài thực hành

| Bài | Trang | Nội dung |
|---|---|---|
| 9.1 | `lab09-walkthrough01.html` | DOM selection, `innerHTML`/`innerText`, attributes, tag/class/query selectors, ẩn textarea và đổi màu features. |
| 9.2 | `lab09-walkthrough02.html` | Quan hệ cha/con/anh em; `childNodes`, `nodeType`; đổi màu các node phần tử. Có các lệnh Console trong quy trình bên dưới. |
| 9.3 | `lab09-walkthrough03.html` | Tạo text/paragraph, append vào DOM và xóa list item. |
| 9.4 | `lab09-walkthrough04.html` | `addEventListener`, click để ẩn/hiện đoạn văn, mouseover/mouseout đổi kiểu ảnh. |
| 9.5 | `lab09-walkthrough05.html` | Load event để truy cập phần tử sau khi DOM tải xong. |
| 9.6 | `lab09-walkthrough06.html` | Hover năm hộp để dừng ở breakpoint và kiểm tra event target. |
| 9.7 | `lab09-walkthrough07.html` | Focus/blur đổi màu nền input. |
| 9.8 | `lab09-walkthrough08.html` | Chặn submit khi thiếu trường, focus trường đầu tiên và hiện lỗi trong trang. |

## Thao tác trình duyệt và ảnh minh chứng cần tự chụp

- **9.1:** mở trang và chụp tiêu đề đã đổi, vùng features nền xanh. Textarea cuối cùng được ẩn theo bước cuối của đề.
- **9.2:** mở DevTools → Console ở `lab09-walkthrough02.html`, chạy lần lượt:
  - `document.getElementById("first")`
  - `document.getElementById("first").firstChild`
  - `document.getElementById("first").nextElementSibling`
  - `document.getElementById("first").parentNode`
  - `var stories = document.getElementById("stories"); for (i=0; i<stories.childNodes.length; i++) { console.log("child " + i + " =", stories.childNodes[i], "nodeType=", stories.childNodes[i].nodeType); }`
  Sau đó xem các node phần tử được tô xanh. Chụp Console và trang kết quả.
- **9.3:** dùng Inspect/Elements để xem paragraph mới và list item đã bị xóa; chụp kết quả.
- **9.4:** thử click Hide/Show, rê chuột vào/rời ảnh; chụp ảnh ở trạng thái grayscale và đoạn văn ẩn/hiện.
- **9.5:** đề yêu cầu nhận biết lỗi chạy trước DOM, rồi sửa bằng `load`. Phiên bản hoàn chỉnh đã sửa. Để tái hiện lỗi, tạm thay nội dung `js/lab09-walkthrough05.js` bằng `var divToGet = document.getElementById("div1"); alert(divToGet.innerHTML);`, lưu và tải lại trang (script nằm trong `<head>`); chụp lỗi truy cập `innerHTML` của null. Khôi phục code có `load` listener, tải lại và chụp alert “This is div 1”. Không để code lỗi trong bản cuối.
- **9.6:** DevTools → Sources, mở `js/lab09-walkthrough06.js`, đặt breakpoint ở dòng `alert`, tải lại rồi rê qua hộp. Khi debugger tạm dừng, chụp màn hình có dòng breakpoint và các biến `e`/`e.target`; Resume để tiếp tục.
- **9.7:** Tab qua các trường form và chụp lúc một trường đang focus (nền vàng); chuyển focus ra ngoài để xem nền trắng.
- **9.8:** submit form rỗng và chụp danh sách trường thiếu; điền đủ dữ liệu, submit và chụp kết quả không báo lỗi.

Đây là các thao tác tương tác trình duyệt/DevTools nên mình không tạo ảnh giả thay cho minh chứng. Hãy chụp màn hình trên trình duyệt của bạn và chèn vào báo cáo.


