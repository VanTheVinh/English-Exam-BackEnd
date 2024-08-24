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
1. Tạo thư mục trống chứa mã nguồn dự án (Ví dụ: English Exam)
2. Mở thư mục vừa tạo trên VS Code
3. Mở Terminal 
- Gõ lệnh `git -v`, sẽ sang bước tiếp theo nếu kết quả là:

   ```bash
   git version 2.46.0.windows.1 (Hoặc các phiên bản khác)
   ```
   Nếu không bạn cần đến trang [Git download](https://git-scm.com/downloads) để tải phiên bản Git về máy.
- Gõ lệnh `node -v`, sẽ sang bước tiếp theo nếu kết quả là:

   ```bash
   v20.16.0
   ```
   Nếu không hãy vào trang [Node.js version 20](https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi) để tải Node về máy.
- Gõ lệnh `git init` để khởi tạo một Repository Git mới trong thư mục hiện tại
4. Clone Repository từ Github về máy
- Sau lệnh khởi tạo Repository Git, tiếp tục gõ lệnh:
   ```bash
   git clone https://github.com/VanTheVinh/English-Exam-BackEnd.git
- Di chuyển tới thư mục chứa mã nguồn
   ```bash
   cd English-Exam-BackEnd
   ```
- Gõ lệnh `npm i` để cài đặt tất cả các gói cần thiết cho dự án
- Nếu không có lỗi gì gõ tiếp lệnh `npm start` để chạy dự án
- Chạy thành công Folder Back-end, ở terminal sẽ giống ảnh bên dưới

<img src="https://i.imgur.com/7KeZAIL.png" alt="image info" style="width:400px; margin-left:24px;"/>

- Sau khi chạy thành công Back-end hệ thống sẽ tự chạy trên http://localhost:8000/, đường dẫn nối trình duyệt Front-End là http://localhost:3000/
- Dùng Postman để kiểm tra các API, link tải Postman (https://www.postman.com/downloads/)

