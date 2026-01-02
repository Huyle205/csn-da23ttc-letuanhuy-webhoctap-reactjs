-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 02, 2026 lúc 04:57 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tvulearn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `year` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `courses`
--

INSERT INTO `courses` (`course_id`, `title`, `description`, `teacher_id`, `thumbnail`, `note`, `created_at`, `year`) VALUES
(60, 'Nhập môn lập trình', '', 42, '../src/assets/img/Thumnail/t1.jpeg', NULL, '2025-12-23 12:35:20', 1),
(61, 'Kỹ thuật lập trình', '', 42, '../src/assets/img/Thumnail/t1.jpeg', NULL, '2025-12-23 12:35:31', 1),
(63, 'Thiết kế Web', '', 42, '../src/assets/img/Thumnail/t6.jpeg', NULL, '2025-12-23 12:37:25', 2),
(65, 'Lập trình C', '', 42, '../src/assets/img/Thumnail/t3.jpeg', NULL, '2025-12-23 12:53:02', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `progress` int(11) DEFAULT 0,
  `status` enum('enrolled','completed') DEFAULT 'enrolled',
  `enrolled_at` datetime DEFAULT current_timestamp(),
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `user_id`, `course_id`, `progress`, `status`, `enrolled_at`, `note`) VALUES
(75, 44, 65, 0, 'completed', '2025-12-23 13:50:09', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lessons`
--

CREATE TABLE `lessons` (
  `lesson_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `order_index` int(11) DEFAULT 1,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lessons`
--

INSERT INTO `lessons` (`lesson_id`, `course_id`, `title`, `video_url`, `content`, `order_index`, `note`) VALUES
(206, 65, 'Bài Mở Đầu Về Lập Trình C', 'https://www.youtube.com/embed/vpqMmfkSAMo', '', 1, NULL),
(207, 65, ' Cấu Trúc Rẽ Nhánh IF ELSE', 'https://www.youtube.com/embed/4X8aXn0dMMM', ' Cấu Trúc Rẽ Nhánh IF ELSE', 2, NULL),
(208, 65, 'Cấu Trúc Rẽ Nhánh Switch Case', 'https://www.youtube.com/embed/MYtFJrmPgUg', 'Cấu Trúc Rẽ Nhánh Switch Case', 3, NULL),
(209, 65, 'Vòng Lặp For Trong C ', 'https://www.youtube.com/embed/NYCRZWPs8_w', 'Vòng Lặp For Trong C ', 4, NULL),
(210, 61, 'lập trình', 'https://www.youtube.com/embed/NYCRZWPs8_w', '', 1, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` varchar(50) DEFAULT 'info',
  `status` varchar(20) DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `question_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`options`)),
  `correct_answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `quiz_questions`
--

INSERT INTO `quiz_questions` (`question_id`, `lesson_id`, `question`, `options`, `correct_answer`) VALUES
(152, 206, 'Cú pháp in dòng chữ \"hello world\" ra màn hình', '[\" printf(\\\"hello world\\\");\",\" print(\\\"hello world\\\");\",\"write(\\\"hello world\\\\n\\\");\",\"writeln(\\\"hello world\\\\n\\\");\"]', ' printf(\"hello world\");');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quiz_results`
--

CREATE TABLE `quiz_results` (
  `result_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `total_questions` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `quiz_results`
--

INSERT INTO `quiz_results` (`result_id`, `user_id`, `lesson_id`, `course_id`, `score`, `total_questions`, `created_at`) VALUES
(8, 44, 206, 65, 1, 1, '2026-01-02 13:21:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`id`, `user_id`, `token`, `expires_at`, `created_at`) VALUES
(121, 42, 'c36211030052f16f592754fc27bb8e7a82977b5b1da4379f5c91a7779ebaeb25aacb48a64f1d23445103fda12515e475030d114f003f5126d0d1678637e9e39f', '2025-12-20 13:33:39', '2025-12-13 13:33:39'),
(122, 42, '8d4ae33b9ae6ed1e0947f3b954628578da40a865c61ac2a579620e64fcaa8ccf49426007e7e52a746887b78595bc5038ce29f9d01358bb816528f7c6a3908522', '2025-12-20 21:21:38', '2025-12-13 21:21:38'),
(124, 42, '3d3e33d70ff66a4fa01ddd4de3d619eef0dda2e489d1089c607d09e298857c187a0b72457bcf9c0b42d7007a3afe7bbc6cf548e3cded6016fefdf7e98164d239', '2025-12-20 21:42:29', '2025-12-13 21:42:29'),
(125, 42, '53e268b5f9299dcb572cf3e343b2c794bf97597d63d34a78c1fe110c068cd436335fe26c5f59ae15f0419b82c2f3e3e11576ca3d2fc81c4cb7b7701d63132828', '2025-12-20 21:58:12', '2025-12-13 21:58:12'),
(126, 42, 'dd0ae453db733f8b419833ee6d88c18eaeab13e5a5a09f1c3f576052776fc2a22e267e4eb820475d5d94120c951e98acc01a0383d8714bfc22eb41359a50c1ac', '2025-12-20 22:14:17', '2025-12-13 22:14:17'),
(134, 42, '3aa70aaa1f3a94afa26c035311779bc3363cf3d106c7936a985eaba2cbb4c430f1b391320f6dd1c9f709afb89a4185766f227261058f5f12b48bd980a3542bd4', '2025-12-20 22:56:48', '2025-12-13 22:56:48'),
(137, 42, 'c60fe3defb2df3ac4f81643ce8add1d0df06632bab5fd02a0ade48bffb9e3eb2f2dbd52aa58686673ca030aa30978b668a069e9da1ecbde332a61837acbd46b6', '2025-12-21 11:36:58', '2025-12-14 11:36:58'),
(138, 42, '9d144b049cd9758f0272fc79ceabbfcdc6e1c0259273456bd2a1324c76f32af68827765c15d42014a6b96d0af35bf0a843956ca513f7632ef93341a1c3c4eb6d', '2025-12-21 11:36:58', '2025-12-14 11:36:58'),
(139, 42, '01c4325f8c14d43d355b15a6c0d9fc6afaca02689fc11eb4fcbab0d58db8fedb758b25ed818372f08c1d67fa4234821a9ea88bca382520b2c40fdbd417351b07', '2025-12-21 11:37:12', '2025-12-14 11:37:12'),
(142, 43, '552168a0443fa909b936b9a0d5a5528794dba82f6e451e0fe7df77c2bcd59a9874d6f380a3bf6c68fda0e282836dd0197c605a566d34fb26b23f57be7e6b70ec', '2025-12-21 12:21:23', '2025-12-14 12:21:23'),
(143, 43, '9c59056caf8305475c1e6f7d0eeabd0cf59b77783343cfdece49bdf86e882716b4b8c9644ececb14a78baef33e4ee14cbfb8d970df9dc38973b709964a920c65', '2025-12-21 12:21:24', '2025-12-14 12:21:24'),
(144, 43, '6b72aa2457b8f6e9c964d7cb0c24e8360eedc8c769ac31989e3e9c7d8535bcfabfd461c9772ea51035abbbd403f6befd0ecb79f148118f31bbbbbe47d50834c8', '2025-12-21 12:21:34', '2025-12-14 12:21:34'),
(149, 42, 'd00e4027909a66f0089face8390fd07509aadd721fe775258aa7991c42b082ff056d10e314a5306e24ebdb3e3a92b836861c3383ee0f9663e6e0ffd56e0fe236', '2025-12-26 23:38:26', '2025-12-19 23:38:26'),
(156, 42, '44ac90a3045b209c532e6efd578a9b097dae4630593c5e04070215701f9cc9e440c41909f98369688f81641929dea7769aacb8052e6bfb5aac8a06baf64cb73f', '2025-12-26 23:53:08', '2025-12-19 23:53:08'),
(158, 42, '9d14bd15ab3eb620ac795e2d064e2f2c59c92a1e8864c2a25b98ed49f3a804c4c16b8c88afee46169eec04641447b67a4af1ee198dd945ffff7291514c4dcc4c', '2025-12-27 00:26:01', '2025-12-20 00:26:01'),
(161, 42, 'b25147581737b27c8226121cbd0c31d53e8be64e33e8b59667c8d67f5f44f0e430819361dabe46189844b8c39ff75837a20e6f9b1b60023b7aba7910e7ba5bfd', '2025-12-29 21:16:36', '2025-12-22 21:16:36'),
(162, 42, '456c5027846fc5fdf904255e2575f8b8cf5f4d50287cb61704470f9e1d849e48c01319672538c58ec79f352017e05534a47de4ce67c86d70324ab8aaa12bc365', '2025-12-29 21:16:36', '2025-12-22 21:16:36'),
(165, 42, '8d801f1f7f665d271cc8c2430503c593407a17f176822c768a5a9b53c87c989b2f8238cfb397b4ccf1a09fc4050dc2bee50b030c221b330c4ec233020e5eff07', '2025-12-30 10:36:12', '2025-12-23 10:36:12'),
(167, 42, 'eb252876a0427d0dd7517408405d60231316aa65d05d32a5fc5bd014948ee67138101448d6ef5366405cce673a4db508bb884402d21bf2b26dde2d4aa430e2dd', '2025-12-30 10:55:27', '2025-12-23 10:55:27'),
(172, 42, '26c5b5641849656b6f030216d721422ff304e6d7f44917b3dbb3d58d669c37929bfb10a08cfe014f621eaec09cf73ef9c5bc1fd849ed1cf253fb31123d9a8254', '2025-12-30 11:51:41', '2025-12-23 11:51:41'),
(184, 42, '022344ba3e861f4939b9397b9717a4f76fb76ed257c257c768ef3f00f0a7837ebfa41624affd5b6b57f6c6a3afee5cc82d5eefbff20a82ab371f435ae2d00c38', '2025-12-30 15:38:02', '2025-12-23 15:38:02'),
(188, 44, 'e7e484bdcd3ad6a7cf0957e9ccf81a77603445bde11ec4494e8b6c24025710d91d0e043ba85f59b92edb5132e8ab23cd56d1ed7844846f8c28cfb81c1da84b14', '2026-01-08 13:01:39', '2026-01-01 13:01:39'),
(192, 43, '89ff0333d3a0bc2df482bc856364c4bae3f27554abc75ea875e0b1e01c1f3d08394c1d5bb5a5f05498aa3db7d853a75477dd4407cb609f59db63042c5c053b24', '2026-01-09 22:55:59', '2026-01-02 22:55:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','teacher','student') DEFAULT 'student',
  `note` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `role`, `note`, `created_at`) VALUES
(42, 'Giảng viên test', 'teacher@test.com', '$2b$10$uf2HFEhO3i.tAEm.qroYe.0Ta4FrPkvlA2PO2Uc.d4Q7xdsZenetS', 'teacher', NULL, '2025-12-13 12:28:54'),
(43, 'adimin test', 'admin@test.com', '$2b$10$.5gnSQnhp61oBhLsLbNqgOQXafpUZgwbnP6YjNVxTVmNQPBqaKUTS', 'admin', NULL, '2025-12-14 12:09:44'),
(44, 'user', 'user@gmail.com', '$2b$10$xZv5pFE.rBDTr4vjp9FkXuUNcY/z9fAHPuTY3h5X8OuEn3uRcxI7u', 'student', NULL, '2025-12-23 11:36:04'),
(45, 'nguyễn văn A', 'nguyenvana@test.com', '$2b$10$Q2cgT2kZx1d6kqe4URZ5cuFlVWUY2my.49MW4KEtfl/CykjNvtsVC', 'teacher', NULL, '2025-12-23 17:41:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_progress`
--

CREATE TABLE `user_progress` (
  `progress_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `completed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user_progress`
--

INSERT INTO `user_progress` (`progress_id`, `user_id`, `course_id`, `lesson_id`, `completed`, `completed_at`) VALUES
(385, 44, 65, 206, 1, '2025-12-23 13:50:28');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Chỉ mục cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`lesson_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Chỉ mục cho bảng `quiz_results`
--
ALTER TABLE `quiz_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `lesson_id` (`lesson_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD UNIQUE KEY `unique_progress` (`user_id`,`lesson_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT cho bảng `lessons`
--
ALTER TABLE `lessons`
  MODIFY `lesson_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT cho bảng `quiz_results`
--
ALTER TABLE `quiz_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT cho bảng `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=398;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Các ràng buộc cho bảng `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `quiz_results`
--
ALTER TABLE `quiz_results`
  ADD CONSTRAINT `quiz_results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `quiz_results_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`),
  ADD CONSTRAINT `quiz_results_ibfk_3` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Các ràng buộc cho bảng `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `user_progress_ibfk_3` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
