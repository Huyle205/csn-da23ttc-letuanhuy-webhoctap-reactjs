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