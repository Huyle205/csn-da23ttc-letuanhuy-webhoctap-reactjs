import express from "express";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/UserRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import { AuthMiddleware } from "./middlewares/AuthMiddleware.js";
import quizRoutes from "./routes/quizRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import userStatsRoutes from "./routes/userStatsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import AdminRoutes from "./routes/adminRoutes.js";
const app = express();
// middlewares
app.use(cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true                // để browser gửi cookie
}));




app.use(cookieParser());

app.use(express.json());

// Phục vụ file tĩnh từ thư mục uploads
app.use('/uploads', express.static('uploads'));

// public ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// private ROUTES
app.use(AuthMiddleware);
app.use("/api/progress", progressRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/user/stats", userStatsRoutes);
app.use("/api/quiz",  quizRoutes);
app.use("/api/notifications", notificationRoutes);
        // role teacher
app.use("/api/teacher", teacherRoutes);
        // role admin      
app.use("/api/admin", AdminRoutes);



// start server
app.listen(3000, () => {
    console.log("Server dang chay");
});
