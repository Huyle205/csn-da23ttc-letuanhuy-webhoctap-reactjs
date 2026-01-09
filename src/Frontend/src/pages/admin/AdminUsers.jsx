import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserGraduate, faChalkboardTeacher, faCrown, faTrash, faUserPlus, faBell } from "@fortawesome/free-solid-svg-icons";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, student, teacher
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('info');
    const [sendingNotification, setSendingNotification] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await apiClient("http://localhost:3000/api/admin/users");
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id, email) => {
        if (!window.confirm(`Bạn có chắc muốn xóa tài khoản ${email}? Hành động này không thể hoàn tác!`)) return;
        
        try {
            await apiClient(
                `http://localhost:3000/api/admin/users/${id}`,
                { method: "DELETE" }
            );
            fetchUsers();
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa tài khoản");
        }
    };

    const sendNotificationToStudents = async () => {
        if (!notificationMessage.trim()) {
            alert("Vui lòng nhập nội dung thông báo");
            return;
        }

        setSendingNotification(true);
        try {
            const response = await apiClient(
                "http://localhost:3000/api/notifications/broadcast-students",
                {
                    method: "POST",
                    body: JSON.stringify({ 
                        message: notificationMessage,
                        type: notificationType 
                    }),
                }
            );
            
            toast.success(`Đã gửi thông báo thành công đến ${response.studentCount} học viên!`);
            setShowNotificationModal(false);
            setNotificationMessage('');
            setNotificationType('info');
        } catch (error) {
            toast.error("Có lỗi xảy ra khi gửi thông báo: " + (error.message || "Unknown error"));
        } finally {
            setSendingNotification(false);
        }
    };

    const filteredUsers = users.filter(u => {
        if (filter === 'all') return true;
        return u.role === filter;
    });

    const getRoleBadge = (role) => {
        const badges = {
            student: { color: 'bg-blue-100 text-blue-800', label: 'Học viên', icon: faUserGraduate },
            teacher: { color: 'bg-purple-100 text-purple-800', label: 'Giảng viên', icon: faChalkboardTeacher },
            admin: { color: 'bg-red-100 text-red-800', label: 'Admin', icon: faCrown }
        };
        return badges[role] || { color: 'bg-gray-100 text-gray-800', label: role, icon: faUsers };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Đang tải...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
                    <p className="text-gray-600 text-sm mt-1">Quản lý tài khoản và phân quyền người dùng</p>
                </div>
                <Link
                    to="/admin/teachers/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Thêm giảng viên</span>
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="mb-4 flex justify-between items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                            filter === 'all' 
                                ? 'bg-gray-800 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Tất cả ({users.length})
                    </button>
                    <button
                        onClick={() => setFilter('student')}
                        className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                            filter === 'student' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Học viên ({users.filter(u => u.role === 'student').length})
                    </button>
                    <button
                        onClick={() => setFilter('teacher')}
                        className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                            filter === 'teacher' 
                                ? 'bg-purple-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Giảng viên ({users.filter(u => u.role === 'teacher').length})
                    </button>
                </div>
                {filter === 'student' && (
                    <button
                        onClick={() => setShowNotificationModal(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
                    >
                        <FontAwesomeIcon icon={faBell} />
                        <span>Gửi thông báo</span>
                    </button>
                )}
            </div>

            {filteredUsers.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="text-6xl mb-4">
                        <FontAwesomeIcon icon={faUsers} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Không có người dùng nào</h3>
                    <p className="text-gray-600">Không tìm thấy người dùng phù hợp với bộ lọc</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Vai trò</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredUsers.map(u => {
                                const roleBadge = getRoleBadge(u.role);
                                return (
                                    <tr key={u.user_id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-800">{u.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{u.name || 'N/A'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 justify-center ${roleBadge.color}`}>
                                                <span>{roleBadge.label}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                {u.role !== 'admin' ? (
                                                    <button
                                                        onClick={() => deleteUser(u.user_id, u.email)}
                                                        className="px-4 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded font-semibold text-sm flex items-center gap-1"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                        <span>Xóa</span>
                                                    </button>
                                                ) : (
                                                    <span className="text-sm text-gray-400">Không thể xóa</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal gửi thông báo */}
            {showNotificationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FontAwesomeIcon icon={faBell} className="text-green-600" />
                                Gửi thông báo cho học viên
                            </h2>
                            <button
                                onClick={() => setShowNotificationModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Loại thông báo
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setNotificationType('info')}
                                    className={`px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 transition ${
                                        notificationType === 'info' 
                                            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                                    }`}
                                >
                                    <i className="fa-solid fa-info"></i>
                                    <span>Thông tin</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setNotificationType('success')}
                                    className={`px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 transition ${
                                        notificationType === 'success' 
                                            ? 'bg-green-100 text-green-700 ring-2 ring-green-500' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                                    }`}
                                >
                                    <i className="fa-solid fa-check"></i>
                                    <span>Thành công</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setNotificationType('warning')}
                                    className={`px-3 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1 transition ${
                                        notificationType === 'warning' 
                                            ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                                    }`}
                                >
                                    <i className="fa-solid fa-exclamation"></i>
                                    <span>Cảnh báo</span>
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nội dung thông báo
                            </label>
                            <textarea
                                value={notificationMessage}
                                onChange={(e) => setNotificationMessage(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows="5"
                                placeholder="Nhập nội dung thông báo cho tất cả học viên..."
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowNotificationModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                                disabled={sendingNotification}
                            >
                                Hủy
                            </button>
                            <button
                                onClick={sendNotificationToStudents}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
                                disabled={sendingNotification}
                            >
                                {sendingNotification ? "Đang gửi..." : "Gửi thông báo"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
