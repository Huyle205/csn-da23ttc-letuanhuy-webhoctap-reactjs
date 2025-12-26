import db from "../config/db.js";


// api lay tat ca khoa hoc
export const getAllCourses = (req, res) => {
    const sql = "SELECT * FROM Courses ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json(results);
    })
}

// api lay khoa hoc theo id
export const getCourseById = (req, res) => {
    const courseId = req.params.id;
    const sql = "SELECT * FROM courses WHERE course_id = ?";

    db.query(sql, [courseId], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (results.length === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(results[0]);
    });
};

// api lay danh sach bai hoc theo khoa hoc id (tính tổng số bài học)
export const getLessonsByCourseId = (req, res) => {
    const courseId = req.params.id; 
    const sql = `SELECT * FROM lessons WHERE course_id = ?`;

    db.query(sql, [courseId], (err, results) => {
        if(err) return res.status(500).json({message:"Database error", error: err});
        res.status(200).json(results);
    })

}


// api tim kiem khoa hoc theo ten
export const searchCourses = async (req, res) => {
  const q = req.query.q;

  if (!q) return res.json([""]);

  const [courses] = await db.promise().query(
    "SELECT  course_id, title, thumbnail FROM courses WHERE title LIKE ? LIMIT 10",
    [`%${q}%`]
  );
  res.json(courses);
};
