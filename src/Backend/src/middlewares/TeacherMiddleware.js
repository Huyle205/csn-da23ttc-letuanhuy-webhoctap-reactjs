export const TeacherMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "teacher") {
        return res.status(403).json({ message: "Chỉ giảng viên được phép" });
    }
    next();
};
