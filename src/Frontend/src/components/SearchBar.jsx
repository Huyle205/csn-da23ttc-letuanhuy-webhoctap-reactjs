import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { apiClient } from "../services/apiClient.js";
const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [suggestedResults, setSuggestedResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const boxRef = useRef(null);
    // khi nguoi dung nhap vao o tim kiem
    const handleInputChange = async (value) => {
        setQuery(value);
        if (value.trim() === "") {
            setShowResults(false);
            return;
        }
        // goi API tim kiem khoa hoc
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/courses/search?q=${value}`);
        const data = await res.json();
        setSuggestedResults(data);
        setShowResults(true);
        setLoading(false);
    }

    // click vao khoa hoc de den trang chi tiet khoa hoc hoac trang learning
    const handleCourseClick = async (course_id) => {
        try {
            const token = localStorage.getItem("accessToken");
            // goi api kiem tra da dang ky khoa hoc chua
            const data = await apiClient(`http://localhost:3000/api/enrollments/check-enrollment/${course_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.enrolled) {
                // da dang ky thi vao trang learning
                navigate(`/course/${course_id}/learning`);
            } else {
                // chua dang ky thi vao trang chi tiet khoa hoc
                navigate(`/course/${course_id}`);
            }
            setShowResults(false);
        } catch (error) {
            console.error("Error checking enrollment:", error);
        }
    };

    // click ra ngoài để ẩn gợi ý
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setShowResults(false);

            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // khi nhan enter de tim kiem (toi trang ket qua tim kiem)
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            navigate(`/search?q=${query}`);
            setShowResults(false);
        }
    };
    // khi click icon search de tim kiem
    const handleSearchClick = () => {
        if (query.trim() !== "") {
            navigate(`/search?q=${query}`);
            setShowResults(false);
        }
    };


    return (
        <div className="relative" ref={boxRef}>
            <input
                type="text"
                className="h-10 w-125 rounded p-4 outline-zinc-500  outline-1 focus:outline-2 transition-colors focus:outline-black bg-white duration-300"
                placeholder="Tìm kiếm khóa học"
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => query && setShowResults(true)}
                onKeyDown={handleKeyDown}
            />
            <div className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 cursor-pointer p-2">
                <i
                    onClick={handleSearchClick}
                    className="fa-solid fa-search "></i>
            </div>
            {showResults && (loading || query.trim() !== "") && (
                <div className="absolute bg-white shadow w-125 rounded mt-1 p-2 z-50 max-h-100 overflow-y-auto">

                    {/* LOADING */}
                    {loading && (
                        <p className="text-gray-400 p-2 italic animate-pulse">Đang tìm kiếm...</p>
                    )}

                    {/* KHÔNG TÌM THẤY */}
                    {!loading && suggestedResults.length === 0 && query.trim() !== "" && (
                        <p className="text-red-500 text-sm p-2">Không tìm thấy khóa học</p>
                    )}

                    {/* DANH SÁCH KHÓA HỌC */}
                    {suggestedResults.map(course => (
                        <div
                            key={course.course_id}
                            className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center rounded transition search-results ${showResults ? "show" : suggestedResults.length ? "hide" : ""}`}
                            onClick={() => handleCourseClick(course.course_id)}
                        >
                            <img src={course.thumbnail} className="w-10 h-10 rounded mr-2 object-cover" />
                            <span>{course.title}</span>
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
};

export default SearchBar;