import express from "express";
import { getUserStats } from "../controllers/userStatsController.js";

const router = express.Router();

router.get("/", getUserStats);

export default router;
