import express from "express";
import { getAllCourses , getCourseById, getLessonsByCourseId, searchCourses} from "../controllers/courseController.js";

const router = express.Router();
// tim kiem khoa hoc theo ten
router.get("/search", searchCourses);
// lay tat ca khoa hoc
router.get("/", getAllCourses);

// lay khoa hoc theo id
router.get("/:id", getCourseById);

// lay danh sach bai hoc theo khoa hoc id (tính tổng số bài học, tổng thời lượng)
router.get("/:id/lessons",  getLessonsByCourseId)


export default router;