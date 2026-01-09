import jwt from "jsonwebtoken";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();


// ham tao access token
export const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
// ham tao refresh token
// export const createRefreshToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
// };


// dang ky nguoi dung
export const signUp = async (req, res) => {

    try {
        // lay du lieu tu nguoi dung gui len trong body
        const { name, email, password, role = "student" } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Email không hợp lệ" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
        }

        // Kiểm tra email đã tồn tại
        const checkUserSql = "SELECT * FROM users WHERE email = ?";
        const [existingUser] = await db.promise().query(checkUserSql, [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        // ma hoa mat khau
        const hashedPassword = await bcrypt.hash(password, 10);// salt rounds = 10

        // luu nguoi dung vao database
        const sqlInsertUser = "insert into users values (null,?, ?, ?, ?,null, now())";
        const [result] = await db
            .promise()
            .execute(sqlInsertUser, [name, email, hashedPassword, role]);


        const user_id = result.insertId;
        res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        res.status(500).json({ message: "Loi ne: ", error: error.message });
    }

}

// damg nhap nguoi dung
export const signIn = async (req, res) => {
    try {
        // lay du lieu nguoi dung gui len trong body
        const { email, password } = req.body;
        // kiem tra du lieu
        if (!email || !password)
            return res.status(400).json({ message: "Thiếu tên hoặc mật khẩu" });
        // check user co ton tai khong
        const sqlGetUser = "SELECT * FROM users WHERE email = ?";
        const [users] = await db
            .promise()
            .execute(sqlGetUser, [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        const user = users[0];
        //kiem tra mat khau
        const passwordcorrect = await bcrypt.compare(password, user.password);
        if (!passwordcorrect) {
            return res.status(400).json({ message: "email hoac mat khau khong dung" });
        }

        // neu mat khau dung thi tao access token bang jwt
        const accessToken = createAccessToken({ user_id: user.user_id , role: user.role });
        // tao resfresh token 
        const refreshToken = crypto.randomBytes(64).toString("hex");
        // luu refresh token vao database
        await db
            .promise()
            .execute(
                "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))",
                [user.user_id, refreshToken]
            );
        //tra refresh token ve cho coookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // chi gui cookie tren ket noi https
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngay
        })
        // tra ve access token cho client de luu vao local storage
        res.json({ 
            accessToken,
            user: {
                user_id: user.user_id,
                name: user.name,
                role: user.role
            }
        });

    }

    catch (error) {
        res.status(500).json({ message: "Loi ne: ", error: error.message });
    }
}


// dang xuat nguoi dung
export const signOut = async (req, res) => {
    try {
        // lay refresh token tu cookie
        const refreshToken = req.cookies?.refreshToken;

        // xoa refresh token trong database
        if (refreshToken) {
            await db
                .promise()
                .execute("DELETE FROM refresh_tokens WHERE token = ?", [refreshToken]);
        }
        // xoa cookie tren trinh duyet
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Dang xuat thanh cong" });

    } catch (error) {
        res.status(500).json({ message: "Loi ne: ", error: error.message });
    }

}


// resfesh access token
export const refreshToken = async (req, res) => {
    try {
        // 1. Lấy refresh token từ cookie
        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy refresh token" });
        }

        // 2. Kiểm tra token trong DB
        const sql = "SELECT * FROM refresh_tokens WHERE token = ?";
        const [rows] = await db.promise().execute(sql, [token]);

        if (rows.length === 0) {
            return res.status(403).json({ message: "Refresh token không hợp lệ" });
        }

        const refreshTokenData = rows[0];

        // 3. Kiểm tra token hết hạn
        const now = new Date();
        const expiresAt = new Date(refreshTokenData.expires_at);

        if (now > expiresAt) {
            return res.status(403).json({ message: "Refresh token đã hết hạn" });
        }

        // 4. Lấy thông tin user để tạo access token có đầy đủ thông tin
        const sqlGetUser = "SELECT user_id, role FROM users WHERE user_id = ?";
        const [users] = await db.promise().execute(sqlGetUser, [refreshTokenData.user_id]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        
        const user = users[0];

        // 5. Tạo access token MỚI với đầy đủ thông tin user_id và role
        const newAccessToken = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // 6. Trả access token về cho frontend
        return res.status(200).json({ accessToken: newAccessToken });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
