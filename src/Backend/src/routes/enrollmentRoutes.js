import express from 'express';
import { enrollCourse, getMyCourses ,checkEnrollment} from '../controllers/EnrollmentController.js';

const router = express.Router();


// Đăng ký học viên cho khóa học
router.post('/enroll', enrollCourse);
// lay danh sach khoa hoc da dang ky cho nguoi dung
router.get('/my-courses', getMyCourses);
//kiem tra nguoi dung da dang ky khoa hoc chua
router.get('/check-enrollment/:courseId', checkEnrollment);
export default router;
