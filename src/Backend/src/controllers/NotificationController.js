import db from "../config/db.js";

export const getNotifications = async (req, res) => {
    const user_id = req.user.user_id;

    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
            [user_id]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy thông báo", error: error.message });
    }
};


// danh dau thong bao da doc
export const markAsRead = async (req, res) => {
    const notificationId = req.params.id;
    const userId = req.user.user_id;

    try {
        await db.promise().query(
            `UPDATE notifications 
             SET status = 'read' 
             WHERE id = ? AND user_id = ?`,
            [notificationId, userId]
        );

        res.json({ message: "Đã đánh dấu là đã đọc" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
}

// gửi thông báo cho tất cả học viên
export const sendNotificationToAllStudents = async (req, res) => {
    const { message, type = 'info' } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({ message: "Nội dung thông báo không được để trống" });
    }

    // Kiểm tra type hợp lệ
    const validTypes = ['info', 'success', 'warning', 'error'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: "Loại thông báo không hợp lệ" });
    }

    try {
        // Lấy tất cả user_id của học viên
        const [students] = await db.promise().query(
            "SELECT user_id FROM users WHERE role = 'student'"
        );

        if (students.length === 0) {
            return res.status(404).json({ message: "Không có học viên nào trong hệ thống" });
        }

        // Tạo thông báo cho từng học viên
        const values = students.map(student => [
            student.user_id,
            message.trim(),
            type,
            'unread'
        ]);

        await db.promise().query(
            `INSERT INTO notifications (user_id, message, type, status) VALUES ?`,
            [values]
        );

        res.status(200).json({ 
            message: "Đã gửi thông báo thành công", 
            studentCount: students.length 
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi gửi thông báo", error: error.message });
    }
}