import { useState, useEffect } from "react";
import { apiClient } from "../services/apiClient";

const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient("http://localhost:3000/api/notifications");
                setNotifications(res);
                setUnread(res.filter(n => n.status === "unread").length);
            } catch (err) {
                console.log("Notification error: ", err);
            }
        };
        fetchData();
    }, []);

    // đánh dấu đã đọc
    const handleRead = async (id) => {
        try {
            await apiClient(`http://localhost:3000/api/notifications/${id}/read`, {
                method: "PATCH"
            });

            // cập nhật lại UI
            setNotifications(prev =>
                prev.map(noti =>
                    noti.notification_id === id
                        ? { ...noti, status: "read" }
                        : noti
                )
            );
        } catch (error) {
            console.error("Lỗi đánh dấu đã đọc:", error);
        }
    };
    // khi clich ra ngoài, đóng dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".relative")) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    return (
        <div className="relative">
            {/* Icon chuông */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 hover:bg-gray-100 hover:cursor-pointer rounded-full"
            >
                <i className="fa-solid fa-bell text-xl text-[#F4B342]"></i>

                {/* Badge số thông báo */}
                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {unread}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-3 z-50"

                >

                    <h3 className="font-semibold mb-2">Thông báo</h3>

                    {notifications.length === 0 ? (
                        <p className="text-gray-500 text-sm">Không có thông báo.</p>
                    ) : (
                        notifications.map((noti, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 mb-2 ${noti.status === 'unread' ? "bg-blue-50" : "opacity-70"}`}
                            >
                                {/* Icon theo loại thông báo */}
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full 
                                        ${noti.type === "success" ? "bg-green-100 text-green-600" : ""} 
                                        ${noti.type === "warning" ? "bg-yellow-100 text-yellow-600" : ""} 
                                        ${noti.type === "error" ? "bg-red-100 text-red-600" : ""} 
                                        ${noti.type === "info" ? "bg-blue-100 text-blue-600" : ""}`}                          >
                                    <i
                                        className={`fa-solid 
                                        ${noti.type === "success" ? "fa-check" : ""} 
                                        ${noti.type === "warning" ? "fa-exclamation" : ""} 
                                        ${noti.type === "error" ? "fa-xmark" : ""} 
                                        ${noti.type === "info" ? "fa-info" : ""}`}
                                    ></i>
                                </div>

                                {/* Nội dung */}
                                <div className={`flex flex-col flex-1 p-1 cursor-pointer ${noti.status === "unread" ? "font-semibold" : "font-normal text-gray-600"}`}                                    onClick={() => handleRead(noti.id)}
                                >
                                    <p className="font-medium text-sm leading-tight text-gray-800">
                                        {noti.message}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(noti.created_at).toLocaleString("vi-VN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>

                                {/* Chấm status */}
                                {noti.status === "unread" && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                                )}
                            </div>

                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
