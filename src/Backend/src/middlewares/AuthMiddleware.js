import jwt from "jsonwebtoken";
import db from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const AuthMiddleware = async (req, res, next) => {
  try {
    //  Lấy token từ Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Không tìm thấy token! Vui lòng đăng nhập."
      });
    }

    // 2️ Verify token
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
      if (err) {
        return res.status(403).json({
          message: "Token không hợp lệ hoặc đã hết hạn"
        });
      }

      // 3️ Tìm user trong DB
      const [rows] = await db
        .promise()
        .query("SELECT * FROM users WHERE user_id = ?", [decodedUser.user_id]);

      if (rows.length === 0) {
        return res.status(404).json({
          message: "Người dùng không tồn tại"
        });
      }

      // 4️ GÁN req.user 
      req.user = rows[0];

      //  Cho phép đi tiếp
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message
    });
  }
};
