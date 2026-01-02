import { useState } from "react";
import { apiClient } from "../../services/apiClient";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const AdminAddTeacher = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim()) {
            setError("Vui lòng nhập tên giảng viên");
            return;
        }

        if (!formData.email.trim()) {
            setError("Vui lòng nhập email");
            return;
        }

        if (!formData.password || formData.password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setLoading(true);
        try {
            await apiClient("http://localhost:3000/api/admin/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            alert("Thêm giảng viên thành công!");
            navigate("/admin/users");
        } catch (err) {
            setError(err.message || "Có lỗi xảy ra khi thêm giảng viên");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link 
                    to="/admin/users" 
                    className="text-blue-600 hover:text-blue-800 text-sm inline-block mb-2"
                >
                    ← Quay lại danh sách người dùng
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Thêm giảng viên mới</span>
                </h2>
                <p className="text-gray-600 text-sm mt-1">Tạo tài khoản giảng viên cho hệ thống</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập họ và tên giảng viên"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Mật khẩu phải có ít nhất 6 ký tự</p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span>{loading ? "Đang tạo..." : "Tạo tài khoản"}</span>
                    </button>
                    <Link
                        to="/admin/users"
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Hủy
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AdminAddTeacher;
