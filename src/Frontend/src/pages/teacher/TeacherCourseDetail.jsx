import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faVideo, faFile, faVial, faEdit } from "@fortawesome/free-solid-svg-icons";

const TeacherCourseDetail = () => {
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);

    const fetchLessons = async () => {
        const data = await apiClient(
            `http://localhost:3000/api/teacher/courses/${courseId}/lessons`
        );
        setLessons(data);
    };

    useEffect(() => {
        fetchLessons();
    }, [courseId]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Link to="/teacher/courses" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                        ← Quay lại danh sách khóa học
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">Danh sách bài học</h2>
                    <p className="text-gray-600 text-sm mt-1">Quản lý nội dung và bài tập của khóa học</p>
                </div>
                <Link
                    to={`/teacher/lessons/create/${courseId}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                    <span className="text-xl">+</span>
                    Tạo bài học mới
                </Link>
            </div>

            {lessons.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">
                        <FontAwesomeIcon icon={faBookOpen} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài học nào</h3>
                    <p className="text-gray-600 mb-6">Hãy tạo bài học đầu tiên cho khóa học này!</p>
                    <Link
                        to={`/teacher/lessons/create/${courseId}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        Tạo bài học
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {lessons.map(lesson => (
                        <div
                            key={lesson.lesson_id}
                            className="bg-white border rounded-lg p-6 hover:shadow-lg transition group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                            Bài {lesson.order_index}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-800">
                                            {lesson.title}
                                        </h3>
                                    </div>
                                    {lesson.description && (
                                        <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                                    )}
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        {lesson.video_url && (
                                            <span className="flex items-center gap-1">
                                                <FontAwesomeIcon icon={faVideo} />
                                                <span>Video</span>
                                            </span>
                                        )}
                                        {lesson.content && (
                                            <span className="flex items-center gap-1">
                                                <FontAwesomeIcon icon={faFile} />
                                                <span>Nội dung</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link
                                        to={`/teacher/lessons/${lesson.lesson_id}/quiz`}
                                        className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg font-semibold transition flex items-center gap-2"
                                    >
                                        <span>Quản lý Quiz</span>
                                    </Link>
                                    <Link
                                        to={`/teacher/lessons/edit/${lesson.lesson_id}`}
                                        className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg font-semibold transition flex items-center gap-2"
                                    >
                                        <span>Chỉnh sửa</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeacherCourseDetail;
