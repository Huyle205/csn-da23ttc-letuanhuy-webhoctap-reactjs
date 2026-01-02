import express from "express";
import { getQuizByLesson } from "../controllers/QuizController.js";
import { saveQuizResult } from "../controllers/QuizController.js";
import { createQuiz, updateQuiz, deleteQuiz } from "../controllers/QuizController.js";
const router = express.Router();
// lấy quiz theo lesson id
router.get("/lesson/:lessonId", getQuizByLesson);
// nộp bài quiz
router.post("/submit", saveQuizResult);
// teacher CRUD
router.post("/", createQuiz);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
export default router;