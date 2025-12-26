import { use, useEffect, useState } from "react";
import { apiClient } from "../services/apiClient";
import { useNavigate } from "react-router";
import { logout } from "../utils/auth.js";



export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [myCourses, setMyCourses] = useState([]);
    const [stats, setStats] = useState({
        joinedCourses: 0,
        completedCourses: 0,
        totalLessonsDone: 0,
        totalLessons: 0,
        overallProgress: 0,
        quizCount: 0,
        avgQuizScore: 0
    });
   
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await apiClient("http://localhost:3000/api/users/profile");
                setUser(data);
            } catch {
                navigate("/signin");
            }
        };
        fetchUser();

        const fetchCourses = async () => {
            try {
                const data = await apiClient("http://localhost:3000/api/enrollments/my-courses");
                setMyCourses(data);
            } catch { }
        };
        fetchCourses();
    }, []);
     // Thống kê người dùng
    useEffect(() => {

        const fetchStats = async () => {
            try {
                const stats = await apiClient("http://localhost:3000/api/user/stats");
                setStats(stats);
            } catch (err) {
                console.error("Lỗi thống kê:", err);
            }
        }

        fetchStats();
    }, []);


    // Khi nhan dang xuat
    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            alert("Đăng xuất thành công!");
            navigate("/signin"); // chuyển về login
        } else {
            alert("Đăng xuất thất bại!");
        }
    };



    if (!user) return <p className="text-center mt-10">Đang tải...</p>;

    return (
        <div className="min-w-full mx-auto px-10 mt-40 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* LEFT - USER INFO */}
            <div className="bg-white shadow rounded-lg p-6 col-span-1 flex flex-col items-center text-center ">
                <div className="flex items-center justify-start w-full space-x-4">
                    <div className="w-16 h-16 bg-blue-500 flex items-center justify-center text-white text-2xl rounded-full">
                        {user.name[0].toUpperCase()}
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                <div className="mt-6 space-y-2 text-left w-full">
                    <p><span className="font-semibold">Vai trò:</span> {user.role}</p>
                    <p><span className="font-semibold">Ngày tham gia:</span> {new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>

                <button className="mt-5 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600" onClick={handleLogout}>
                    Đăng xuất
                </button>
            </div>

            {/* RIGHT - Thống kê */}
            <div className="bg-white shadow rounded-lg p-6 col-span-2">
                <h3 className="text-xl font-bold mb-4">Thống kê học tập</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                    <div className="p-4 border rounded-lg text-center bg-blue-50">
                        <p className="text-3xl font-bold text-blue-600">{stats.joinedCourses}</p>
                        <p className="text-gray-600 text-sm">Khóa đã tham gia</p>
                    </div>

                    <div className="p-4 border rounded-lg text-center bg-green-50">
                        <p className="text-3xl font-bold text-green-600">{stats.completedCourses}</p>
                        <p className="text-gray-600 text-sm">Khóa đã hoàn thành</p>
                    </div>

                    <div className="p-4 border rounded-lg text-center bg-purple-50">
                        <p className="text-3xl font-bold text-purple-600">{stats.totalLessonsDone}</p>
                        <p className="text-gray-600 text-sm">Bài học đã hoàn thành</p>
                    </div>

                    <div className="p-4 border rounded-lg text-center bg-orange-50">
                        <p className="text-3xl font-bold text-orange-600">{stats.quizCount}</p>
                        <p className="text-gray-600 text-sm">Quiz đã làm</p>
                    </div>

                    <div className="p-4 border rounded-lg text-center bg-yellow-50">
                        <p className="text-3xl font-bold text-yellow-600">{stats.avgQuizScore}%</p>
                        <p className="text-gray-600 text-sm">Điểm TB Quiz</p>
                    </div>

                </div>
            </div>



        </div>
    );
}
