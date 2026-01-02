import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserGraduate, faChalkboardTeacher, faCrown, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, student, teacher

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
            alert("Có lỗi xảy ra khi xóa tài khoản");
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
            <div className="mb-4 flex gap-2">
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
        </div>
    );
};

export default AdminUsers;
