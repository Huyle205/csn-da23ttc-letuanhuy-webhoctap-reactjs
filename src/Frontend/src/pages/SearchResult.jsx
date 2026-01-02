import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { apiClient } from "../services/apiClient";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");   // lấy từ URL
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/courses/search?q=${q}`);
            const data = await res.json();
            setCourses(data);
            setLoading(false);
        };
        fetchData();
    }, [q]);


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



    return (
        <div className="flex flex-col mt-35 w-full justify-center px-10">
            <h2 className="text-2xl font-bold mb-3">Kết quả cho từ khóa "{q}"</h2>

            {loading && <p>Đang tải...</p>}

            {!loading && courses.length === 0 && (
                <p className="text-gray-500 italic">Không tìm thấy khóa học phù hợp</p>
            )}

            <div className="grid grid-cols-4 gap-4">
                {courses.map(course => (
                    <div onClick={() => handleCourseClick(course.course_id)} key={course.course_id} className="border border-gray-300 p-3 rounded shadow hover:scale-[1.02] transition cursor-pointer">
                        <img src={course.thumbnail} className="h-32 w-full object-cover rounded" />
                        <p className="font-semibold mt-2">{course.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
