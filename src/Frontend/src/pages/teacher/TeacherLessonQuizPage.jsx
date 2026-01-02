import { useParams } from "react-router-dom";
import TeacherLessonQuiz from "./TeacherLessonQuiz";

const TeacherLessonQuizPage = () => {
    const { lessonId } = useParams();

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
                Quản lý quiz bài học
            </h2>

            <TeacherLessonQuiz lessonId={lessonId} />
        </div>
    );
};

export default TeacherLessonQuizPage;
