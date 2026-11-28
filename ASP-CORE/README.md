# Bài tập cá nhân ASP.NET Core MVC

**Sinh viên** Nguyễn Kiều Oanh · **MSSV** 31241025891

**Website** [Danh sách phim trên Somee](http://uehptudw31241025891.somee.com/)

## Mục tiêu

Xây dựng website giới thiệu phim, quản lý danh mục và thực hành quy trình đặt hàng từ giỏ hàng đến lưu đơn và gửi thư xác nhận.

## Công nghệ và chức năng

- .NET 10, ASP.NET Core MVC, Razor, Bootstrap, Entity Framework Core và SQL Server.
- Danh sách phim dạng lưới, các trang tạo, sửa, xem, xóa phim và thể loại, cùng chức năng tải ảnh phim.
- Đăng ký, đăng nhập và đăng xuất qua ASP.NET Core Identity.
- Giỏ hàng lưu trong Session, hỗ trợ tăng số lượng, xóa sản phẩm, tính tổng tiền và hiển thị tóm tắt trên thanh menu.
- Checkout kiểm tra thông tin giao hàng rồi lưu hóa đơn, chi tiết hóa đơn và thông tin giao hàng. Nếu đã cấu hình Gmail SMTP, ứng dụng gửi email xác nhận sau khi lưu đơn.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `SourceCode/31241025891_NguyenKieuOanh/` | Dự án MVC, tệp `.csproj` và `Program.cs` |
| `Controllers/`, `Models/`, `Views/` | Các thành phần MVC |
| `Data/`, `Migrations/` | DbContext và migration SQL Server |
| `Extension/`, `Validation/` | Session, email và kiểm tra dữ liệu |
| `wwwroot/` | CSS, JavaScript và ảnh phim |
| `Report/` | Vị trí bổ sung báo cáo Word khi có bản cuối |

## Cấu hình và chạy

Cài .NET 10 SDK và chuẩn bị một cơ sở dữ liệu SQL Server mà bạn có quyền truy cập. Từ thư mục gốc của repository, chạy trong PowerShell:

~~~powershell
Set-Location ASP-CORE/SourceCode/31241025891_NguyenKieuOanh
dotnet restore
dotnet build
~~~

`appsettings.example.json` minh họa các khóa cấu hình. Nhập giá trị thật vào **User Secrets**. Dự án đã có `UserSecretsId`. Trên Windows, mở tệp User Secrets trong VS Code bằng các lệnh sau:

~~~powershell
$secretFolder = Join-Path $env:APPDATA 'Microsoft\UserSecrets\aspnet-_31241025891_NguyenKieuOanh-ce6872c8-a34a-4047-8b8d-7e983b40700a'
New-Item -ItemType Directory -Path $secretFolder -Force | Out-Null
code (Join-Path $secretFolder 'secrets.json')
~~~

Thêm các mục sau vào tệp, giữ lại các mục khác nếu tệp đã có nội dung:

~~~json
{
  "ConnectionStrings": {
    "DefaultConnection": "<chuỗi kết nối SQL Server của bạn>"
  },
  "Email": {
    "Address": "<địa chỉ Gmail gửi thư>",
    "AppPassword": "<mật khẩu ứng dụng Google>"
  }
}
~~~

`ConnectionStrings:DefaultConnection` là bắt buộc. `Email:Address` và `Email:AppPassword` chỉ cần khi muốn gửi email xác nhận. Giữ các giá trị thật trong User Secrets trên máy.

Nếu dùng cơ sở dữ liệu mới, cài công cụ `dotnet-ef` phiên bản 10 nếu cần và chạy `dotnet ef database update` để tạo bảng. Với CSDL đã áp dụng các migration, chạy ứng dụng trực tiếp.

~~~powershell
dotnet dev-certs https --trust
dotnet run --launch-profile https
~~~

Mở đường dẫn HTTPS hiện trong terminal và vào `/Movies`. Profile mặc định của dự án dùng `https://localhost:7029/Movies`.
