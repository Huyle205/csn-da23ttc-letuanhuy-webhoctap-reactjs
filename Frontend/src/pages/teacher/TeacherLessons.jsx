import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherLessonQuiz from "./TeacherLessonQuiz";
import { apiClient } from "../../services/apiClient";

const TeacherLessons = () => {
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            const data = await apiClient(
                `http://localhost:3000/api/teacher/courses/${courseId}/lessons`
            );
            setLessons(data);
        };
        fetchLessons();
    }, [courseId]);

    return (
        <div className="grid grid-cols-3 gap-6 p-6">

            <div className="border rounded p-4">
                <h2 className="font-bold mb-3">Danh sách bài học</h2>
                {lessons.map(ls => (
                    <button
                        key={ls.lesson_id}
                        onClick={() => setSelectedLesson(ls.lesson_id)}
                        className="block w-full text-left p-2 hover:bg-gray-100"
                    >
                        {ls.title}
                    </button>
                ))}
            </div>

            <div className="col-span-2 border rounded p-4">
                {selectedLesson ? (
                    <>
                        <h2 className="font-bold mb-3">Quiz của bài học</h2>
                        <TeacherLessonQuiz lessonId={selectedLesson} />
                    </>
                ) : (
                    <p className="text-gray-500">
                        Chọn bài học để quản lý quiz
                    </p>
                )}
            </div>

        </div>
    );
};

export default TeacherLessons;
