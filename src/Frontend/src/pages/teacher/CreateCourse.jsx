import { useState, useRef } from "react";
import { apiClient } from "../../services/apiClient";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";


const BasicThumbnails = [
    "../src/assets/img/Thumnail/t1.jpeg",
    "../src/assets/img/Thumnail/t2.jpeg",
    "../src/assets/img/Thumnail/t3.jpeg",
    "../src/assets/img/Thumnail/t4.jpeg",
    "../src/assets/img/Thumnail/t5.jpeg",
    "../src/assets/img/Thumnail/t6.jpeg",
    "../src/assets/img/Thumnail/TKW.jpg",
    "../src/assets/img/Thumnail/CSDL.png",
    "../src/assets/img/Thumnail/MMT.jpg",
    "../src/assets/img/Thumnail/DTDM.png",
];


const CreateCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError("Vui lòng chọn file hình ảnh");
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB
                setError("Kích thước ảnh không được vượt quá 5MB");
                return;
            }

            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
            setError("");
        }
    };

    const handleRemoveThumbnail = () => {
        setThumbnail(null);
        setThumbnailPreview("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Vui lòng nhập tên khóa học");
            return;
        }

        if (!year) {
            setError("Vui lòng chọn năm học");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('year', parseInt(year));
            
            if (thumbnail) {
                formData.append('thumbnail', thumbnail);
                console.log("✅ Đã thêm thumbnail vào FormData:", thumbnail.name);
            } else {
                // Chọn random một thumbnail từ mảng BasicThumbnails
                const randomIndex = Math.floor(Math.random() * BasicThumbnails.length);
                const randomThumbnail = BasicThumbnails[randomIndex];
                formData.append('defaultThumbnail', randomThumbnail);
                console.log("✅ Sử dụng thumbnail mặc định:", randomThumbnail);
            }

            // Debug: In ra tất cả entries của FormData
            console.log("📦 FormData entries:");
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            await apiClient("http://localhost:3000/api/teacher/courses", {
                method: "POST",
                body: formData
            });

            console.log("✅ Tạo khóa học thành công!");
            navigate("/teacher/courses");
        } catch (err) {
            console.error("❌ Lỗi khi tạo khóa học:", err);
            setError("Có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link 
                    to="/teacher/courses" 
                    className="text-blue-600 hover:text-blue-800 text-sm inline-block mb-2"
                >
                    ← Quay lại danh sách khóa học
                </Link>
                <h2 className="text-2xl font-bold text-gray-800">Tạo khóa học mới</h2>
                <p className="text-gray-600 text-sm mt-1">Thiết lập thông tin cơ bản cho khóa học của bạn</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tên khóa học <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập tên khóa học"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mô tả khóa học
                    </label>
                    <textarea
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập mô tả khóa học"
                        rows="5"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Năm học <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        required
                    >
                        <option value="">-- Chọn năm học --</option>
                        <option value="1">Năm nhất</option>
                        <option value="2">Năm hai</option>
                        <option value="3">Năm ba</option>
                        <option value="4">Năm tư</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ảnh thumbnail khóa học
                    </label>
                    <div className="space-y-3">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-sm text-gray-500">
                            {thumbnail ? `Đã chọn: ${thumbnail.name}` : "Chưa chọn file (Sẽ sử dụng thumbnail mặc định)"}
                        </p>
                        {thumbnailPreview && (
                            <div className="relative w-full max-w-md">
                                <img 
                                    src={thumbnailPreview} 
                                    alt="Preview" 
                                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveThumbnail}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faBook} />
                        <span>{loading ? "Đang tạo..." : "Tạo khóa học"}</span>
                    </button>
                    <Link
                        to="/teacher/courses"
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Hủy
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;
