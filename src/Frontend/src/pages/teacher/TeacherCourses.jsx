// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { apiClient } from "../../services/apiClient";

// const TeacherCourses = () => {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             const data = await apiClient("http://localhost:3000/api/teacher/courses");
//             setCourses(data);
//         };
//         fetchCourses();
//     }, []);

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold mb-4">Khóa học của tôi</h2>

//             <div className="space-y-4">
//                 {courses.map(course => (
//                     <div key={course.course_id} className="bg-white p-4 shadow rounded">
//                         <h3 className="font-semibold text-lg">{course.title}</h3>
//                         <p className="text-sm text-gray-500">{course.description}</p>

//                         <Link
//                             to={`/teacher/lessons/create/${course.course_id}`}
//                             className="inline-block mt-2 text-blue-600 text-sm"
//                         >
//                             ➕ Thêm bài học
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default TeacherCourses;
import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFileAlt, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const TeacherCourses = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        const data = await apiClient("http://localhost:3000/api/teacher/courses");
        setCourses(data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Xóa khóa học này?")) return;

        await apiClient(`http://localhost:3000/api/teacher/courses/${id}`, {
            method: "DELETE"
        });

        fetchCourses();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Khóa học của tôi</h2>
                    <p className="text-gray-600 text-sm mt-1">Quản lý tất cả khóa học bạn đã tạo</p>
                </div>
                <Link
                    to="/teacher/courses/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                    <span className="text-xl">+</span>
                    Tạo khóa học mới
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">
                        <FontAwesomeIcon icon={faBook} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có khóa học nào</h3>
                    <p className="text-gray-600 mb-6">Hãy tạo khóa học đầu tiên của bạn!</p>
                    <Link
                        to="/teacher/courses/create"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        Tạo khóa học
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thumbnail</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên khóa học</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Năm</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {courses.map(c => (
                                <tr key={c.course_id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="w-20 h-12 rounded-lg overflow-hidden border border-gray-200">
                                            {c.thumbnail ? (
                                                <img 
                                                    src={c.thumbnail} 
                                                    alt={c.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/teacher/courses/${c.course_id}/lessons`}
                                            className="font-semibold text-blue-600 hover:text-blue-800"
                                        >
                                            {c.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">Năm {c.year}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link
                                                to={`/teacher/courses/${c.course_id}/lessons`}
                                                className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1"
                                                title="Xem bài học"
                                            >
                                                <FontAwesomeIcon icon={faFileAlt} />
                                                <span>Bài học</span>
                                            </Link>
                                            <Link
                                                to={`/teacher/courses/edit/${c.course_id}`}
                                                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                                                title="Chỉnh sửa"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                                <span>Sửa</span>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(c.course_id)}
                                                className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                                                title="Xóa khóa học"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                                <span>Xóa</span>
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

export default TeacherCourses;
