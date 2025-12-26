import { Link } from "react-router";
import { useState } from "react";


const SideBar = () =>{
    const [activeMenu, setActiveMenu] = useState("home");
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };
    return (
        <div className="fixed left-0 top-[80px] px-20 w-full bg-[#FEEE91] z-1">
            {/* Sidebar content goes here */}
            <div className="flex ">
                <div onClick={() => handleMenuClick("home")} className={` hover:bg-[#F4B342] cursor-pointer rounded   active-link px-2 min-w-[180px] transition ease-in-out duration-300 ${activeMenu === "home" ? "active-menu" : ""}  `}>
                    <Link to="/" className={` text-black font-semibold flex  items-center py-1 text-center text-[20px] ${activeMenu === "home" ? "font-bold" : ""} `}> <i className="fa-solid fa-house text-[24px] mr-2"></i> Trang chủ</Link>
                </div>
                <div onClick={() => handleMenuClick("my-courses")} className={` hover:bg-[#F4B342] cursor-pointer rounded  active-link px-2 min-w-[180px]  transition ease-in-out duration-300 ${activeMenu === "my-courses" ? "active-menu" : ""}`}>
                    <Link to="/My-Courses" className={`  text-black font-semibold flex items-center py-1 text-center text-[20px] ${activeMenu === "my-courses" ? "font-bold" : ""}`}> <i className="fa-solid fa-book text-[24px] mr-2"></i> Khóa học của tôi</Link>
                </div>
            </div>
        </div>

    );  
}

export default SideBar;