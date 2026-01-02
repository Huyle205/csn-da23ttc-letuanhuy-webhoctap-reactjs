import express from 'express';
import { signUp,signIn,signOut,refreshToken } from '../controllers/authController.js';
const router = express.Router();

// Đăng ký người dùng  
router.post('/signup', signUp)
// dang nhap nguoi dung
router.post('/signin', signIn)
// danh xuat nguoi dung
router.post('/signout', signOut)
// request refresh token
router.post('/refresh', refreshToken)
export default router;