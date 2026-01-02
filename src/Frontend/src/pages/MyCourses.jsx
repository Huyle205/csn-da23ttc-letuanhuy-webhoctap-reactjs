import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MyCourseCard from "../components/MyCourseCard";
import { apiClient } from "../services/apiClient";
import { useNavigate } from "react-router";
const MyCourses = () => {

    // api lay danh sach khoa hoc cua nguoi dung
    const [myCourses, setMyCourses] = useState([]);
    const [progressList, setProgressList] = useState({});
    const navigate = useNavigate();
    const fetchMyCourses = async () => {
        const token = localStorage.getItem("accessToken");

        const data = await apiClient("http://localhost:3000/api/enrollments/my-courses", {
            headers: {
                Authorization: `Bearer ${token}`,
                include: "credentials",
            }
        });
        setMyCourses(data);
        // goi api lay tien do hoc tap cho tung khoa hoc
        // lấy progress cho từng course
            data.forEach(async (course) => {
                const prog = await apiClient(`http://localhost:3000/api/progress/course/progress/${course.course_id}`);
                setProgressList(prev => ({
                    ...prev,
                    [course.course_id]: prog
                }));
            });

    };
    // xu ly khi click vao khoa hoc
    const handleCourseClick = async (course_id) => {
        try {
            // kiem tra nguoi dung da dang nhap chua		
            const token = localStorage.getItem("accessToken");
            if (!token) {
                // chua dang nhap thi vao trang chi tiet khoa hoc
                window.location.href = `/course/${course_id}`;
                return;
            }
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
        } catch (error) {
            console.error("Error checking enrollment:", error);
        }
    };

    useEffect(() => {
        fetchMyCourses();
    }, []);
    const [activeFilter, setActiveFilter] = useState("all");
    return (
        <div className=" flex flex-col  mt-40 w-full justify-center px-10">
            <h1 className="text-3xl font-bold mb-4">Khoá học của tôi</h1>
            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            {/* Thien thi danh sach khoa học*/}
            <div className="grid grid-cols-4 gap-5 px-10 mb-20 mt-10 ">
                {myCourses.map((course, index) => {
                    if (activeFilter === "all" ||
                        (activeFilter === "learning" && progressList[course.course_id]?.percent < 100) ||
                        (activeFilter === "completed" && progressList[course.course_id]?.percent === 100)) {
                        return <MyCourseCard 
                            key={index} 
                            id = {course.course_id}
                            course={course} 
                            percent={progressList[course.course_id]?.percent || 0}
                            handleClick={handleCourseClick} />;
                    }
                })}
            </div>




        </div>




    );
}

export default MyCourses;