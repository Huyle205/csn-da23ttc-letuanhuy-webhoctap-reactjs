import db from "../config/db.js";

// Tạo khóa học
export const createCourse = async (req, res) => {
    const teacher_id = req.user.user_id;
    const { title, description, year } = req.body;
    let defaultthumbnail = req.body.defaultThumbnail;
    let thumbnail = req.file ? req.file.path : null;
    
    // Nếu không upload file và có defaultThumbnail, sử dụng defaultThumbnail
    if (!thumbnail && defaultthumbnail) {
        thumbnail = defaultthumbnail;
    }

    if (!title || !year) {
        return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    try {   
        await db.promise().query(
            `INSERT INTO courses (title, description, year, teacher_id, thumbnail)
             VALUES (?, ?, ?, ?, ?)`,
            [title, description, year, teacher_id, thumbnail]
        );

        res.json({ message: "Tạo khóa học thành công" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi tạo khóa học", error: err.message });
    }
};



// Lấy tất cả khóa học của giảng viên
export const getMyCourses = async (req, res) => {
    const teacher_id = req.user.user_id;

    const [rows] = await db.promise().query(
        `SELECT * FROM courses WHERE teacher_id = ?`,
        [teacher_id]
    );

    res.json(rows);
};

// them bai hoc vao khoa hoc
export const createLesson = async (req, res) => {
    const { course_id, title, content, video_url } = req.body;

    if (!course_id || !title) {
        return res.status(400).json({ message: "Thiếu dữ liệu lesson" });
    }

    try {
        await db.promise().query(
            `INSERT INTO lessons (course_id, title, content, video_url)
             VALUES (?,?,?,?)`,
            [course_id, title, content, video_url]
        );

        res.json({ message: "Thêm bài học thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi thêm bài học", error: error.message });
    }
};

export const createQuiz = async (req, res) => {
    const { lesson_id, question, options, correct_answer } = req.body;

    if (!lesson_id || !question || !options || !correct_answer) {
        return res.status(400).json({ message: "Thiếu dữ liệu quiz" });
    }

    try {
        await db.promise().query(
            `INSERT INTO quiz_questions (lesson_id, question, options, correct_answer)
             VALUES (?,?,?,?)`,
            [lesson_id, question, JSON.stringify(options), correct_answer]
        );

        res.json({ message: "Thêm quiz thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi thêm quiz", error: error.message });
    }
};


// EDIT
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, year } = req.body;
    const teacherId = req.user.user_id;

    await db.promise().query(
        `UPDATE courses 
         SET title=?, description=?, year=?
         WHERE course_id=? AND teacher_id=?`,
        [title, description, year, id, teacherId]
    );

    res.json({ message: "Cập nhật khóa học thành công" });
};

// DELETE
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const teacherId = req.user.user_id;

    try {
        // Kiểm tra quyền sở hữu
        const [courses] = await db.promise().query(
            "SELECT * FROM courses WHERE course_id=? AND teacher_id=?",
            [id, teacherId]
        );

        if (courses.length === 0) {
            return res.status(403).json({ message: "Bạn không có quyền xóa khóa học này" });
        }

        // Lấy danh sách lesson_id để xóa quiz
        const [lessons] = await db.promise().query(
            "SELECT lesson_id FROM lessons WHERE course_id=?",
            [id]
        );

        // Xóa quiz của các bài học
        for (const lesson of lessons) {
            await db.promise().query(
                "DELETE FROM quiz_questions WHERE lesson_id=?",
                [lesson.lesson_id]
            );
            // Xóa quiz_results của các bài học
            await db.promise().query(
                "DELETE FROM quiz_results WHERE lesson_id=?",
                [lesson.lesson_id]
            );
        }

        // Xóa progress của các bài học
        await db.promise().query(
            "DELETE FROM user_progress WHERE lesson_id IN (SELECT lesson_id FROM lessons WHERE course_id=?)",
            [id]
        );

        // Xóa tất cả bài học của khóa học
        await db.promise().query(
            "DELETE FROM lessons WHERE course_id=?",
            [id]
        );

        // Xóa enrollments
        await db.promise().query(
            "DELETE FROM enrollments WHERE course_id=?",
            [id]
        );

        // Cuối cùng xóa course
        await db.promise().query(
            "DELETE FROM courses WHERE course_id=?",
            [id]
        );

        res.json({ message: "Xóa khóa học thành công" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Lỗi khi xóa khóa học", error: error.message });
    }
};

// Lấy danh sách lessons của một course
export const getLessonsByCourse = async (req, res) => {
    const { courseId } = req.params;
    const teacherId = req.user.user_id;

    try {
        // Kiểm tra xem course có thuộc về teacher không
        const [courses] = await db.promise().query(
            "SELECT * FROM courses WHERE course_id = ? AND teacher_id = ?",
            [courseId, teacherId]
        );

        if (courses.length === 0) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập khóa học này" });
        }

        const [rows] = await db.promise().query(
            `SELECT * FROM lessons WHERE course_id = ? ORDER BY order_index, lesson_id`,
            [courseId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách bài học", error: error.message });
    }
};

// Cập nhật lesson
export const updateLesson = async (req, res) => {
    const { id } = req.params;
    const { title, content, video_url, order_index } = req.body;
    const teacherId = req.user.user_id;

    try {
        // Kiểm tra quyền sở hữu
        const [lessons] = await db.promise().query(
            `SELECT l.* FROM lessons l
             JOIN courses c ON l.course_id = c.course_id
             WHERE l.lesson_id = ? AND c.teacher_id = ?`,
            [id, teacherId]
        );

        if (lessons.length === 0) {
            return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa bài học này" });
        }

        await db.promise().query(
            `UPDATE lessons 
             SET title=?, content=?, video_url=?, order_index=?
             WHERE lesson_id=?`,
            [title, content, video_url, order_index, id]
        );

        res.json({ message: "Cập nhật bài học thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi cập nhật bài học", error: error.message });
    }
};

// Xóa lesson
export const deleteLesson = async (req, res) => {
    const { id } = req.params;
    const teacherId = req.user.user_id;

    try {
        // Kiểm tra quyền sở hữu
        const [lessons] = await db.promise().query(
            `SELECT l.* FROM lessons l
             JOIN courses c ON l.course_id = c.course_id
             WHERE l.lesson_id = ? AND c.teacher_id = ?`,
            [id, teacherId]
        );

        if (lessons.length === 0) {
            return res.status(403).json({ message: "Bạn không có quyền xóa bài học này" });
        }

        await db.promise().query("DELETE FROM lessons WHERE lesson_id=?", [id]);

        res.json({ message: "Xóa bài học thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xóa bài học", error: error.message });
    }
};

// Lấy danh sách quiz của một lesson
export const getQuizzesByLesson = async (req, res) => {
    const { lessonId } = req.params;
    const teacherId = req.user.user_id;

    try {
        // Kiểm tra quyền sở hữu
        const [lessons] = await db.promise().query(
            `SELECT l.* FROM lessons l
             JOIN courses c ON l.course_id = c.course_id
             WHERE l.lesson_id = ? AND c.teacher_id = ?`,
            [lessonId, teacherId]
        );

        if (lessons.length === 0) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập bài học này" });
        }

        const [rows] = await db.promise().query(
            `SELECT * FROM quiz_questions WHERE lesson_id = ? ORDER BY question_id`,
            [lessonId]
        );

        // Parse options JSON
        const quizzes = rows.map(quiz => ({
            ...quiz,
            options: JSON.parse(quiz.options)
        }));

        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách quiz", error: error.message });
    }
};

// Cập nhật quiz
export const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const { question, options, correct_answer } = req.body;
    const teacherId = req.user.user_id;

    try {
        // Kiểm tra quyền sở hữu
        const [quizzes] = await db.promise().query(
            `SELECT q.* FROM quiz_questions q
             JOIN lessons l ON q.lesson_id = l.lesson_id
             JOIN courses c ON l.course_id = c.course_id
             WHERE q.question_id = ? AND c.teacher_id = ?`,
            [id, teacherId]
        );

        if (quizzes.length === 0) {
            return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa quiz này" });
        }

        await db.promise().query(
            `UPDATE quiz_questions 
             SET question=?, options=?, correct_answer=?
             WHERE question_id=?`,
            [question, JSON.stringify(options), correct_answer, id]
        );

        res.json({ message: "Cập nhật quiz thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi cập nhật quiz", error: error.message });
    }
};

// Xóa quiz
export const deleteQuiz = async (req, res) => {
    const { id } = req.params;
    const teacherId = req.user.user_id;

    try {
        // Kiểm tra quyền sở hữu
        const [quizzes] = await db.promise().query(
            `SELECT q.* FROM quiz_questions q
             JOIN lessons l ON q.lesson_id = l.lesson_id
             JOIN courses c ON l.course_id = c.course_id
             WHERE q.question_id = ? AND c.teacher_id = ?`,
            [id, teacherId]
        );

        if (quizzes.length === 0) {
            return res.status(403).json({ message: "Bạn không có quyền xóa quiz này" });
        }

        await db.promise().query("DELETE FROM quiz_questions WHERE question_id=?", [id]);

        res.json({ message: "Xóa quiz thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xóa quiz", error: error.message });
    }
};

// Lấy thống kê của teacher
export const getTeacherStats = async (req, res) => {
    const teacherId = req.user.user_id;

    try {
        // Tổng số khóa học
        const [courseCount] = await db.promise().query(
            "SELECT COUNT(*) as count FROM courses WHERE teacher_id = ?",
            [teacherId]
        );

        // Tổng số sinh viên (đếm số lượng enrollment vào các khóa học của teacher)
        const [studentCount] = await db.promise().query(
            `SELECT COUNT(DISTINCT e.user_id) as count 
             FROM enrollments e
             JOIN courses c ON e.course_id = c.course_id
             WHERE c.teacher_id = ?`,
            [teacherId]
        );

        // Tổng số bài học
        const [lessonCount] = await db.promise().query(
            `SELECT COUNT(*) as count 
             FROM lessons l
             JOIN courses c ON l.course_id = c.course_id
             WHERE c.teacher_id = ?`,
            [teacherId]
        );

        res.json({
            totalCourses: courseCount[0].count,
            totalStudents: studentCount[0].count,
            totalLessons: lessonCount[0].count
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy thống kê", error: error.message });
    }
};

// Lấy danh sách sinh viên đã tham gia khóa học của teacher
export const getMyStudents = async (req, res) => {
    const teacherId = req.user.user_id;

    try {
        const [students] = await db.promise().query(
            `SELECT 
                u.user_id,
                u.name,
                u.email,
                u.created_at,
                COUNT(DISTINCT e.course_id) as enrolled_courses,
                GROUP_CONCAT(DISTINCT c.title ORDER BY c.title SEPARATOR ', ') as course_names
             FROM users u
             JOIN enrollments e ON u.user_id = e.user_id
             JOIN courses c ON e.course_id = c.course_id
             WHERE c.teacher_id = ?
             GROUP BY u.user_id
             ORDER BY u.name`,
            [teacherId]
        );

        res.json(students);
    } catch (error) {
        console.error("Error in getMyStudents:", error);
        res.status(500).json({ message: "Lỗi lấy danh sách sinh viên", error: error.message });
    }
};
