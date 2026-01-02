import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChalkboardTeacher, faBook, faFileAlt } from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await apiClient("http://localhost:3000/api/admin/stats");
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
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
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Quản trị</h1>
                <p className="text-gray-600 text-sm mt-1">Tổng quan hệ thống TVU Learn</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    icon={<FontAwesomeIcon icon={faUsers} />}
                    title="Tổng sinh viên" 
                    value={stats?.users || 0}
                    color="blue"
                    link="/admin/users"
                />
                <StatCard 
                    icon={<FontAwesomeIcon icon={faChalkboardTeacher} />}
                    title="Tổng giảng viên" 
                    value={stats?.teachers || 0}
                    color="purple"
                />
                <StatCard 
                    icon={<FontAwesomeIcon icon={faBook} />}
                    title="Tổng khóa học" 
                    value={stats?.courses || 0}
                    color="green"
                    link="/admin/courses"
                />
                <StatCard 
                    icon={<FontAwesomeIcon icon={faFileAlt} />}
                    title="Lượt tham gia khóa học" 
                    value={stats?.enrollments || 0}
                    color="orange"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quản lý nhanh</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/admin/users"
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                            <FontAwesomeIcon icon={faUsers} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Quản lý người dùng</h3>
                            <p className="text-sm text-gray-600">Xem, khóa/mở tài khoản</p>
                        </div>
                    </Link>

                    <Link
                        to="/admin/teachers/create"
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                            <FontAwesomeIcon icon={faChalkboardTeacher} className="text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Thêm giảng viên</h3>
                            <p className="text-sm text-gray-600">Tạo tài khoản giảng viên mới</p>
                        </div>
                    </Link>

                    <Link
                        to="/admin/courses"
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                            <FontAwesomeIcon icon={faBook} className="text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Quản lý khóa học</h3>
                            <p className="text-sm text-gray-600">Duyệt và quản lý khóa học</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, color, link }) => {
    const colorClasses = {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        green: "bg-green-500",
        orange: "bg-orange-500"
    };

    const content = (
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center text-2xl`}>
                    {icon}
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    );

    return link ? <Link to={link}>{content}</Link> : content;
};

export default AdminDashboard;
