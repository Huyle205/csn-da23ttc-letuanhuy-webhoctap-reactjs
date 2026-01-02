import express from "express";
import {
    getAdminStats,
    getAllUsers,
    deleteUser,
    getAllCourses,
    deleteCourse,
    createTeacher
} from "../controllers/adminController.js";

import { requireRole } from "../middlewares/RoleMiddleware.js";

const router = express.Router();

router.use( requireRole("admin"));
// dashboard
router.get("/stats", getAdminStats);

// users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// teachers
router.post("/teachers", createTeacher);

// courses
router.get("/courses", getAllCourses);
router.delete("/courses/:id", deleteCourse);

export default router;
