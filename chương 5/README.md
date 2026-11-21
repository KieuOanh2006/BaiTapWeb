# BT chương 5 – Bài 1: Hoàn thiện website E-commerce

**Tên website:** LUMIÉ BEAUTY  
**Công nghệ:** HTML5, CSS3, Bootstrap 3.4.1, jQuery, xZoom, Bootstrap Star Rating.

## 1. Cách chạy

1. Giải nén và mở thư mục `BT chương 5`.
2. Mở `index.html` bằng trình duyệt (khuyến khích dùng Live Server trong VS Code).
3. Cần có kết nối Internet để tải Bootstrap, jQuery, xZoom, Bootstrap Star Rating và Google Fonts từ CDN. Hình minh họa sản phẩm được lưu cục bộ trong `assets/images`.

## 2. Các trang

- `index.html`: Trang chủ, thanh điều hướng, banner, danh mục, tìm kiếm, sắp xếp, danh sách sản phẩm.
- `ecommerce.html`: Trang E-Commerce theo tên trong tài liệu hướng dẫn.
- `ecommerce-detail.html?id=serum-radiance`: Trang chi tiết sản phẩm, gallery xZoom, chọn dung tích/số lượng, Bootstrap Progress Bar, đánh giá sao và nhận xét.
- `cart.html`: Giỏ hàng lưu bằng `localStorage`, thay đổi số lượng, xóa sản phẩm và đặt hàng mô phỏng.
- `ecommerce-status.html`: Trang trạng thái đơn hàng minh họa.

## 3. Đối chiếu yêu cầu bài tập

- [x] Tự chọn loại hình kinh doanh: mỹ phẩm và chăm sóc da.
- [x] Xây dựng trang danh mục và trang chi tiết sản phẩm theo hướng dẫn Bootstrap.
- [x] Sử dụng xZoom cho hình ảnh lớn và các ảnh thu nhỏ ở trang chi tiết.
- [x] Dùng Bootstrap Progress Bar để thể hiện tình trạng tồn kho.
- [x] Hiển thị phần trăm giảm giá bên trái và nhãn New/Best Seller bên phải ảnh sản phẩm.
- [x] Dùng thư viện Bootstrap Star Rating (Krajee) thay cho các biểu tượng `glyphicon-star`.
- [x] Có trang trạng thái đơn hàng.
- [x] Bố cục responsive cho desktop, tablet và mobile.

## 4. Cấu trúc thư mục

```text
BT chương 5/
├── index.html
├── ecommerce.html
├── ecommerce-detail.html
├── ecommerce-status.html
├── cart.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── products.js
│   ├── app.js
│   ├── detail.js
│   └── cart.js
└── assets/
    └── images/
        ├── hero.svg
        ├── serum.svg
        ├── cleanser.svg
        ├── cream.svg
        ├── sunscreen.svg
        ├── toner.svg
        └── eyecream.svg
```

## 5. Lưu ý trước khi nộp

- Đây là giao diện thực hành front-end; đăng nhập, thanh toán và dữ liệu đơn hàng chỉ mô phỏng, chưa kết nối backend.
- Tên sản phẩm, giá, tồn kho và đánh giá là dữ liệu mẫu.
- Hình ảnh là minh họa SVG tự tạo để đảm bảo tải được cùng source code và có thể dùng thử xZoom. Nếu giảng viên yêu cầu ảnh sản phẩm chụp thực tế, có thể thay file trong `assets/images` nhưng giữ nguyên tên file hoặc cập nhật đường dẫn trong `js/products.js`.
- Khi kiểm tra, thử thêm sản phẩm vào giỏ hàng, đổi số lượng, tìm kiếm, lọc danh mục và phóng to ảnh ở trang chi tiết.
- Upload nguyên thư mục `BT chương 5` vào repository `BaiTapWeb`, không xóa các thư mục bài thực hành trước đó.
- Nếu bật GitHub Pages ở branch `main` và thư mục `/ (root)`, truy cập: `https://kieuoanh2006.github.io/BaiTapWeb/BT%20ch%C6%B0%C6%A1ng%205/`.

## 6. Thư viện sử dụng

- Bootstrap 3.4.1: https://getbootstrap.com/docs/3.4/
- xZoom 1.0.15: https://payalord.github.io/xZoom/
- Bootstrap Star Rating: https://github.com/kartik-v/bootstrap-star-rating
