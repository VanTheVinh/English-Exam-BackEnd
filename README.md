# ENGLISH EXAM WEB - BACKEND

> ## Giới thiệu
English Exam Web - Backend là một phần của hệ thống English Exam Web, hỗ trợ quản lý và xử lý dữ liệu cho trang web thi tiếng Anh.
Phần backend cung cấp API cho các chức năng của học sinh và giáo viên, như quản lý lớp học, bài thi, câu hỏi và kết quả thi.

> ## Các chức năng chínhCác chức năng chính
### Chức năng chung
- **Xác thực và phân quyền người dùng**: Hỗ trợ đăng nhập, đăng xuất và bảo vệ các route cần thiết thông qua middleware xác thực.
- **Quản lý dữ liệu**: Xử lý các yêu cầu CRUD (Tạo, Đọc, Cập nhật, Xóa) cho các tài nguyên như lớp học, học sinh, bài thi, câu hỏi, và kết quả thi.
  
### Học sinh
- **Truy cập bài thi**: Sau khi đăng nhập thành công, học sinh có thể nhận danh sách bài thi từ API.
- **Làm bài thi**: Hiện danh sách câu hỏi từ API.
- **Nộp bài**: Sau khi nộp bài, hệ thống sẽ tính điểm và lưu kết quả vào cơ sở dữ liệu.
- **Xem điểm**: Học sinh có thể sử dụng API để lấy lịch sử thi và xem điểm số của mình.
  
### Giáo viên
- **Quản lý lớp học**: API hỗ trợ các thao tác thêm, sửa, xóa, và xem thông tin chi tiết của lớp học.
- **Quản lý bài thi**: Giáo viên có thể tạo, chỉnh sửa, và xóa bài thi thông qua API.
- **Quản lý ngân hàng câu hỏi**: Hỗ trợ tạo mới, sửa, và xóa câu hỏi cho các bài thi thông qua API.
  
> ## Cài đặt và chạy dự án
1.Tạo một thư mục trống chứa mã nguồn dự án backend (Ví dụ: English-Exam-BackEnd).
2.Mở thư mục vừa tạo trên VS Code.
3.Mở Terminal và kiểm tra xem Git và Node.js đã được cài đặt chưa.

Gõ lệnh git -v, nếu kết quả trả về như bên dưới, chuyển sang bước tiếp theo:
bash
Copy code
git version 2.46.0.windows.1 (Hoặc các phiên bản khác)
Nếu Git chưa được cài đặt, tải Git tại Git download.

Gõ lệnh node -v, nếu kết quả trả về như bên dưới, chuyển sang bước tiếp theo:
bash
Copy code
v20.16.0
Nếu Node.js chưa được cài đặt, tải Node.js tại Node.js version 20.

Khởi tạo một Repository Git mới:

bash
Copy code
git init
Clone Repository từ GitHub về máy:

bash
Copy code
git clone https://github.com/VanTheVinh/English-Exam-BackEnd.git
Di chuyển vào thư mục chứa mã nguồn:

bash
Copy code
cd English-Exam-BackEnd
Cài đặt các gói cần thiết:

bash
Copy code
npm i
Khởi chạy dự án:

bash
Copy code
npm start
Nếu chạy thành công, terminal sẽ giống như hình dưới đây:

<img src="https://i.imgur.com/7KeZAIL.png" alt="image info" style="width:400px; margin-left:24px;"/>
Kết nối với Frontend
Sau khi chạy thành công cả Frontend và Backend, hệ thống sẽ tự động mở trình duyệt với địa chỉ http://localhost:3000. Nếu không, bạn có thể mở trình duyệt và nhập URL này để truy cập trang web.
