import { useState, useEffect, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { logout } from "../utils/auth.js";
import NotificationBell from './NotificationBell.jsx';



export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

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
      alert("Đăng xuất thành công!");
      navigate("/signin"); // chuyển về login
    } else {
      alert("Đăng xuất thất bại!");
    }
  };



  return (
    <div className="flex items-center space-x-4 w-50 justify-end relative z-50" ref={menuRef}>

      {/* Icon chuông */}
      <NotificationBell />

      {/* Icon user */}
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <i className="fa-solid fa-user text-gray-700 text-lg"></i>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-14 right-0 bg-white shadow-lg rounded-xl w-48 py-2 border border-gray-200 animate-fadeIn z-50">

          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Thông tin cá nhân
          </Link>

          {/* <Link
            to="/change-password"
            className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Đổi mật khẩu
          </Link> */}

          <hr />

          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      )}

      {/* Hiệu ứng CSS nhỏ */}
      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
}
