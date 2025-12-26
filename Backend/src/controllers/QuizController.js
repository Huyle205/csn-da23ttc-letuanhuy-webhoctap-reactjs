
import db from "../config/db.js";

// lay quiz theo lesson id
export const getQuizByLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;

        const [rows] = await db.promise().query(
            "SELECT question_id, lesson_id, question, options, correct_answer FROM quiz_questions WHERE lesson_id = ?",
            [lessonId]
        );

        const formatted = rows.map(q => ({
            question_id: q.question_id,
            lesson_id: q.lesson_id,
            question: q.question,
            correct_answer: q.correct_answer,
            options: JSON.parse(q.options)   // options là JSON string → parse
        }));

        res.json(formatted);

    } catch (err) {
        res.status(500).json({ message: "Lỗi server", err });
    }
};


//  luu ket qua quiz
// export const saveQuizResult = async (req, res) => {
//     const user = req.user;
//     const { lesson_id, course_id, score, total_questions } = req.body;

//     if (!lesson_id || !course_id) {
//         return res.status(400).json({ message: "Thiếu lesson_id hoặc course_id" });
//     }

//     try {
//         await db.promise().query(
//             `INSERT INTO quiz_results (user_id, lesson_id, score, course_id, total_questions)
//              VALUES (?,?,?,?,?)`,
//             [user.user_id, lesson_id, score, course_id, total_questions]
//         );

//         res.json({ message: "Đã lưu kết quả quiz!" });

//     } catch (error) {
//         console.log("ERROR SUBMIT QUIZ:", error);
//         res.status(500).json({
//             message: "Lỗi lưu kết quả quiz",
//             error: error.message
//         });
//     }
// };

export const saveQuizResult = async (req, res) => {
    const user_id = req.user.user_id;
    const { lesson_id, course_id, score, total_questions } = req.body;

    if (!lesson_id || !course_id) {
        return res.status(400).json({ message: "Thiếu lesson_id hoặc course_id" });
    }

    try {
        // Check nếu user đã làm quiz này trước đó
        const [exists] = await db.promise().query(
            `SELECT * FROM quiz_results WHERE user_id = ? AND lesson_id = ? LIMIT 1`,
            [user_id, lesson_id]
        );

        if (exists.length > 0) {
            return res.json({
                message: "Quiz đã được ghi nhận trước đó! Lần này chỉ là luyện tập.",
                saved: false   // không lưu
            });
        }

        // Nếu chưa từng lưu → lưu lần đầu
        await db.promise().query(
            `INSERT INTO quiz_results (user_id, lesson_id, course_id, score, total_questions)
             VALUES (?,?,?,?,?)`,
            [user_id, lesson_id, course_id, score, total_questions]
        );

        return res.json({
            message: "Đã lưu kết quả quiz lần đầu!",
            saved: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi lưu kết quả quiz",
            error: error.message
        });
    }
};


// them sua xoa quiz o day nhe
// them 
export const createQuiz = async (req, res) => {
    const { lesson_id, question, options, correct_answer } = req.body;

    if (!lesson_id || !question || !options || !correct_answer) {
        return res.status(400).json({ message: "Thiếu dữ liệu quiz" });
    }

    try {
        await db.promise().query(
            `INSERT INTO quiz_questions (lesson_id, question, options, correct_answer)
             VALUES (?, ?, ?, ?)`,
            [lesson_id, question, JSON.stringify(options), correct_answer]
        );

        res.json({ message: "Tạo quiz thành công" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi tạo quiz", error: err.message });
    }
};
// sua
export const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const { question, options, correct_answer } = req.body;

    try {
        await db.promise().query(
            `UPDATE quiz_questions
             SET question = ?, options = ?, correct_answer = ?
             WHERE question_id = ?`,
            [question, JSON.stringify(options), correct_answer, id]
        );

        res.json({ message: "Cập nhật quiz thành công" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi cập nhật quiz", error: err.message });
    }
};
// xoa
export const deleteQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        await db.promise().query(
            "DELETE FROM quiz_questions WHERE question_id = ?",
            [id]
        );

        res.json({ message: "Đã xóa quiz" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xóa quiz", error: err.message });
    }
};
