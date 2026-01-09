import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Đảm bảo thư mục uploads/thumbnails tồn tại
const uploadsDir = path.join(__dirname, '../../uploads/thumbnails');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Cấu hình lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/thumbnails/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = 'course-' + uniqueSuffix + path.extname(file.originalname);
        console.log(' Saving file:', filename);
        cb(null, filename);
    }
});

// Lọc file chỉ cho phép ảnh
const fileFilter = (req, file, cb) => {
    console.log('📁 File received:', { 
        fieldname: file.fieldname, 
        originalname: file.originalname, 
        mimetype: file.mimetype 
    });
    
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Chỉ cho phép upload file ảnh!'));
    }
};

// Cấu hình multer
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});
