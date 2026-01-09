import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth.js";
import { toast } from "sonner";
import NotificationBell from './NotificationBell.jsx';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.name || 'User';
  const userRole = user.role || 'student';
  
  // Lấy chữ cái đầu của tên để làm avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Đổi role sang tiếng Việt
  const getRoleLabel = (role) => {
    const roles = {
      student: 'Học viên',
      teacher: 'Giảng viên',
      admin: 'Quản trị viên'
    };
    return roles[role] || role;
  };

  // Màu sắc theo role
  const getRoleColor = (role) => {
    const colors = {
      student: 'bg-blue-500',
      teacher: 'bg-purple-500',
      admin: 'bg-red-500'
    };
    return colors[role] || 'bg-gray-500';
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Khi nhan dang xuat
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast.success("Đăng xuất thành công!");
      navigate("/signin");
    } else {
      toast.error("Đăng xuất thất bại!");
    }
  };



  return (
    <div className="flex items-center space-x-4 w-50 justify-end relative z-50" ref={menuRef}>
      {/* Icon chuông thông báo */}
      <NotificationBell />

      {/* Avatar với chữ cái đầu */}
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${getRoleColor(userRole)} cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-bold text-sm">
          {getInitials(userName)}
        </span>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-14 right-0 bg-white shadow-2xl rounded-2xl w-72 border border-gray-100 animate-fadeIn z-50 overflow-hidden">
          {/* Header với thông tin user */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full ${getRoleColor(userRole)} shadow-md`}>
                <span className="text-white font-bold text-base">
                  {getInitials(userName)}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-base truncate">{userName}</p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <i className="fa-solid fa-circle text-[6px]"></i>
                  {getRoleLabel(userRole)}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors group"
              onClick={() => setOpen(false)}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                <i className="fa-solid fa-user text-sm"></i>
              </div>
              <span className="text-gray-700 font-medium text-sm" >Thông tin cá nhân</span>
            </Link>

            {/* Uncomment nếu có chức năng đổi mật khẩu */}
            {/* <Link
              to="/change-password"
              className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors group"
              onClick={() => setOpen(false)}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors">
                <i className="fa-solid fa-key text-sm"></i>
              </div>
              <span className="text-gray-700 font-medium text-sm">Đổi mật khẩu</span>
            </Link> */}
          </div>

          {/* Logout Button */}
          <button
            className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 cursor-pointer transition-colors w-full group"
            onClick={handleLogout}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors">
              <i className="fa-solid fa-right-from-bracket text-sm"></i>
            </div>
            <span className="text-red-600 font-semibold text-sm">Đăng xuất</span>
          </button>
        </div>
      )}

      {/* Animation Styles */}
      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-10px) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        `}
      </style>
    </div>
  );
}
