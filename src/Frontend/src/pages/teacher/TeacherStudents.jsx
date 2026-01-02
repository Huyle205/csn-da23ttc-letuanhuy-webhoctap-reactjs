import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBook } from "@fortawesome/free-solid-svg-icons";

const TeacherStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await apiClient("http://localhost:3000/api/teacher/students");
                setStudents(data);
            } catch (error) {
                console.error("Failed to fetch students:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

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
                <h1 className="text-2xl font-bold text-gray-800">Danh sách học viên</h1>
                <p className="text-gray-600 text-sm mt-1">
                    Tổng số học viên đã đăng ký khóa học của bạn: {students.length}
                </p>
            </div>

            {students.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">
                        <FontAwesomeIcon icon={faUsers} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có học viên nào</h3>
                    <p className="text-gray-600">Chưa có học viên nào đăng ký khóa học của bạn</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">STT</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Họ và tên</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Số khóa học đã đăng ký</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {students.map((student, index) => (
                                <tr key={student.user_id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">{student.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {student.full_name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                            <FontAwesomeIcon icon={faBook} />
                                            <span>{student.enrolled_courses}</span>
                                        </span>
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

export default TeacherStudents;
