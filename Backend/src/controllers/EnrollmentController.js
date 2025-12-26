import db from "../config/db.js";



// xu tham gia khoa hoc
export const enrollCourse = async (req, res) => {
    try {
        // lay user id thu middleware
        const userId = req.user.user_id;
        const { course_id } = req.body;
        if (!course_id) {
            return res.status(400).json({ message: "Thiếu course_id" });
        }
        // kiem tra nguoi dung da dang ky khoa hoc chua
        const checkSql = "select * from enrollments where user_id = ? and course_id = ?";
        const [checkResults] = await db.promise().execute(checkSql, [userId, course_id]);
        if (checkResults.length > 0) {
            return res.status(400).json({ message: "Ban da dang ky khoa hoc nay" });
        }
        // them vao bang enrollments
        const sql = `
            INSERT INTO enrollments (user_id, course_id, progress, status, note)
            VALUES (?, ?, 0, 'enrolled', NULL)
        `;
        await db.promise().execute(sql, [userId, course_id]);
        return res.status(201).json({ message: "Dang ky khoa hoc thanh cong" });


    }
    catch (error) {
        return res.status(500).json({ message: "Loi server", error: error.message });
    }
}


// lay danh sach khoa hoc da dang ky cho nguoi dung
export const getMyCourses = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const sql = `
            SELECT c.*, e.progress, e.status, e.enrolled_at
            FROM courses c
            INNER JOIN enrollments e ON c.course_id = e.course_id
            WHERE e.user_id = ?
        `;

        const [rows] = await db.promise().execute(sql, [user_id]);
        return res.status(200).json(rows);
    } catch (error) { }
    return res.status(500).json({ message: "Loi server", error: error.message });


}  


// kiem tra nguoi dung da dang ky khoa hoc chua
export const checkEnrollment = async (req, res) => {   
    try {
        const user_id = req.user.user_id;
        const courseId = req.params.courseId;
        const sql = "select * from enrollments where user_id = ? and course_id = ?";
        const [rows] = await db.promise().execute(sql, [user_id, courseId]);
        if (rows.length > 0) {
            return res.status(200).json({ enrolled: true });
        } else {
            return res.status(200).json({ enrolled: false });
        }
    } catch (error) {
        return res.status(500).json({ message: "Loi server", error: error.message });
    }       
}