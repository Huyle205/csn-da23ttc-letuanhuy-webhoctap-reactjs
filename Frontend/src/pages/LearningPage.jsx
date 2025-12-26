import { useEffect, useState } from "react";
import CourseHeader from "../components/CourseHeader";
import VideoPlayer from "../components/VideoPlayer";
import LessonList from "../components/LessonList";
import Quiz from "../components/Quiz";
import { useParams } from "react-router";
import { apiClient } from "../services/apiClient";

const LearningPage = () => {
    const { id } = useParams(); // course_id
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [progress, setProgress] = useState({ total: 0, done: 0, percent: 0 });

    // 1️ Lấy chi tiết khóa học
    const fetchCourseById = async () => {
        try {
            const data = await apiClient(`http://localhost:3000/api/courses/${id}`);
            setCourse(data);
        } catch (error) {
            console.error("Lỗi lấy chi tiết khóa học:", error);
        }
    };
    // 2️ Lấy danh sách bài học
    const fetchLessonsByCourseId = async () => {
        try {
            const data = await apiClient(`http://localhost:3000/api/courses/${id}/lessons`);
            setLessons(data);

            // chọn bài đầu tiên
            if (data.length > 0) setCurrentLesson(data[0]);

        } catch (error) {
            console.error("Lỗi lấy danh sách bài học:", error);
        }
    };
    // 3️ Lấy danh sách bài đã hoàn thành
    const fetchCompletedLessons = async () => {
        try {
            const data = await apiClient(`http://localhost:3000/api/progress/course/${id}`);
            setCompletedLessons(data.completedLessons.map(l => l.lesson_id));
        } catch (error) {
            console.error("Lỗi lấy tiến độ:", error);
        }
    };
    // 4 Khi user chuyển bài học
    const handleLessonChange = async (lesson) => {
        setCurrentLesson(lesson);

        // Nếu bài này chưa hoàn thành → gửi API đánh dấu hoàn thành
        if (!completedLessons.includes(lesson.lesson_id)) {
            try {
                await apiClient(`http://localhost:3000/api/progress/complete`, {
                    method: "POST",
                    body: JSON.stringify({
                        course_id: id,
                        lesson_id: lesson.lesson_id
                    })
                });

                setCompletedLessons(prev => [...prev, lesson.lesson_id]);
                checkCourseCompleted();
            } catch (error) {
                console.error("Lỗi cập nhật hoàn thành:", error);
            }
        }
    };
    // 5 Kiểm tra khóa học đã hoàn thành chưa
    const checkCourseCompleted = async () => {
        try {
            const result = await apiClient("http://localhost:3000/api/progress/check-complete", {
                method: "POST",
                body: JSON.stringify({ course_id: id })
            });

            if (result.completed) {
                console.log("Đã hoàn thành khóa học!");
            }
        } catch (error) {
            console.error("Lỗi check completed:", error);
        }
    }
    // 6 Lấy tiến trình khóa học
    const fetchCourseProgress = async () => {
        try {
            const data = await apiClient(`http://localhost:3000/api/progress/course/progress/${id}`);
            setProgress({
                total: data.total_lessons,
                done: data.completed_lessons,
                percent: data.percent
            });
        } catch (e) {
            console.log("Lỗi lấy tiến trình:", e);
        }
    };

    useEffect(() => {
        fetchCourseById();
        fetchLessonsByCourseId();
        fetchCompletedLessons();
        fetchCourseProgress();
    }, [id]);
    useEffect(() => {
        if (lessons.length > 0 && currentLesson && completedLessons.length >= 0) {

            const firstLessonId = lessons[0].lesson_id;

            if (!completedLessons.includes(firstLessonId)) {
                // gọi API đánh dấu bài đầu hoàn thành
                apiClient(`http://localhost:3000/api/progress/complete`, {
                    method: "POST",
                    body: JSON.stringify({
                        course_id: id,
                        lesson_id: firstLessonId
                    })
                })
                    .then(() => {
                        setCompletedLessons(prev => [...prev, firstLessonId]);
                        console.log("Đã tự động đánh dấu bài học đầu tiên.");
                    })
                    .catch(err => console.error("Lỗi đánh dấu bài đầu tiên:", err));
            }
        }
    }, [lessons, completedLessons, currentLesson, id]);
    return (
        <div className="w-full h-full flex flex-col">
            <CourseHeader 
                courseTitle={course?.title} 
                total={progress.total}
                done={progress.done}
                percent={progress.percent}
            />

            <div className="flex">
                <div className="flex-9/12 overflow-y-auto">

                    <VideoPlayer videoUrl={currentLesson?.video_url} />

                    <div className="px-20 py-3">
                        <h2 className="font-bold text-[24px]">{currentLesson?.title}</h2>
                        <p className="text-[18px] text-gray-500">{currentLesson?.content}</p>
                    </div>

                    <div className="mt-4 px-20">
                        <Quiz 
                            lesson_id={currentLesson?.lesson_id} 
                            course_id={id} />
                    </div>

                </div>

                <div className="flex-3/12">
                    <LessonList
                        lessons={lessons}
                        currentLesson={currentLesson}
                        completedLessons={completedLessons}
                        onSelectLesson={handleLessonChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default LearningPage;
