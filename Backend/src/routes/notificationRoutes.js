import express from "express";
import { getNotifications } from "../controllers/NotificationController.js";
import { markAsRead } from "../controllers/NotificationController.js";
const router = express.Router();
router.get("/", getNotifications);
router.patch("/:id/read",  markAsRead)
export default router;
