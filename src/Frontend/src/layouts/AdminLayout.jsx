import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faChartLine, faUsers, faBook, faHome, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            alert("Đăng xuất thành công!");
            navigate("/signin");
        } else {
            alert("Đăng xuất thất bại!");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#360185] text-white flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    
                    <div>
                        <div className="font-bold text-lg">Quản trị hệ thống</div>
                        <div className="text-xs text-gray-300">TVU Learn</div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-3 rounded ${
                                isActive ? "bg-[#F4B342] text-black font-semibold" : "hover:bg-[#4b1fa6]"
                            }`
                        }
                    >
                        <FontAwesomeIcon icon={faChartLine} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-3 rounded ${
                                isActive ? "bg-[#F4B342] text-black font-semibold" : "hover:bg-[#4b1fa6]"
                            }`
                        }
                    >
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Người dùng</span>
                    </NavLink>

                    <NavLink
                        to="/admin/courses"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-3 rounded ${
                                isActive ? "bg-[#F4B342] text-black font-semibold" : "hover:bg-[#4b1fa6]"
                            }`
                        }
                    >
                        <FontAwesomeIcon icon={faBook} />
                        <span>Khóa học</span>
                    </NavLink>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/20">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 py-2 rounded font-semibold transition flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
