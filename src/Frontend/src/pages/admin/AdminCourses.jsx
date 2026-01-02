import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPause, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const data = await apiClient("http://localhost:3000/api/admin/courses");
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const remove = async (id) => {
        if (!window.confirm("Xóa khóa học này? Hành động không thể hoàn tác!")) return;
        
        try {
            await apiClient(
                `http://localhost:3000/api/admin/courses/${id}`,
                { method: "DELETE" }
            );
            fetchCourses();
        } catch (error) {
            alert("Có lỗi xảy ra khi xóa khóa học");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Đang tải...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý khóa học</h1>
                <p className="text-gray-600 text-sm mt-1">Duyệt và quản lý tất cả khóa học trong hệ thống</p>
            </div>

            {courses.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có khóa học nào</h3>
                    <p className="text-gray-600">Hệ thống chưa có khóa học nào được tạo</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên khóa học</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giảng viên</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Năm</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {courses.map(c => (
                                <tr key={c.course_id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">{c.title}</div>
                                        {c.description && (
                                            <div className="text-sm text-gray-500 mt-1 truncate max-w-md">
                                                {c.description}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {c.teacher_name ? (
                                            <div>
                                                <div className="font-medium text-gray-800">{c.teacher_name}</div>
                                                <div className="text-sm text-gray-500">{c.teacher_email}</div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-sm">Chưa có</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-600">Năm {c.year}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => remove(c.course_id)}
                                                className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded font-semibold text-sm"
                                                title="Xóa khóa học"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                                 Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminCourses;
