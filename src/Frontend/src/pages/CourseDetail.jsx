import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import LessonList from "../components/LessonList";
import { apiClient } from "../services/apiClient";

const CourseDetail = () => {
    const navigate = useNavigate();
    // xu ly logic khi nguoi dung tham gia khoa hoc
    const handleEnroll = async () => {
        try {
            // kiem tra nguoi dung da dang nhap chua
            const token = localStorage.getItem("accessToken");
            console.log("Access Token:", token);
            if (!token) {
                alert("Bạn cần đăng nhập trước!");
                return;
            }
            // goi api dang ky khoa hoc
            const data  = await apiClient("http://localhost:3000/api/enrollments/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ course_id: id })
            })

            
            if (data) {
                alert("Đăng ký khóa học thành công!");
                navigate(`/course/${id}/learning`);
            } else {
                alert(data.message || "Đăng ký khóa học thất bại!");
            }
        } catch (error) {
            console.error("Error enrolling in course:", error);
        }


        
    }





    // goi api lay chi tiet khoa hoc theo id
    const { id } = useParams();
    const [Course, setCourse] = useState(null);

    const fetchCourseById = async () => {
        try {
            const data = await apiClient(`http://localhost:3000/api/courses/${id}`);
            setCourse(data);
        } catch (error) {
            console.error("Error fetching course by id:", error);
        }


    }
    // goi api lay danh sach bai hoc theo khoa hoc id
    const [lessons, setLessons] = useState([]);
    const fetchLessonsByCourseId = async () => {
        try {
            const data = await apiClient(`http://localhost:3000/api/courses/${id}/lessons`);
            setLessons(data)
            console.log("Lessons by course id:", data);
        } catch (error) {
            console.error("Error fetching lessons by course id:", error);
        }
    }

    useEffect(() => {
        fetchCourseById();
        fetchLessonsByCourseId();
    }, [id]);

    return (
        <div className="flex mt-30 w-full px-10 py-5 relative ">
            <div className="w-[70%] ">
                <h1 className="font-bold text-[36px]">{Course?.title}</h1>
                <p className="text-[20px] text-gray-500 mt-5">
                    {Course?.description}
                </p>
                <h2 className="font-bold text-[24px] mt-5 mb-3">Nội dung khóa học</h2>
                <div>
                    <ul className="list-none list-inside space-y-2">
                        {lessons.map(lesson => (
                            <li
                                key={lesson.lesson_id}
                                className="font-semibold text-[20px] py-4 px-10 bg-[rgba(0,0,0,0.05)] rounded-lg "
                            >
                                {/* {lesson.order_index}.*/} {lesson.title}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            <div className="w-[30%] flex flex-col items-center rounded-lg p-5 sticky top-0 right-0 ">
                <div className="flex flex-col items-start space-y-2 ">
                    <p className="text-[20px] font-semibold  "> Tổng số bài học : {lessons.length} </p>
                    <p className="text-[20px] font-semibold  "> năm : {Course?.year} </p>
                </div>
                <button  onClick={handleEnroll} className="px-4 py-2 bg-[#DE1A58] cursor-pointer text-white rounded-lg text-[20px] font-semibold hover:opacity-80 mt-5"> Tham gia học</button>
            </div>
        </div>

    )


}


export default CourseDetail;