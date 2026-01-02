import express from "express";
import { markLessonComplete ,getProgressByCourse, getCourseProgress,checkAndUpdateCourseStatus} from "../controllers/ProgressController.js";

const router = express.Router();

router.post("/complete", markLessonComplete);
router.get("/course/:courseId", getProgressByCourse);
router.get("/course/progress/:courseId", getCourseProgress);
router.post("/check-complete", checkAndUpdateCourseStatus);
export default router;
