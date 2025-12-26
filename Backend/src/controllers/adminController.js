import db from "../config/db.js";

/* ================= DASHBOARD ================= */
export const getAdminStats = async (req, res) => {
    try {
        const [[users]] = await db.promise().query(
            "SELECT COUNT(*) total FROM users WHERE role='student'"
        );
        const [[teachers]] = await db.promise().query(
            "SELECT COUNT(*) total FROM users WHERE role='teacher'"
        );
        const [[courses]] = await db.promise().query(
            "SELECT COUNT(*) total FROM courses"
        );
        const [[enrollments]] = await db.promise().query(
            "SELECT COUNT(*) total FROM enrollments"
        );

        res.json({
            users: users.total,
            teachers: teachers.total,
            courses: courses.total,
            enrollments: enrollments.total
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

/* ================= USERS ================= */
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            SELECT user_id, name, email, role,  created_at
            FROM users
            ORDER BY created_at DESC
        `);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Kiểm tra user có tồn tại không
        const [[user]] = await db.promise().query(
            "SELECT user_id, role FROM users WHERE user_id=?",
            [id]
        );

        if (!user) {
            return res.status(404).json({ message: "User không tồn tại" });
        }

        // Không cho phép xóa admin
        if (user.role === "admin") {
            return res.status(403).json({ message: "Không thể xóa tài khoản admin" });
        }

        // Nếu là teacher, cần xử lý các khóa học của teacher
        if (user.role === "teacher") {
            // Lấy danh sách khóa học của teacher
            const [courses] = await db.promise().query(
                "SELECT course_id FROM courses WHERE teacher_id=?",
                [id]
            );

            // Xóa dữ liệu liên quan đến từng khóa học
            for (const course of courses) {
                const [lessons] = await db.promise().query(
                    "SELECT lesson_id FROM lessons WHERE course_id=?",
                    [course.course_id]
                );

                for (const lesson of lessons) {
                    await db.promise().query(
                        "DELETE FROM quiz_questions WHERE lesson_id=?",
                        [lesson.lesson_id]
                    );
                    await db.promise().query(
                        "DELETE FROM quiz_results WHERE lesson_id=?",
                        [lesson.lesson_id]
                    );
                }

                await db.promise().query(
                    "DELETE FROM user_progress WHERE course_id=?",
                    [course.course_id]
                );
                await db.promise().query(
                    "DELETE FROM lessons WHERE course_id=?",
                    [course.course_id]
                );
                await db.promise().query(
                    "DELETE FROM enrollments WHERE course_id=?",
                    [course.course_id]
                );
                await db.promise().query(
                    "DELETE FROM courses WHERE course_id=?",
                    [course.course_id]
                );
            }
        }

        // Xóa quiz_results của user
        await db.promise().query(
            "DELETE FROM quiz_results WHERE user_id=?",
            [id]
        );

        // Xóa user_progress của user
        await db.promise().query(
            "DELETE FROM user_progress WHERE user_id=?",
            [id]
        );

        // Xóa enrollments của user
        await db.promise().query(
            "DELETE FROM enrollments WHERE user_id=?",
            [id]
        );

        // Xóa notifications của user
        await db.promise().query(
            "DELETE FROM notifications WHERE user_id=?",
            [id]
        );

        // Cuối cùng xóa user
        await db.promise().query(
            "DELETE FROM users WHERE user_id=?",
            [id]
        );

        res.json({ message: "Xóa user thành công" });
    } catch (err) {
        console.error("Delete user error:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

/* COURSES*/
export const getAllCourses = async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            SELECT 
                c.course_id,
                c.title,
                c.description,
                c.year,
                c.thumbnail,
                c.created_at,
                u.name AS teacher_name,
                u.email AS teacher_email
            FROM courses c
            LEFT JOIN users u ON c.teacher_id = u.user_id
            ORDER BY c.created_at DESC
        `);

        res.json(rows);
    } catch (err) {
        console.error("Get courses error:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        // Lấy danh sách lesson_id để xóa các dữ liệu liên quan
        const [lessons] = await db.promise().query(
            "SELECT lesson_id FROM lessons WHERE course_id=?",
            [id]
        );

        // Xóa quiz_questions và quiz_results của các bài học
        for (const lesson of lessons) {
            await db.promise().query(
                "DELETE FROM quiz_questions WHERE lesson_id=?",
                [lesson.lesson_id]
            );
            await db.promise().query(
                "DELETE FROM quiz_results WHERE lesson_id=?",
                [lesson.lesson_id]
            );
        }

        // Xóa quiz_results theo course_id (trường hợp có liên kết trực tiếp)
        await db.promise().query(
            "DELETE FROM quiz_results WHERE course_id=?",
            [id]
        );

        // Xóa user_progress của các bài học
        await db.promise().query(
            "DELETE FROM user_progress WHERE course_id=?",
            [id]
        );

        // Xóa lessons
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
    } catch (err) {
        console.error("Error deleting course:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

/* ================= TEACHERS ================= */
export const createTeacher = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Kiểm tra thông tin đầu vào
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
        }

        // Kiểm tra email đã tồn tại chưa
        const [[existing]] = await db.promise().query(
            "SELECT user_id FROM users WHERE email=?",
            [email]
        );

        if (existing) {
            return res.status(400).json({ message: "Email đã được sử dụng" });
        }

        // Hash password
        const bcrypt = await import("bcrypt");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo tài khoản giảng viên
        const [result] = await db.promise().query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'teacher')",
            [name, email, hashedPassword]
        );

        res.status(201).json({ 
            message: "Tạo tài khoản giảng viên thành công",
            user_id: result.insertId
        });
    } catch (err) {
        console.error("Create teacher error:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};
