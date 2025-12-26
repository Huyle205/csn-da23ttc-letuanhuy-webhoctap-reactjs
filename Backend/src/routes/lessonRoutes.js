import express from "express";
import { getLessonById } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/:lessonId", getLessonById);

export default router;
