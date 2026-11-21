# Bài 3 – Hoàn thiện game Flappy Bird

**Sinh viên:** Nguyễn Kiều Oanh · **MSSV:** 31241025891  
**Bài hướng dẫn nền tảng:** [Viết game Flappy Bird đơn giản với HTML, CSS và jQuery – Freetuts](https://freetuts.net/viet-game-flappy-bird-don-gian-voi-html-css-va-jquery-713.html)

## Mục tiêu

Tạo game Flappy Bird bằng HTML, CSS, JavaScript và jQuery. Game giữ cơ chế chim bay nhờ lực nâng, trọng lực kéo xuống, ống chạy ngang, ống có độ cao ngẫu nhiên, kiểm tra va chạm và cộng điểm khi vượt qua ống. Bird, pipe và background là SVG tự thiết kế cho bài này.

## Cấu trúc thư mục

```text
Flappy-Bird/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── sprites/
    ├── bird.svg
    ├── pipe.svg
    └── bg.svg
```

## Công nghệ

- HTML5 và CSS3 để dựng giao diện, hiệu ứng, responsive layout và SVG.
- JavaScript với jQuery để xử lý bàn phím, chuyển động, va chạm, tính điểm và trạng thái game.
- LocalStorage để lưu điểm cao nhất trên trình duyệt.
- jQuery 3.7.1 được tải từ CDN; game không dùng framework game, Canvas hay tài nguyên hình ảnh bên ngoài.

## Chạy game

Mở `index.html` trong trình duyệt. Có thể chạy qua VS Code Live Server hoặc GitHub Pages. Cần kết nối Internet để tải jQuery từ CDN; các hình ảnh SVG được lưu ngay trong thư mục `sprites/`.

## Điều khiển

- Nhấn **Enter** hoặc nút **Bắt đầu chơi** để bắt đầu.
- Nhấn và giữ **ArrowDown (↓)** để tạo lực bay lên; thả phím để chim rơi theo trọng lực. Giữ phím có giới hạn lực nâng, tránh tăng vận tốc vô hạn.
- Nhấn **P** hoặc nút tạm dừng để pause/resume.
- Sau Game Over hoặc Victory, nhấn **Enter** hoặc nút chơi lại.
- Chuột không điều khiển chuyển động của chim.

## Level và interval

| Điểm | Level | Interval game loop |
|---:|---:|---:|
| 0–4 | 1 | 40 ms |
| 5–19 | 2 | 30 ms |
| 20–39 | 3 | 25 ms |
| 40–49 | 4 | 20 ms |
| 50 | Chiến thắng | Dừng game |

Khi lên level, interval cũ được xóa trước khi tạo interval mới. Khoảng ống và tốc độ di chuyển cũng tăng độ khó từ từ; mốc điểm và interval yêu cầu không đổi.

## Tính năng

- Điều khiển bay bằng giữ/thả ArrowDown, chặn cuộn trang khi nhấn phím.
- Trọng lực, lực nâng có giới hạn và góc nghiêng theo vận tốc.
- Ống trên/dưới đồng bộ, khe hở và chiều cao thay đổi ngẫu nhiên.
- Mỗi cặp ống giữ nguyên chiều cao và khe hở trong suốt lượt đi ngang; chỉ tạo ngẫu nhiên khi cặp trước đã ra khỏi màn hình. Mỗi frame chỉ cập nhật tọa độ ngang.
- Va chạm với ống, trần và mặt đất; mỗi cặp ống chỉ cộng tối đa 1 điểm.
- Tự đổi interval theo level và dừng đúng tại 50 điểm với màn hình Victory.
- Pause/resume, Game Over, restart và high score lưu bằng LocalStorage.
- Thông báo chuyển level có hiệu ứng nhẹ.

## Checklist kiểm tra

- [ ] Mở game trên Chrome; kiểm tra chim đeo kính hồng, background có chữ ký Kiều Oanh NO.1 và SVG ống.
- [ ] Enter bắt đầu; giữ/thả ArrowDown làm chim bay lên/rơi xuống; trang không cuộn; chuột không làm chim bay.
- [ ] Va vào ống, trần hoặc đất thì dừng game; restart đưa điểm và level về trạng thái đầu.
- [ ] Mỗi cặp ống chỉ được tính 1 điểm; điểm cao nhất còn sau khi tải lại trang.
- [ ] Pause dừng chuyển động và tính điểm; resume tiếp tục game.
- [ ] Kiểm tra mốc 4/5, 19/20, 39/40 và 49/50; interval lần lượt là 40/30/25/20 ms; đạt 50 thì hiện Victory và dừng.
- [ ] Kiểm tra giao diện ở chiều rộng desktop và điện thoại.

Các hành vi tương tác cần được chơi trực tiếp trên Chrome để xác nhận hình ảnh, cảm giác điều khiển và độ khó thực tế.
