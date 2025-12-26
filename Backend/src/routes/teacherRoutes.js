import express from "express";
import {
    createCourse,
    getMyCourses,
    createLesson,
    createQuiz,
    updateCourse,
    deleteCourse,
    getTeacherStats,
    getLessonsByCourse,
    updateLesson,
    deleteLesson,
    getQuizzesByLesson,
    updateQuiz,
    deleteQuiz,
    getMyStudents
} from "../controllers/teacherController.js";
import { TeacherMiddleware } from "../middlewares/TeacherMiddleware.js";
import { requireRole } from "../middlewares/RoleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.use(TeacherMiddleware);
// courses
router.post("/courses", requireRole("teacher"), upload.single('thumbnail'), createCourse);
router.get("/courses", requireRole("teacher"), getMyCourses);
router.put("/courses/:id", requireRole("teacher"), updateCourse);
router.delete("/courses/:id", requireRole("teacher"), deleteCourse);

// lessons
router.get("/courses/:courseId/lessons", requireRole("teacher"), getLessonsByCourse);
router.post("/lessons", requireRole("teacher"), createLesson);
router.put("/lessons/:id", requireRole("teacher"), updateLesson);
router.delete("/lessons/:id", requireRole("teacher"), deleteLesson);

// quiz
router.get("/lessons/:lessonId/quizzes", requireRole("teacher"), getQuizzesByLesson);
router.post("/quiz", requireRole("teacher"), createQuiz);
router.put("/quiz/:id", requireRole("teacher"), updateQuiz);
router.delete("/quiz/:id", requireRole("teacher"), deleteQuiz);

// stats & students
router.get("/stats", requireRole("teacher"), getTeacherStats);
router.get("/students", requireRole("teacher"), getMyStudents);

export default router;
