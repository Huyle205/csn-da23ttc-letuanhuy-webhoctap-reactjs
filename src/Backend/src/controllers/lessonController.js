import db from "../config/db.js";

export const getLessonById = async (req, res) => {
    try {
        const { lessonId } = req.params;

        const [rows] = await db.promise().query(
            "SELECT * FROM lessons WHERE lesson_id = ?",
            [lessonId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err });
    }
};
