-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 13, 2025 lúc 05:31 AM
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
(8, 'Nhập môn Công nghệ thông tin', 'Giới thiệu cơ bản về CNTT.', NULL, 'http://localhost:5173/src/assets/img/courses/nhapmoncntt.jpg', NULL, '2025-11-26 20:24:20', 1),
(9, 'Tin học đại cương', 'Máy tính và ứng dụng.', NULL, 'http://localhost:5173/src/assets/img/courses/THDC.jpeg', NULL, '2025-11-26 20:24:20', 1),
(10, 'Cấu trúc dữ liệu căn bản', 'Học về các cấu trúc dữ liệu cơ bản.', NULL, 'http://localhost:5173/src/assets/img/courses/CTDLCB.jpeg', NULL, '2025-11-26 20:24:20', 1),
(11, 'Lập trình căn bản', 'Làm quen lập trình.', NULL, 'http://localhost:5173/src/assets/img/courses/LTCB.jpeg', NULL, '2025-11-26 20:24:20', 1),
(12, 'Toán rời rạc', 'Kiến thức toán nền tảng.', NULL, 'http://localhost:5173/src/assets/img/courses/TRR.jpeg', NULL, '2025-11-26 20:24:20', 1),
(13, 'Cơ sở dữ liệu', 'Học SQL và mô hình CSDL.', NULL, 'http://localhost:5173/src/assets/img/courses/CSDL.jpeg', NULL, '2025-11-26 20:24:20', 2),
(14, 'Mạng máy tính', 'Kiến thức mạng căn bản.', NULL, 'http://localhost:5173/src/assets/img/courses/MMT.jpeg', NULL, '2025-11-26 20:24:20', 2),
(15, 'Lập trình hướng đối tượng', 'OOP với Java hoặc C#.', NULL, 'http://localhost:5173/src/assets/img/courses/LTHDT.jpeg', NULL, '2025-11-26 20:24:20', 2),
(16, 'Thiết kế Web', 'HTML CSS JS.', NULL, 'http://localhost:5173/src/assets/img/courses/TKW.jpeg', NULL, '2025-11-26 20:24:20', 2),
(18, 'Hệ điều hành', 'Hoạt động của hệ điều hành.', NULL, 'http://localhost:5173/src/assets/img/courses/HDH.jpeg', NULL, '2025-11-26 20:24:20', 2),
(20, 'Công nghệ phần mềm', 'Quy trình phát triển phần mềm.', NULL, 'http://localhost:5173/src/assets/img/courses/CNPM.jpeg', NULL, '2025-11-26 20:24:20', 3),
(22, 'An toàn bảo mật thông tin', 'Kiến thức bảo mật.', NULL, 'http://localhost:5173/src/assets/img/courses/ATTT.jpeg', NULL, '2025-11-26 20:24:20', 3),
(23, 'Trí tuệ nhân tạo', 'AI cơ bản.', NULL, 'http://localhost:5173/src/assets/img/courses/TTNT.jpeg', NULL, '2025-11-26 20:24:20', 3),
(27, 'Đồ án chuyên ngành', 'Xây dựng dự án thực tế.', NULL, 'http://localhost:5173/src/assets/img/courses/DACN.jpeg', NULL, '2025-11-26 20:24:20', 4);

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
(36, 33, 20, 0, 'enrolled', '2025-12-10 22:42:12', NULL),
(37, 33, 16, 0, 'enrolled', '2025-12-10 22:42:25', NULL),
(38, 33, 12, 0, 'enrolled', '2025-12-10 23:08:03', NULL),
(39, 33, 8, 0, 'enrolled', '2025-12-10 23:08:50', NULL),
(40, 33, 9, 0, 'enrolled', '2025-12-11 15:06:02', NULL),
(41, 33, 10, 0, 'enrolled', '2025-12-11 15:06:15', NULL),
(42, 33, 11, 0, 'enrolled', '2025-12-11 15:07:46', NULL),
(43, 33, 13, 0, 'enrolled', '2025-12-11 15:14:38', NULL),
(44, 33, 27, 0, 'enrolled', '2025-12-11 15:18:12', NULL),
(45, 33, 22, 0, 'enrolled', '2025-12-11 15:18:16', NULL),
(46, 33, 23, 0, 'enrolled', '2025-12-11 15:21:00', NULL),
(47, 33, 14, 0, 'enrolled', '2025-12-11 19:25:36', NULL),
(48, 36, 8, 0, 'completed', '2025-12-12 13:16:57', NULL),
(49, 36, 10, 0, 'completed', '2025-12-12 13:24:11', NULL),
(50, 36, 11, 0, 'enrolled', '2025-12-12 13:27:39', NULL),
(51, 36, 14, 0, 'enrolled', '2025-12-12 13:30:36', NULL),
(52, 36, 15, 0, 'completed', '2025-12-12 13:32:13', NULL),
(53, 37, 8, 0, 'completed', '2025-12-12 13:52:18', NULL),
(54, 37, 10, 0, 'enrolled', '2025-12-12 15:14:01', NULL),
(55, 37, 9, 0, 'completed', '2025-12-12 16:01:43', NULL),
(56, 37, 11, 0, 'enrolled', '2025-12-12 16:22:12', NULL),
(57, 38, 8, 0, 'enrolled', '2025-12-12 21:39:41', NULL);

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
(51, 8, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(52, 8, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(53, 8, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(54, 8, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(55, 8, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(56, 8, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(57, 8, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(58, 8, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(59, 9, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(60, 9, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(61, 9, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(62, 9, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(63, 9, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(64, 9, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(65, 9, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(66, 9, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(67, 10, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(68, 10, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(69, 10, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(70, 10, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(71, 10, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(72, 10, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(73, 10, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(74, 10, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(75, 11, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(76, 11, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(77, 11, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(78, 11, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(79, 11, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(80, 11, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(81, 11, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(82, 11, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(83, 12, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(84, 12, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(85, 12, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(86, 12, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(87, 12, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(88, 12, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(89, 12, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(90, 12, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(91, 13, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(92, 13, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(93, 13, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(94, 13, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(95, 13, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(96, 13, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(97, 13, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(98, 13, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(99, 14, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(100, 14, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(101, 14, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(102, 14, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(103, 14, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(104, 14, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(105, 14, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(106, 14, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(107, 15, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(108, 15, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(109, 15, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(110, 15, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(111, 15, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(112, 15, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(113, 15, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(114, 15, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(115, 16, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(116, 16, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(117, 16, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(118, 16, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(119, 16, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(120, 16, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(121, 16, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(122, 16, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(131, 18, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(132, 18, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(133, 18, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(134, 18, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(135, 18, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(136, 18, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(137, 18, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(138, 18, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(147, 20, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(148, 20, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(149, 20, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(150, 20, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(151, 20, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(152, 20, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(153, 20, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(154, 20, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(163, 22, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(164, 22, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(165, 22, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(166, 22, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(167, 22, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(168, 22, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(169, 22, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(170, 22, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL),
(171, 23, 'Bài học 1: Giới thiệu khóa học', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 1, NULL),
(172, 23, 'Bài học 2: Nội dung bài học 2', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 2, NULL),
(173, 23, 'Bài học 3: Nội dung bài học 3', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 3, NULL),
(174, 23, 'Bài học 4: Nội dung bài học 4', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 4, NULL),
(175, 23, 'Bài học 5: Nội dung bài học 5', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 5, NULL),
(176, 23, 'Bài học 6: Nội dung bài học 6', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 6, NULL),
(177, 23, 'Bài học 7: Nội dung bài học 7', 'https://www.youtube.com/embed/vpqMmfkSAMo?rel=0', NULL, 7, NULL),
(178, 23, 'Bài học 8: Tổng kết khóa học', 'https://www.youtube.com/embed/4X8aXn0dMMM?rel=0', NULL, 8, NULL);

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

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `type`, `status`, `created_at`) VALUES
(2, 37, 'Chúc mừng bạn đến với TVULEARN', 'info', 'read', '2025-12-12 13:40:08'),
(3, 37, 'Bạn đã hoàn thành khóa học!', 'success', 'read', '2025-12-12 13:52:54'),
(5, 37, 'Bạn đã hoàn thành khóa học!', 'success', 'unread', '2025-12-12 14:22:45'),
(6, 38, 'Chào mừng bạn đến với TVULEARN!', 'success', 'unread', '2025-12-12 14:37:17');

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
(1, 67, 'HTML dùng để làm gì?', '[\"Định dạng văn bản\", \"Xây dựng cấu trúc trang web\", \"Lưu trữ dữ liệu\", \"Tạo hệ điều hành\"]', 'Xây dựng cấu trúc trang web'),
(2, 67, 'Thẻ nào dùng để chèn hình ảnh?', '[\"<img>\", \"<image>\", \"<picture>\", \"<src>\"]', '<img>'),
(3, 67, 'Thuộc tính nào dùng để đổi màu chữ trong CSS?', '[\"font-color\", \"text-color\", \"color\", \"background-color\"]', 'color'),
(4, 68, 'CSS viết tắt của?', '[\"Creative Style System\", \"Cascading Style Sheets\", \"Colorful Style Syntax\", \"Coding Style Sheet\"]', 'Cascading Style Sheets'),
(5, 68, 'Thuộc tính nào dùng để căn giữa văn bản?', '[\"align\", \"text-center\", \"justify\", \"text-align\"]', 'text-align'),
(6, 68, 'Đơn vị nào KHÔNG phải là đơn vị trong CSS?', '[\"px\", \"em\", \"kg\", \"rem\"]', 'kg'),
(7, 69, 'JavaScript chạy ở đâu?', '[\"Chỉ Server\", \"Chỉ Trình duyệt\", \"Cả Server và Trình duyệt\", \"Không chạy được\"]', 'Cả Server và Trình duyệt'),
(8, 69, 'Toán tử nào dùng để so sánh tuyệt đối (so sánh cả kiểu dữ liệu)?', '[\"==\", \"=\", \"===\", \"!==\"]', '==='),
(9, 69, 'Hàm nào dùng để in ra console?', '[\"print()\", \"console.log()\", \"log()\", \"echo()\"]', 'console.log()'),
(10, 70, 'JavaScript chạy ở đâu?', '[\"Chỉ Server\", \"Chỉ Trình duyệt\", \"Cả Server và Trình duyệt\", \"Không chạy được\"]', 'Cả Server và Trình duyệt'),
(11, 70, 'Toán tử nào dùng để so sánh tuyệt đối (so sánh cả kiểu dữ liệu)?', '[\"==\", \"=\", \"===\", \"!==\"]', '==='),
(12, 70, 'Hàm nào dùng để in ra console?', '[\"print()\", \"console.log()\", \"log()\", \"echo()\"]', 'console.log()'),
(13, 61, 'Từ khóa nào được dùng để khai báo một biến có thể thay đổi giá trị trong JavaScript (trước ES6)?', '[\"const\", \"var\", \"let\", \"define\"]', 'var'),
(14, 61, 'Cách nào sau đây KHÔNG phải là một tên biến (variable name) hợp lệ trong JavaScript?', '[\"$myVariable\", \"variable_2\", \"2ndVariable\", \"myVariable\"]', '2ndVariable'),
(15, 61, 'Từ khóa nào được dùng để khai báo một biến có phạm vi khối (block scope) và CÓ THỂ thay đổi giá trị?', '[\"var\", \"const\", \"let\", \"local\"]', 'let'),
(16, 62, 'Kiểu dữ liệu nào được trả về khi bạn sử dụng `typeof` trên một mảng (Array)?', '[\"array\", \"object\", \"list\", \"array_object\"]', 'object'),
(17, 62, 'Giá trị nào đại diện cho \"không có giá trị\" và phải được gán rõ ràng?', '[\"undefined\", \"NaN\", \"null\", \"Void\"]', 'null'),
(18, 62, 'Phép toán `10 + \"5\"` sẽ cho kết quả là gì trong JavaScript?', '[\"15\", \"105\", \"Báo lỗi\", \"NaN\"]', '105'),
(19, 63, 'Toán tử nào dùng để kiểm tra sự KHÁC nhau về giá trị HOẶC kiểu dữ liệu?', '[\"!==\", \"!=\", \"!\", \"><\"]', '!=='),
(20, 63, 'Toán tử logic nào tương đương với \"HOẶC\" (OR)?', '[\"&&\", \"||\", \"!\", \"+\"]', '||'),
(21, 63, 'Phép gán rút gọn nào sau đây thêm 5 vào biến `x`?', '[\"x =+ 5\", \"x += 5\", \"x => 5\", \"x = 5 +\"]', 'x += 5'),
(22, 64, 'Cú pháp nào sau đây đúng để viết câu lệnh `if` kiểm tra nếu `i` khác 10?', '[\"if (i <> 10)\", \"if i != 10\", \"if (i !== 10)\", \"if i is not 10\"]', 'if (i !== 10)'),
(23, 64, 'Bạn có thể thay thế `if-else` đơn giản bằng toán tử nào?', '[\"Toán tử so sánh (==)\", \"Toán tử ba ngôi (?)\", \"Toán tử gán (=)\", \"Toán tử logic (&&)\"]', 'Toán tử ba ngôi (?)'),
(24, 64, 'Khối lệnh nào được thực thi nếu tất cả các điều kiện `if` và `else if` đều là sai (false)?', '[\"try\", \"catch\", \"finally\", \"else\"]', 'else'),
(25, 65, 'Vòng lặp nào được đảm bảo thực thi khối mã ít nhất một lần?', '[\"for loop\", \"while loop\", \"do...while loop\", \"for...in loop\"]', 'do...while loop'),
(26, 65, 'Từ khóa nào được dùng để ngay lập tức dừng vòng lặp hiện tại và tiếp tục thực hiện mã sau vòng lặp?', '[\"continue\", \"break\", \"return\", \"stop\"]', 'break'),
(27, 65, 'Vòng lặp nào là cách hiệu quả nhất để lặp qua các thuộc tính (properties) của một đối tượng (Object)?', '[\"for loop\", \"for...of loop\", \"for...in loop\", \"while loop\"]', 'for...in loop'),
(28, 66, 'Từ khóa nào được dùng để tạo một hàm trong JavaScript?', '[\"function\", \"method\", \"def\", \"func\"]', 'function'),
(29, 66, 'Cách gọi hàm nào sau đây gán kết quả của hàm `calculate` cho biến `result`?', '[\"result = calculate;\", \"calculate() = result;\", \"result = calculate()\", \"calculate(result)\"]', 'result = calculate()'),
(30, 66, 'Mục đích chính của câu lệnh `return` trong một hàm là gì?', '[\"Báo lỗi\", \"In ra console\", \"Kết thúc hàm và trả về một giá trị\", \"Bắt đầu một vòng lặp\"]', 'Kết thúc hàm và trả về một giá trị'),
(88, 51, 'Thẻ HTML nào được dùng để xác định phần nội dung chính (main content) của tài liệu?', '[\"<header>\", \"<body>\", \"<main>\", \"<section>\"]', '<body>'),
(89, 51, 'Thẻ HTML nào dùng để tạo một siêu liên kết (hyperlink)?', '[\"<h1>\", \"<link>\", \"<a>\", \"<p>\"]', '<a>'),
(90, 51, 'Thuộc tính (attribute) nào của thẻ `<img>` là BẮT BUỘC để hiển thị hình ảnh?', '[\"alt\", \"id\", \"src\", \"href\"]', 'src'),
(145, 52, 'Thẻ nào được dùng để nhóm các phần tử liên quan trong một form?', '[\"<group>\", \"<fieldset>\", \"<input>\", \"<label>\"]', '<fieldset>'),
(146, 52, 'Kiểu (type) nào của thẻ `<input>` được dùng để người dùng chọn nhiều tùy chọn cùng lúc?', '[\"radio\", \"text\", \"checkbox\", \"select\"]', 'checkbox'),
(147, 52, 'Phương thức (method) nào nên dùng cho Form khi gửi dữ liệu nhạy cảm như mật khẩu?', '[\"GET\", \"POST\", \"SEND\", \"QUERY\"]', 'POST');

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
(1, 37, 67, 10, 1, 3, '2025-12-12 08:26:43'),
(2, 37, 67, 10, 0, 3, '2025-12-12 08:30:23'),
(3, 37, 51, 8, 2, 3, '2025-12-12 08:35:42'),
(4, 37, 66, 9, 3, 3, '2025-12-12 09:02:02'),
(5, 38, 51, 8, 2, 3, '2025-12-13 02:04:24');

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
(9, 15, '428e28bd3ada2c15d1acd72046856ab32af3de100a24be58b84936af95c089ed1cafd909a056596632573f5f51547021c31fefef0461f0c0a5aafb1aada6d371', '2025-12-08 19:16:58', '2025-12-01 19:16:58'),
(10, 15, '46d60b779fe30206fdf11f3c9aeef744a18a3667ab7430c408f6ba0eaabad19c6d8e810227ac54932117998182b957acdba1d3299fbae9dcdfc6654cf2d21aff', '2025-12-08 19:17:49', '2025-12-01 19:17:49'),
(11, 15, '7e5263cbc7d492c6cb05bc01dbfdaf5256cfc4171144564bd254d60519f88aa7de78630de1850a0ad5bd20b5d200bddc74455a9c52ef8c36d2782f8570a97cb3', '2025-12-08 19:26:45', '2025-12-01 19:26:45'),
(12, 15, '4abcab348700ab12fa09fc482d5163cb3c69c72915c5f928dffcc13756ba8cfa4830cedc82dea4ef7c7c590c083a5d7e8bf64aa62a86c321bbafa303ff99cbe1', '2025-12-08 19:34:41', '2025-12-01 19:34:41'),
(13, 15, 'ffcdbb036f9fd4e55415ed464b337edc38102aa6a9bf9659e612f984e274ee888d4a35c39666924aafff98958a96708503ab3507fbc008b7f79f44d87560cf46', '2025-12-08 19:35:04', '2025-12-01 19:35:04'),
(14, 15, 'eb80b1b0ca4781eab234bc81e3467475fa6d9cc600824dcd6b0e78bc32d3be33d8f6c36648c74f14e7a10bb7f7c37365402be8efe74fffe30623ea85fece59d5', '2025-12-08 19:59:43', '2025-12-01 19:59:43'),
(15, 15, 'a4bffc92796b256e9fdf81418a8112a17b6925ef7ce8ed6058427181151fcea6f71b1e33d4630f3b024467427931aa6405ffb8d459bca6e3b7f831b971ba3e22', '2025-12-08 20:02:21', '2025-12-01 20:02:21'),
(16, 15, '6b6442eb93d69dd377cdbbcd06304da56c5030aceccb7be081d3a815831aacd1d72f173b60a1b2c94924461cefcddf4db3331ab84df80f2008fa2a2c5b3662b9', '2025-12-09 13:40:47', '2025-12-02 13:40:47'),
(17, 15, '6fd4dcc16c0eee5836b92a94607a8500b65b3c4e91ae3c266cdd0788471344e04cd9c44ea5a9b23f48ab0f32a93dd712aa7263d53e0edf50d0d8ecd9db3901ee', '2025-12-09 13:40:47', '2025-12-02 13:40:47'),
(18, 15, '4848c2e7c28d9cea4dbeda0accff427727aecfb0272eaa4262b9f3b7c090ee921253324faa2da454c9bbba701996c9298683738a07456e2b3bcad7f519ade557', '2025-12-09 13:41:03', '2025-12-02 13:41:03'),
(19, 15, '1d9101d27029619c543d638b47dfcfdcb62c24c6002b48ae8d52fbabd313baa5decf1dcf0f02ee5517da552c9777a1302fe24747fea7116a8c7ebd847bfe2983', '2025-12-09 14:23:59', '2025-12-02 14:23:59'),
(23, 15, 'eb12959eff910b18f98b3c7ec64c909755a778f5aa7255cda20b4a20a2e811f3fac60e7cfad9b20e03ca275f92068c667eb69131405a3f99421136b96523d83e', '2025-12-09 15:15:28', '2025-12-02 15:15:28'),
(24, 15, '8ef3e0a37fb04ba5b92bf28dfebc0e19bde922f5abecd8febdfc78ee10dd40f58667c363dbcc69478afc84ef53285b3fa400548d22bb3719868625a6a0f9cad1', '2025-12-09 15:35:58', '2025-12-02 15:35:58'),
(25, 15, 'ccc63288dfa472d1a0f737eeeed98c9c2bd03252dac6b0598b4b973850f42712f281cff244056ad0172d7e2a3dc610423433cbbf6c6b4c47bf7a01fd321aaa09', '2025-12-09 15:55:22', '2025-12-02 15:55:22'),
(26, 15, 'b2602aa10171f21e0b41594230144c1ca515e335dd6d64250e07adcd8100aff3236ce2b1c31d929e4ef13d4b374305245e39659d9c7a270d89166481afe2ae4e', '2025-12-09 16:13:09', '2025-12-02 16:13:09'),
(27, 15, '345c7f428a63ae7f9d0a30da470779439d19705b36aee4d3e33911729e8e452f3c73b588aff63a43877901603079fc59e6b7260f3167da80c4fcc8bd6868cfee', '2025-12-09 16:58:42', '2025-12-02 16:58:42'),
(28, 15, '065e332e8129528e40f981782110ff840296423551d5eeaeabaa656ab8289a12f82765c12f335ea2d0a3b4930146ae4f97ba594473f0972fc73085a57c7f4a32', '2025-12-09 17:13:54', '2025-12-02 17:13:54'),
(29, 15, '66395ee439d980abebb45cd676983f4638ed71583baa858beacb753e0f21628555f74a423ac284e6f98a4f449cc38cf58615dd5ae86a4ee4cd74e4df0af92205', '2025-12-09 20:00:41', '2025-12-02 20:00:41'),
(32, 15, '000bd804bca7ccdcb239e982d9c65852bde5d369f0082f6a7a87096d927b04e552980bafb55b3babcc615037dfba3b0e98b3bf4566835dbc20c1b9ce4b984fa1', '2025-12-09 20:28:52', '2025-12-02 20:28:52'),
(33, 15, 'e77a0f5b3630103b6530523a26deca0e159f840f4739b4402a79999f72c5ba1a9189aaa4269eaede5f66f5ce564d4bbbfbf089ee1e2024da60d45a291b08dcfa', '2025-12-09 20:30:26', '2025-12-02 20:30:26'),
(34, 15, '89b0016964b8831ddea94626ca71e86de29091bbadd0d430919a20455544c489c4a0ce6f6c39d3d31ba0ede43318766a7b91f2451847256de227f481111940d9', '2025-12-09 20:47:36', '2025-12-02 20:47:36'),
(35, 15, '4694a0b38e15e0ca567a578037e9ad6dddfb9188be98e87491d73e1c850aeb377dfefde65489d712bb4cec0ad7c4d9ad2c6fad763e8e979003647f8f9d1252a1', '2025-12-09 21:04:36', '2025-12-02 21:04:36'),
(36, 15, 'ff9f08d240bd0992f2475d101b7f37c2b6c0bc48712ac06650481f11e6147ce042424f89fb0d6f90de70d414fea8af2912ec83b394849307831bdeea280ab1cf', '2025-12-09 21:25:26', '2025-12-02 21:25:26'),
(49, 31, '9d3155114a2a576329cbac5eb2af1e30e2dabbbf86b623f0aaccbda3be89ced0607d9a5142397f12f21ea572f06ee7676f549c353683ec6d953fca60694e60e4', '2025-12-10 22:27:18', '2025-12-03 22:27:18'),
(50, 31, '216dece6af2eb14a043912cedfc11756b4a013748db60fdd142635abecc9ec3ec7ff9919858d008ed2a31b7bf8f3bf4c8781702927a07d3741848d98abd53466', '2025-12-10 22:52:00', '2025-12-03 22:52:00'),
(51, 31, '6c8fe5b3863bb02ba318bfb010b09902d068b5ba4dbb3f4acccbae88dc6e3d6b62b706239ba2434ac8db432eefaecd9ce55f60b50142e34e47ed767d37da1825', '2025-12-11 09:55:11', '2025-12-04 09:55:11'),
(52, 32, '198b75f482d546767e808383baaf5c490851d9ba7f80bc8a16aa135407ae82d374e1ea2ea6ea47314487786eb307c9534e844a94dd73b7a4d3cae9cd74362c04', '2025-12-11 10:06:34', '2025-12-04 10:06:34'),
(53, 32, '32d821b75a7ec13970441b84b26e7b98e68cccbee2b57517fccfc13fd420a05fa32dac7e0b60ea011c14dad83838f5270ae83218ffe0db41b937650ad0a3e546', '2025-12-11 10:06:34', '2025-12-04 10:06:34'),
(54, 32, 'edc86130eac18d82751e4a972e399bd493fd9dabaae00d80857d9249121fc760b227f2b7e698c9423eeda357c149c902e90267194870c9cb6417cfaf99be88ad', '2025-12-11 10:06:35', '2025-12-04 10:06:35'),
(55, 32, '2ec51ad4c350c4778417cf6070a77adb2d2e2afb8301ad595d55671b20dec4a91120e1c7d30a529f5c1aae85a37a730481cc755f3d9081b936f156d0c7169e11', '2025-12-11 10:06:50', '2025-12-04 10:06:50'),
(56, 32, 'd0a2197e356b2a347b3f8ef6a0aec8329307f5f346aa377aea75d18be368be1b1383caf389a7b62d2726180fe628b8ef0cf7e09cc456b49d394d0ed96a5e96f7', '2025-12-12 12:27:16', '2025-12-05 12:27:16'),
(57, 32, '1f329190194abee8e6b4790f81df2ebacfbf28b8ab31940c47763fc7618847e24f5f1db53c069940b980a2bd0d62595f5bffeadd5573cae7aca6296f5d54d7c3', '2025-12-12 12:27:16', '2025-12-05 12:27:16'),
(58, 33, '95e88797ed7d7e0a30e52e92ab3c16c2948945437af98e5e90140a04e8ff73830d333360d0b2a69ababb04dab1b4c25d42d683dfb3557fe73896652118bad394', '2025-12-12 12:37:19', '2025-12-05 12:37:19'),
(59, 33, '88a6db488d7dd4dd8de7508bc48be00596c91785f027d69013a57ed3a87c00e5a9a99bcf47fda18879d14211b0d8ba85d19a4c2de6f7b2cb526f88a64c2980d9', '2025-12-12 12:52:48', '2025-12-05 12:52:48'),
(60, 33, 'f8fc42bff62a913277ef8e5b7ca3e58c9b6fd1a8e760fefcfcf3f23c73adc5ff7bc3b892332ef2f70ea1e2eaafd9d44f605e4879cba454769fbff88da543ad7e', '2025-12-12 13:45:30', '2025-12-05 13:45:30'),
(61, 33, '8d16895f5a42c42f15f8916a999b2e45e1e1111907dc35264d28246ac58573087c73fdd4f1606ac85ffac4b67ad690afb5614fb2be6f61de15d70ec13fb2af9b', '2025-12-12 14:25:18', '2025-12-05 14:25:18'),
(62, 33, '0aaf69a4137f5595781a2cbb24b880f58b1bd447875ac099aadfd969c86454d739477812930947abd974c041600102d49b44e7d0917a145d62190926fa7dc58c', '2025-12-12 14:56:04', '2025-12-05 14:56:04'),
(63, 33, '00f433c9b22ff96af2acf40fe87e464dc0bb1f71091ff0c1b5c633dfa744f4c871a80c3bf62fe7e72028fefbc2d680edc669fc8aea8a31958ca9a04dbcf975f3', '2025-12-12 15:11:46', '2025-12-05 15:11:46'),
(64, 33, 'a03b7d05657dd9a02abd96aaa1494712c4a1c0fac36a1c937bb5b8af2f01e1fd737b39d65c9e9dc6518013a202fa954b115defd5c9a8125bfa167bb5fed3e04e', '2025-12-12 15:41:07', '2025-12-05 15:41:07'),
(65, 33, 'e9ccd6b0ac487ae5ffa5941c26efe0c0832ea58241df271d770027d29732133cf7ec62bdc3477805edf1f64ccc10b02f10ae2c6a9511b7038e041d8bb69b3de8', '2025-12-12 16:35:05', '2025-12-05 16:35:05'),
(67, 33, 'dd7025f8f658b2964ca597396f3a2f0ab84524a8744cede731d3198d3b63fd36a196c9d58dd09ff6aec5a92235ae545e63aa4a4b76e6cb2908cd94ea32e1306b', '2025-12-13 13:53:18', '2025-12-06 13:53:18'),
(68, 33, '157a94ff3b86b10d76ebc14b1a363f27470a1953d4e8fe9839c7be98c8281307a46b79c636387b6b01acb811505892c1bb22405f216649596a623e794a6b8346', '2025-12-13 13:54:21', '2025-12-06 13:54:21'),
(71, 33, '2d4d02b5670390168ce9a326441ecf21c4782c36336ca181c6970c70c2568349f95157e18f53d295d14626dd9c5452a8a466237ec871be76ea6aca5889bd5179', '2025-12-16 15:34:05', '2025-12-09 15:34:05'),
(73, 33, '19fa1fd0c261f766d8346e34d8bb6e818c6978cd481b57cbd8fba59f105f2336c1d18897ad688ad6f549ed1785212c02d5c0bc158ddaf1786bedba6d508da279', '2025-12-16 16:04:09', '2025-12-09 16:04:09'),
(74, 33, 'e564a7446c3f7ed3af9d986f2e807dda38dd978c628fdc90b5790072f30423f2c45a02f58e54d1501e0fc70eb8acf95d4207799c7188e415ec222f08b454a66b', '2025-12-16 16:04:28', '2025-12-09 16:04:28'),
(75, 33, '91aafd3da53834ef6ef94a6fb4c1aacd84e35b0e0bcb69a5cbfa39d3e70d0484636d7a547c8e063b8b079a20a0f538fb11882c3705096bbf923d61e44776f01f', '2025-12-16 16:05:57', '2025-12-09 16:05:57'),
(76, 33, '6764c338ef398071a45ab53d4e42cf65738984b98590922fbd9a0321fa941dfa0daea80f85834f57f1491976bb353a8bcf4e5593f1bbe2bc969a05b88e142050', '2025-12-16 16:21:14', '2025-12-09 16:21:14'),
(77, 33, '11d8880de98c4da84b566fad6749f76408ab2ddb24b9c0de13c1288d74d2cd14e13d0b41fc674a831920611822bdbc5e61b7f790fddfea073ff19fed073d5edb', '2025-12-16 16:21:40', '2025-12-09 16:21:40'),
(78, 33, 'd08000dbf448ac3d2900a99ce5ffe1344ddf3bf700492e8d46b8bb30f9f0bcb96a53d57d5a757b1fefc373c0874ca3897d234db376b35a032b36b34ca606f6a3', '2025-12-16 16:21:54', '2025-12-09 16:21:54'),
(80, 32, '8fe98f5370d37e4ebf24cb719c43076963de4cf2e15bd656f2d80e3051bf135c1c3394efd4691d00c22f02fbd7f383ad6e9cedb5b09ce4a6977898be2d6cf75e', '2025-12-16 17:08:10', '2025-12-09 17:08:10'),
(82, 33, '4108f8482ec0d30107163b3602c2e03086ff0f44bc60a69cc5be2a5138567debe5527c744158613948b8ef70e9d9f7fd4619134795eb51ac9db8486327d953fc', '2025-12-16 21:10:30', '2025-12-09 21:10:30'),
(83, 33, '39c7da853fd09b2ae4dc049fcfc40ebf4ffe18066a31e44ae06955517fd919d8d1e633cc3b0eac59d9cb31df80a83bdb1afd5562e7ef0df8c74436b5792b37ba', '2025-12-17 10:43:53', '2025-12-10 10:43:53'),
(84, 33, '4696f4ff15e7e1bfd998d77b38885d5a3c48df99136c60274a538d7221d10bffe66b13e306792c8d6c0e6adb660caebbc613d4c4e9c42ba7e9be506ac0e40bfb', '2025-12-17 10:43:53', '2025-12-10 10:43:53'),
(85, 33, 'cb9aeb42965ed7ba2e67b8fb0cc1f674a393815bb1d347adb2ac2e5add0bbba1807ccedac205c64e6d163fa4fbf7a114f483af8055ebb772a39efd99fb483a0c', '2025-12-17 21:47:02', '2025-12-10 21:47:02'),
(86, 33, '1152d4a5b0ff2ef6ab3555002955203f23f9ca16a791f98f6a1571010d0383e0cc28af6128cc1daf3e241a503ea09548c1b16bc3be90ab08a627ce539722e3fe', '2025-12-17 21:47:21', '2025-12-10 21:47:21'),
(96, 38, 'e4c3c1f562fa9cc99396555a27d12723262e9b0ab6664cd3881d39fccb3a63343d62d08baa30ac6a15a02c7ad57923a51f49f34cceb8ff0c784c3db4d5a920cd', '2025-12-19 21:39:07', '2025-12-12 21:39:07');

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
(15, 'le tuan huy', 'tuanhuylehuyle@gmail.com', '$2b$10$HcqTUd4JEpTS4TN3DsuRuOk5P918GfJB5YbwVPyujGqJ76FcS85F.', 'student', NULL, '2025-12-01 19:13:03'),
(31, 'tuanhuy', 'tuanhuy@gmail.com', '$2b$10$OPw8YJagkkKgW9nXwUQsZ.cd6vyR67vO/yRc1zXz03VRCtMSxiRh.', 'student', NULL, '2025-12-03 22:26:52'),
(32, 'user', 'user@gmail.com', '$2b$10$QHP.mK/rMDWhDei0O2Q4IOAo2k32OQt3ocNGcgBaOWDCAwndkoEfq', 'student', NULL, '2025-12-04 10:06:13'),
(33, 'letuanhuy', 'letuanhuy@gmail.com', '$2b$10$oD3AfcgwvytmzYqcv5Ka.ul7oTAc2tJKQBIkP/q2u1haDMtIVibKu', 'student', NULL, '2025-12-05 12:37:10'),
(36, 'huyle', 'tuanhuyle@gmail.com', '$2b$10$lSR4WM692YteVQEWLBnXvu7CKXjI.q2QaC9CVSwNKO3upeuG3vaZW', 'student', NULL, '2025-12-12 12:42:53'),
(37, 'huyle1', 'huyle1@gmail.com', '$2b$10$FbxZuRVpv4Dyxs3m0dfMqOPlRM25zBVMjkA12qX0Tk6mgPE7un8Ju', 'student', NULL, '2025-12-12 13:51:39'),
(38, 'user', 'user123@gmail.com', '$2b$10$cMvvfGVhU410QN5pXx3rouTnIjdECbIO.ShTpB2W455miUItiUd5a', 'student', NULL, '2025-12-12 21:32:44');

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
(1, 33, 8, 52, 1, '2025-12-11 22:02:43'),
(2, 33, 8, 51, 1, '2025-12-12 12:39:34'),
(3, 33, 8, 53, 1, '2025-12-11 22:02:44'),
(4, 33, 8, 54, 1, '2025-12-11 22:02:44'),
(5, 33, 8, 55, 1, '2025-12-11 22:02:45'),
(6, 33, 8, 56, 1, '2025-12-11 22:02:47'),
(7, 33, 8, 58, 1, '2025-12-11 22:02:46'),
(8, 33, 8, 57, 1, '2025-12-11 22:02:47'),
(9, 33, 9, 60, 1, '2025-12-11 22:18:13'),
(10, 33, 9, 59, 1, '2025-12-11 22:57:36'),
(11, 33, 9, 61, 1, '2025-12-11 22:18:13'),
(12, 33, 9, 62, 1, '2025-12-11 22:18:13'),
(13, 33, 9, 63, 1, '2025-12-11 22:18:13'),
(14, 33, 9, 65, 1, '2025-12-11 22:18:14'),
(15, 33, 10, 68, 1, '2025-12-11 15:06:49'),
(16, 33, 10, 69, 1, '2025-12-11 15:06:50'),
(17, 33, 10, 70, 1, '2025-12-11 15:06:52'),
(18, 33, 10, 67, 1, '2025-12-11 23:36:54'),
(19, 33, 10, 71, 1, '2025-12-11 15:06:56'),
(20, 33, 10, 72, 1, '2025-12-11 15:07:00'),
(21, 33, 10, 73, 1, '2025-12-11 15:07:01'),
(22, 33, 10, 74, 1, '2025-12-11 15:07:02'),
(23, 33, 11, 76, 1, '2025-12-11 15:07:48'),
(24, 33, 11, 78, 1, '2025-12-11 15:08:28'),
(25, 33, 11, 77, 1, '2025-12-11 15:08:29'),
(26, 33, 11, 75, 1, '2025-12-12 12:39:07'),
(27, 33, 11, 79, 1, '2025-12-11 15:08:31'),
(28, 33, 11, 80, 1, '2025-12-11 15:08:32'),
(29, 33, 11, 81, 1, '2025-12-11 15:10:11'),
(30, 33, 11, 82, 1, '2025-12-11 15:10:12'),
(31, 33, 12, 84, 1, '2025-12-11 15:13:48'),
(32, 33, 12, 85, 1, '2025-12-11 15:13:50'),
(33, 33, 12, 83, 1, '2025-12-12 12:41:40'),
(34, 33, 12, 86, 1, '2025-12-11 15:13:52'),
(35, 33, 12, 87, 1, '2025-12-11 15:13:53'),
(36, 33, 12, 88, 1, '2025-12-11 15:13:54'),
(37, 33, 12, 89, 1, '2025-12-11 15:13:54'),
(38, 33, 12, 90, 1, '2025-12-11 15:13:55'),
(39, 33, 13, 92, 1, '2025-12-11 15:15:16'),
(40, 33, 13, 91, 1, '2025-12-12 12:39:49'),
(41, 33, 13, 93, 1, '2025-12-11 15:15:20'),
(42, 33, 13, 94, 1, '2025-12-11 15:15:21'),
(43, 33, 13, 95, 1, '2025-12-11 15:15:21'),
(44, 33, 13, 96, 1, '2025-12-11 15:15:22'),
(45, 33, 13, 97, 1, '2025-12-11 15:15:22'),
(46, 33, 13, 98, 1, '2025-12-11 15:15:24'),
(47, 33, 22, 164, 1, '2025-12-11 15:18:18'),
(48, 33, 22, 163, 1, '2025-12-11 22:57:32'),
(49, 33, 23, 171, 1, '2025-12-11 21:24:26'),
(53, 33, 23, 172, 1, '2025-12-11 15:21:02'),
(54, 33, 23, 173, 1, '2025-12-11 15:21:02'),
(55, 33, 23, 174, 1, '2025-12-11 15:21:03'),
(56, 33, 23, 176, 1, '2025-12-11 15:21:03'),
(57, 33, 23, 178, 1, '2025-12-11 15:21:03'),
(58, 33, 23, 177, 1, '2025-12-11 15:21:04'),
(60, 33, 23, 175, 1, '2025-12-11 19:25:25'),
(62, 33, 14, 99, 1, '2025-12-11 21:24:29'),
(64, 33, 14, 100, 1, '2025-12-11 19:25:42'),
(65, 33, 14, 101, 1, '2025-12-11 19:25:46'),
(66, 33, 14, 102, 1, '2025-12-11 19:25:47'),
(67, 33, 14, 103, 1, '2025-12-11 19:25:48'),
(68, 33, 14, 104, 1, '2025-12-11 19:25:48'),
(69, 33, 14, 105, 1, '2025-12-11 19:25:49'),
(70, 33, 14, 106, 1, '2025-12-11 19:25:49'),
(83, 33, 22, 165, 1, '2025-12-11 20:49:21'),
(84, 33, 22, 170, 1, '2025-12-11 20:49:23'),
(85, 33, 22, 169, 1, '2025-12-11 20:49:23'),
(86, 33, 22, 168, 1, '2025-12-11 20:49:23'),
(87, 33, 22, 166, 1, '2025-12-11 20:49:24'),
(92, 33, 20, 147, 1, '2025-12-12 12:40:31'),
(112, 33, 9, 64, 1, '2025-12-11 22:18:14'),
(127, 33, 9, 66, 1, '2025-12-11 22:15:32'),
(152, 33, 16, 115, 1, '2025-12-11 23:20:08'),
(165, 33, 20, 148, 1, '2025-12-12 12:40:37'),
(168, 36, 8, 51, 1, '2025-12-12 13:22:33'),
(170, 36, 8, 52, 1, '2025-12-12 13:22:42'),
(171, 36, 8, 53, 1, '2025-12-12 13:22:42'),
(172, 36, 8, 54, 1, '2025-12-12 13:22:46'),
(173, 36, 8, 55, 1, '2025-12-12 13:22:46'),
(174, 36, 8, 56, 1, '2025-12-12 13:22:46'),
(175, 36, 8, 57, 1, '2025-12-12 13:22:47'),
(176, 36, 8, 58, 1, '2025-12-12 13:22:48'),
(178, 36, 10, 67, 1, '2025-12-12 13:27:24'),
(180, 36, 10, 68, 1, '2025-12-12 13:24:25'),
(181, 36, 10, 69, 1, '2025-12-12 13:26:32'),
(182, 36, 10, 70, 1, '2025-12-12 13:26:33'),
(183, 36, 10, 71, 1, '2025-12-12 13:26:35'),
(184, 36, 10, 72, 1, '2025-12-12 13:26:37'),
(185, 36, 10, 73, 1, '2025-12-12 13:26:44'),
(186, 36, 10, 74, 1, '2025-12-12 13:26:45'),
(188, 36, 11, 75, 1, '2025-12-12 13:30:11'),
(192, 36, 11, 76, 1, '2025-12-12 13:27:42'),
(193, 36, 11, 77, 1, '2025-12-12 13:27:42'),
(194, 36, 11, 78, 1, '2025-12-12 13:27:44'),
(195, 36, 11, 79, 1, '2025-12-12 13:27:45'),
(196, 36, 11, 80, 1, '2025-12-12 13:27:46'),
(197, 36, 11, 81, 1, '2025-12-12 13:27:46'),
(198, 36, 11, 82, 1, '2025-12-12 13:27:47'),
(201, 36, 14, 99, 1, '2025-12-12 13:30:37'),
(204, 36, 14, 100, 1, '2025-12-12 13:30:38'),
(205, 36, 14, 101, 1, '2025-12-12 13:30:38'),
(206, 36, 14, 102, 1, '2025-12-12 13:30:39'),
(207, 36, 14, 103, 1, '2025-12-12 13:30:39'),
(208, 36, 14, 104, 1, '2025-12-12 13:30:39'),
(209, 36, 14, 105, 1, '2025-12-12 13:30:40'),
(210, 36, 14, 106, 1, '2025-12-12 13:30:40'),
(211, 36, 15, 107, 1, '2025-12-12 13:32:14'),
(215, 36, 15, 108, 1, '2025-12-12 13:32:24'),
(216, 36, 15, 109, 1, '2025-12-12 13:32:25'),
(217, 36, 15, 110, 1, '2025-12-12 13:32:25'),
(218, 36, 15, 111, 1, '2025-12-12 13:32:25'),
(219, 36, 15, 112, 1, '2025-12-12 13:32:42'),
(220, 36, 15, 113, 1, '2025-12-12 13:32:42'),
(221, 36, 15, 114, 1, '2025-12-12 13:32:44'),
(222, 37, 8, 51, 1, '2025-12-12 13:52:19'),
(226, 37, 8, 52, 1, '2025-12-12 13:52:20'),
(227, 37, 8, 53, 1, '2025-12-12 13:52:20'),
(228, 37, 8, 54, 1, '2025-12-12 13:52:21'),
(229, 37, 8, 55, 1, '2025-12-12 13:52:21'),
(230, 37, 8, 56, 1, '2025-12-12 13:52:21'),
(231, 37, 8, 57, 1, '2025-12-12 13:52:22'),
(232, 37, 8, 58, 1, '2025-12-12 13:52:22'),
(236, 37, 10, 67, 1, '2025-12-12 15:14:02'),
(243, 37, 9, 59, 1, '2025-12-12 16:01:44'),
(247, 37, 9, 60, 1, '2025-12-12 16:01:56'),
(248, 37, 9, 61, 1, '2025-12-12 16:01:56'),
(249, 37, 9, 62, 1, '2025-12-12 16:01:57'),
(250, 37, 9, 63, 1, '2025-12-12 16:01:57'),
(251, 37, 9, 64, 1, '2025-12-12 16:01:58'),
(252, 37, 9, 65, 1, '2025-12-12 16:01:58'),
(253, 37, 9, 66, 1, '2025-12-12 16:01:58'),
(257, 37, 11, 75, 1, '2025-12-12 16:22:13'),
(263, 37, 10, 68, 1, '2025-12-12 16:31:07'),
(264, 38, 8, 51, 1, '2025-12-12 21:39:42'),
(271, 38, 8, 52, 1, '2025-12-13 09:27:57'),
(272, 38, 8, 53, 1, '2025-12-13 09:27:58');

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
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT cho bảng `lessons`
--
ALTER TABLE `lessons`
  MODIFY `lesson_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT cho bảng `quiz_results`
--
ALTER TABLE `quiz_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;

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
