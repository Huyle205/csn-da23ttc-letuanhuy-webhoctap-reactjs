Thông tin tác giả:

- Họ tên: lê Tuấn Huy

- MSSV: 110123105

- Lớp: DA23TTC

- Email: letuanhuy04062005@gmail.com





# TVULEARN – Website hỗ trợ học tập cho sinh viên CNTT Trường Đại học Trà Vinh



##  Giới thiệu

TVULEARN là website hỗ trợ học tập trực tuyến dành cho sinh viên ngành Công nghệ thông tin Trường Đại học Trà Vinh.  

Hệ thống giúp sinh viên xem lại bài học, ôn tập kiến thức và làm bài kiểm tra trắc nghiệm một cách linh hoạt thông qua nền tảng web.



Đồ án được thực hiện nhằm áp dụng kiến thức đã học vào xây dựng một hệ thống học tập trực tuyến theo mô hình Client – Server, phù hợp với xu hướng chuyển đổi số trong giáo dục.



---



## Mục tiêu của đồ án

- Xây dựng hệ thống học tập trực tuyến phục vụ sinh viên CNTT.

- Hỗ trợ sinh viên ôn tập kiến thức thông qua bài học và quiz trắc nghiệm.

- Phân quyền rõ ràng giữa sinh viên, giảng viên và quản trị viên.

- Áp dụng các công nghệ web hiện đại vào thực tế.



---



##  Chức năng chính



###  Sinh viên

- Đăng ký / đăng nhập hệ thống

- Tham gia khóa học

- Học bài theo từng khóa

- Làm bài kiểm tra trắc nghiệm

- Xem tiến trình học tập và kết quả



###  Giảng viên

- Tạo và quản lý khóa học

- Thêm bài học cho từng khóa

- Tạo và quản lý quiz trắc nghiệm



###  Quản trị viên

- Quản lý tài khoản người dùng

- Quản lý khóa học

- Quản lý hệ thống và phân quyền



---



##  Kiến trúc hệ thống

- Mô hình: \*\*Client – Server\*\*

- Frontend và Backend tách rời

- Giao tiếp thông qua \*\*RESTful API\*\*

- Xác thực và phân quyền bằng \*\*JWT\*\*



---



##  Công nghệ sử dụng


### Frontend

- ReactJS

- Vite

- Tailwind CSS



### Backend

- Node.js

- ExpressJS



### Database

- MySQL

- phpMyAdmin

### Xác thực & phân quyền

- JSON Web Token (JWT)

- Access Token \& Refresh Token



---



##  Cơ sở dữ liệu

Hệ thống sử dụng cơ sở dữ liệu MySQL gồm các bảng chính như:

- users

- accounts

- roles

- courses

- lessons

- quizzes

- quiz_questions

- quiz_results

- enrollments

