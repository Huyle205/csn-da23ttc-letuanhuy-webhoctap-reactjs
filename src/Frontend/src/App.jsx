import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import MyCourses from './pages/MyCourses.jsx'
import LearningLayout from './layouts/LearningLayout.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import SearchResult from './pages/SearchResult.jsx'
import Signin from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import TeacherRoutes from './routes/TeacherRoutes.jsx'
import TeacherRoute from './routes/TeacherRoute.jsx'
import TeacherLayout from './layouts/TeacherLayout.jsx'
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx'
import TeacherCourses from './pages/teacher/TeacherCourses.jsx'
import CreateCourse from './pages/teacher/CreateCourse.jsx'
import CreateLesson from './pages/teacher/CreateLesson.jsx'
import EditCourse from './pages/teacher/EditCourse.jsx'
import EditLesson from './pages/teacher/EditLesson.jsx'
import TeacherLessons from './pages/teacher/TeacherLessons.jsx'
import TeacherLessonQuizPage from './pages/teacher/TeacherLessonQuizPage.jsx'
import TeacherCourseDetail from './pages/teacher/TeacherCourseDetail.jsx'
import Students from './pages/teacher/Students.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminCourses from './pages/admin/AdminCourses.jsx'
import AdminAddTeacher from './pages/admin/AdminAddTeacher.jsx'
import { initAuth } from './services/authSevices.js';
import { useEffect, useState } from 'react';



function App() {
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      await initAuth();
      setAuthInitialized(true);
    };

    initializeAuth();
  }, []);

  if (!authInitialized) {
    return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes - Main Layout */}
        <Route path="/" element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route index element={<Home />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="course/:id" element={<CourseDetail />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Learning Layout */}
        <Route
          path="/course/:id/learning"
          element={
            <PrivateRoute>
              <LearningLayout />
            </PrivateRoute>
          }
        />

        {/* Teacher routes */}
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
          <Route path="courses/edit/:id" element={<EditCourse />} />
          <Route path="courses/:courseId/lessons" element={<TeacherCourseDetail />} />
          <Route path="lessons/create/:courseId" element={<CreateLesson />} />
          <Route path="lessons/:lessonId/quiz" element={<TeacherLessonQuizPage />} />
          <Route path="lessons/edit/:lessonId" element={<EditLesson />} />
          <Route path="students" element={<Students />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout />
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="teachers/create" element={<AdminAddTeacher />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
