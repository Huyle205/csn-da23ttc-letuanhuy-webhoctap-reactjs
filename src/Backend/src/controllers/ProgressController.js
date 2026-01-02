import db from "../config/db.js";



// api danh dau hoan thanh bai hoc
// export const markLessonComplete = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//         const { lesson_id } = req.body;

//         if (!lesson_id) return res.status(400).json({ message: "lesson_id required" });

//         // lấy thông tin bài học → lấy course_id
//         const [lesson] = await db.promise().query(
//             "SELECT course_id FROM lessons WHERE lesson_id = ?",
//             [lesson_id]
//         );
//         if (lesson.length === 0) return res.status(404).json({ message: "Lesson not found" });

//         const course_id = lesson[0].course_id;

//         // upsert data
//         await db.promise().query(
//             `INSERT INTO user_progress (user_id, course_id, lesson_id, completed)
//              VALUES (?, ?, ?, 1)
//              ON DUPLICATE KEY UPDATE completed = 1, completed_at = NOW()`,
//             [userId, course_id, lesson_id]
//         );

//         res.json({ message: "Lesson marked as completed" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };
export const markLessonComplete = async (req, res) => {
    const userId = req.user.user_id;
    const { course_id, lesson_id } = req.body;

    try {
        // 1️ Đánh dấu bài học
        await db.promise().query(
            `INSERT INTO user_progress (user_id, course_id, lesson_id, completed)
             VALUES (?, ?, ?, 1)
             ON DUPLICATE KEY UPDATE completed = 1`,
            [userId, course_id, lesson_id]
        );

        // 2️ Lấy tổng số bài học của khóa
        const [lessonTotal] = await db.promise().query(
            `SELECT COUNT(*) AS total FROM lessons WHERE course_id = ?`,
            [course_id]
        );

        // 3️ Lấy số bài user đã hoàn thành
        const [lessonDone] = await db.promise().query(
            `SELECT COUNT(*) AS done 
             FROM user_progress 
             WHERE user_id = ? AND course_id = ? AND completed = 1`,
            [userId, course_id]
        );

        // 4️ Kiểm tra nếu user học hết khóa
        if (lessonDone[0].done === lessonTotal[0].total) {
            await db.promise().query(
                `UPDATE enrollments SET status = 'completed'
                 WHERE user_id = ? AND course_id = ?`,
                [userId, course_id]
            );
        }

        res.json({
            message: "Đã cập nhật tiến độ",
            done: lessonDone[0].done,
            total: lessonTotal[0].total
        });

    } catch (error) {
        res.status(500).json({
            message: "Lỗi cập nhật tiến độ",
            error: error.message,
        });
    }
};


// api lay tien do hoc tap cua nguoi dung theo course_id
export const getProgressByCourse = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { courseId } = req.params;

        const [rows] = await db.promise().query(
            `SELECT lesson_id FROM user_progress 
             WHERE user_id = ? AND course_id = ? AND completed = 1`,
            [userId, courseId]
        );

        res.json({ completedLessons: rows });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
// api lay tong tien do khoa hoc
// GET /api/progress/course/:courseId
export const getCourseProgress = (req, res) => {
    const user_id = req.user.user_id;
    const { courseId } = req.params;

    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM lessons WHERE course_id = ?) AS total_lessons,
            (SELECT COUNT(*) FROM user_progress WHERE course_id = ? AND user_id = ?) AS completed_lessons
    `;

    db.query(sql, [courseId, courseId, user_id], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        const total = results[0].total_lessons;
        const done = results[0].completed_lessons;

        res.json({
            total_lessons: total,
            completed_lessons: done,
            percent: total === 0 ? 0 : Math.round((done / total) * 100)
        });
    });
};


// kiem tra va cap nhat trang thai khoa hoc
export const checkAndUpdateCourseStatus = (req, res) => {
    const user_id = req.user.user_id;
    const { course_id } = req.body;

    if (!course_id) {
        return res.status(400).json({ message: "Missing course_id" });
    }

    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM lessons WHERE course_id = ?) AS total_lessons,
            (SELECT COUNT(*) FROM user_progress WHERE course_id = ? AND user_id = ?) AS completed_lessons
    `;

    db.query(sql, [course_id, course_id, user_id], (err, results) => {
        if (err) return res.status(500).json(err);

        const total = results[0].total_lessons;
        const done = results[0].completed_lessons;

        if (done < total) {
            return res.json({ completed: false });
        }

        // update enrollment status
        const updateSql = `
            UPDATE enrollments 
            SET status = 'completed', completed_at = NOW()
            WHERE course_id = ? AND user_id = ?
        `;

        db.query(updateSql, [course_id, user_id], (updateErr) => {
            if (updateErr) return res.status(500).json(updateErr);

            res.json({
                completed: true,
                message: "Course completed successfully!"
            });
        });
    });
};
