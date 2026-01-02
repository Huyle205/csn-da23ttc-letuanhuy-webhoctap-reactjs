-- Migration: Tạo bảng quiz_questions mới với cấu trúc JSON options
-- Chạy script này trong MySQL Workbench hoặc command line

USE tvulearn;

-- Xóa bảng cũ nếu tồn tại (để tránh conflict)
DROP TABLE IF EXISTS quiz_questions;

-- Tạo bảng quiz_questions mới với question_id
CREATE TABLE quiz_questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    lesson_id INT NOT NULL,
    question TEXT NOT NULL,
    options JSON NOT NULL,
    correct_answer VARCHAR(255) NOT NULL,
    note TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

-- Copy dữ liệu từ bảng quizzes cũ sang bảng mới (nếu có data)
INSERT INTO quiz_questions (lesson_id, question, options, correct_answer)
SELECT 
    lesson_id,
    question,
    JSON_ARRAY(option_a, option_b, option_c, option_d) as options,
    CASE correct_answer
        WHEN 'A' THEN option_a
        WHEN 'B' THEN option_b
        WHEN 'C' THEN option_c
        WHEN 'D' THEN option_d
    END as correct_answer
FROM quizzes;

-- Sau khi test OK, có thể xóa bảng cũ (tùy chọn)
-- DROP TABLE quiz_results;
-- DROP TABLE quizzes;
