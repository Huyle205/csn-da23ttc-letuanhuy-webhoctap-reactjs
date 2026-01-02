import { Routes, Route } from "react-router-dom";
import TeacherLayout from "../layouts/TeacherLayout";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherCourses from "../pages/teacher/TeacherCourses";
import CreateCourse from "../pages/teacher/CreateCourse";
import CreateLesson from "../pages/teacher/CreateLesson";
import TeacherRoute from "./TeacherRoute";
import EditCourse from "../pages/teacher/EditCourse";
import TeacherLessonQuizPage from "../pages/teacher/TeacherLessonQuiz";
import Students from "../pages/teacher/Students";
const TeacherRoutes = () => {
    return (
        <Routes>
            <Route
                path="/teacher"
                element={
                    <TeacherRoute>
                        <TeacherLayout />
                    </TeacherRoute>
                }
            >
                <Route index element={<TeacherDashboard />} />
                <Route path="courses" element={<TeacherCourses />} />
                <Route path="courses/create" element={<CreateCourse />} />
                <Route path="lessons/create/:courseId" element={<CreateLesson />} />
                <Route path="courses/edit/:id" element={<EditCourse />} />
                <Route path="lessons/:lessonId/quiz" element={<TeacherLessonQuizPage />}/>
                <Route path="students" element={<Students />} />
            </Route>
        </Routes>
    );
};

export default TeacherRoutes;
