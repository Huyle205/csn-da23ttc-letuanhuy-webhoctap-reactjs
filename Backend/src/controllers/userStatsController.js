import db from "../config/db.js";

export const getUserStats = async (req, res) => {
    const userId = req.user.user_id;

    try {
        // 1️ Số khóa đã tham gia
        const [joined] = await db.promise().query(
            "SELECT COUNT(*) AS count FROM enrollments WHERE user_id = ?",
            [userId]
        );

        // 2️ Số khóa học đã hoàn thành (100%)
        const [completed] = await db.promise().query(
            `SELECT COUNT(*) AS count
             FROM enrollments 
             WHERE user_id = ? AND status = 'completed'`,
            [userId]
        );

        // 3️ Tổng số bài học user đã hoàn thành
        const [doneLessons] = await db.promise().query(
            `SELECT COUNT(*) AS count
             FROM user_progress
             WHERE user_id = ? AND completed = 1`,
            [userId]
        );

        // 4️ Tổng số bài học user có trong tất cả khóa học
        const [totalLessons] = await db.promise().query(
            `SELECT COUNT(*) AS count
             FROM lessons 
             WHERE course_id IN (SELECT course_id FROM enrollments WHERE user_id = ?)`,
            [userId]
        );

        // 5️ Tổng quiz đã làm
        const [quizCount] = await db.promise().query(
            `SELECT COUNT(*) AS count
             FROM quiz_results
             WHERE user_id = ?`,
            [userId]
        );

        //6️ Điểm trung bình quiz
        const [avgQuiz] = await db.promise().query(
            `SELECT AVG(score / total_questions * 100) AS avg_score
             FROM quiz_results
             WHERE user_id = ?`,
            [userId]
        );

        const overallProgress = totalLessons[0].count === 0
            ? 0
            : Math.round((doneLessons[0].count / totalLessons[0].count) * 100);

        res.json({
            joinedCourses: joined[0].count,
            completedCourses: completed[0].count,
            totalLessonsDone: doneLessons[0].count,
            totalLessons: totalLessons[0].count,
            overallProgress,
            quizCount: quizCount[0].count,
            avgQuizScore: avgQuiz[0].avg_score ? Math.round(avgQuiz[0].avg_score) : 0
        });

    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy thống kê", error: error.message });
    }
};
