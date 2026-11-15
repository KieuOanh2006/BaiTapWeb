# Lab 08 — JavaScript 1: Language Foundations

Mở `index.html` trong trình duyệt để vào trang điều hướng. Mỗi trang dùng đường dẫn tương đối, phù hợp chạy trực tiếp hoặc triển khai GitHub Pages trong thư mục `lap8`.

## Nội dung và cách chạy

| Bài | Trang | Nội dung |
|---|---|---|
| 8.1 | `lab08-exercise01.html` | Trang minh chứng ảnh chụp cài đặt Chrome bật/tắt JavaScript. |
| 8.2 | `lab08-walkthrough02.html` | JavaScript nhúng trong head gọi alert “Hello World!”. |
| 8.3 | `lab08-exercise03.html` | `js/hello.js`, `document.write`, `count` và `count++`. |
| 8.4 | `lab08-exercise04.html` | Cùng external script và thẻ `noscript`. |
| 8.5 | `lab08-exercise05.html` | `console.log/warn/error`, biến toàn cục để xem và hướng dẫn cố ý tạo rồi sửa lỗi đánh máy. |
| 8.6 | `lab08-walkthrough06.html` | String object/literal, `typeof`, `==`/`===`, Date, Math. |
| 8.7 | `lab08-walkthrough07.html` | Mảng ngày, push/unshift, vòng lặp, tên dài và lịch 30 ngày. |
| 8.8 | `lab08-exercise08.html` | Hàm `outputBox(num)`, return HTML, năm hộp và phạm vi biến. |
| 8.9 | `lab08-exercise09.html` | Thuế Canada 5%, các dạng hàm, truyền hàm làm tham số; ví dụ $15 × 2 cho thuế $1.50 và tổng $31.50. |
| 8.10 | `lab08-exercise10.html` | Object constructor/literal, dot/bracket, constructor `order`, `total`, `output`. |
| 8.11 | `lab08-walkthrough11.html` | Mảng country objects, vòng lặp, `c`, bracket notation động, cờ trong `flags/`. |

Các trang walkthrough 06–11 dùng tên file gốc trong source mẫu. Các trang 8.3–8.5 có phiên bản riêng để giữ đủ các bước nối tiếp của bài.

## Thao tác cần làm trực tiếp

- **8.1:** bật JavaScript, mở trang 8.2 và xác nhận alert; tắt JavaScript, tải lại để xác nhận alert không hiện; sau đó bật lại. Trang 8.1 liên kết đến `enable-javascript.com` theo yêu cầu bài.
- **8.5:** F12 → Console. Tạm viết sai `document` thành `doccumment` trong `js/hello.js`, lưu và tải lại để thấy ReferenceError; sửa đúng, tải lại và xác nhận hết lỗi. Nhập `count`, `output`, `temp` trong Console để quan sát. Bản làm xong để code đúng.
- **8.8:** thử nhập `box` trong Console để xem biến cục bộ không truy cập được; có thể bỏ `var` tạm thời để quan sát khác biệt, rồi khôi phục.
- 8.6 có `Math.random()` nên kết quả thay đổi mỗi lần tải; Date cũng theo ngày chạy. Đây là dữ liệu động theo yêu cầu.

## Tài nguyên mẫu

Giữ nguyên `js/travel-data.js` và ảnh cờ gốc trong `flags/`; `countries` nguồn là danh sách có sẵn trong source mẫu. PDF hướng dẫn Lab 08 nằm trong ZIP nguồn tại `Lab08.pdf`.


### Ảnh minh chứng 8.1

Lưu ảnh bật/tắt bạn đã chụp vào images/evidence/javascript-enabled.png và images/evidence/javascript-disabled.png; trang 8.1 hiển thị chúng với chú thích tương ứng.

