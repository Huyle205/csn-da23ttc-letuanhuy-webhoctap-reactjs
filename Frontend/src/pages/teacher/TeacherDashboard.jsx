import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPlus, faFileAlt, faVial, faUsers } from "@fortawesome/free-solid-svg-icons";

const TeacherDashboard = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalStudents: 0,
        totalLessons: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiClient('http://localhost:3000/api/teacher/stats');
                setStats(response);
            } catch (error) {
                console.error('Error fetching stats:', error);
                // Set default stats if API fails
                setStats({
                    totalCourses: 0,
                    totalStudents: 0,
                    totalLessons: 0
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const menuItems = [
        {
            title: "Khóa học của tôi",
            description: "Xem và quản lý các khóa học",
            path: "/teacher/courses",
            color: "bg-blue-500",
            count: stats.totalCourses,
            icon: faBook
        },
        {
            title: "Tạo khóa học mới",
            description: "Thêm khóa học mới vào hệ thống",
            path: "/teacher/courses/create",
            color: "bg-green-500",
            icon: faPlus
        },
        {
            title: "Danh sách sinh viên",
            description: "Xem sinh viên đã tham gia khóa học",
            path: "/teacher/students",
            color: "bg-purple-500",
            count: stats.totalStudents,
            icon: faUsers
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Giảng viên</h1>
                <p className="text-gray-600">Chào mừng bạn quay trở lại! Quản lý khóa học và học viên của bạn.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Tổng khóa học</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalCourses}</p>
                        </div>
                        <div className="text-4xl text-blue-600">
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Tổng sinh viên</p>
                            <p className="text-3xl font-bold text-green-600">{stats.totalStudents}</p>
                        </div>
                        <div className="text-4xl text-green-600">
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Tổng bài học</p>
                            <p className="text-3xl font-bold text-purple-600">{stats.totalLessons}</p>
                        </div>
                        <div className="text-4xl text-purple-600">
                            <FontAwesomeIcon icon={faFileAlt} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-transparent hover:border-blue-500"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <FontAwesomeIcon icon={item.icon} className="text-xl" />
                                    <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                                </div>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                            {item.count !== undefined && (
                                <span className={`${item.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                                    {item.count}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TeacherDashboard;
