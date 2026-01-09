import express from "express";
import { getNotifications, markAsRead, sendNotificationToAllStudents } from "../controllers/NotificationController.js";
const router = express.Router();
router.get("/", getNotifications);
router.patch("/:id/read",  markAsRead);
router.post("/broadcast-students", sendNotificationToAllStudents);
export default router;
