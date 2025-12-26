
import { useState, useEffect } from "react";
import Slide from '../components/Slide.jsx'
import CourseCard from '../components/CourseCard.jsx'
import { apiClient } from "../services/apiClient.js";
import TabsYear from "../components/TabsYears.jsx";
import { useNavigate } from "react-router";

const Home = () => {
	const navigate = useNavigate();
	// xu ly logic da tham gia khoa hoc chua (da dang ky thi vao luon trang learning, chua dang ky thi vao trang chi tiet khoa hoc)
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

	const [courses, setCourses] = useState([]);

	// goi api lay tat ca khoa hoc
	const [coursesBuffer, setCoursesBuffer] = useState({
		"Năm nhất": [],
		"Năm hai": [],
		"Năm ba": [],
		"Năm tư": []
	});


	useEffect(() => {
		fetchCourses();
	}, []);
	const fetchCourses = async () => {
		try {
			const data = await apiClient("http://localhost:3000/api/courses");
			// Chia khóa học theo năm
			const grouped = {
				"Năm nhất": data.filter(c => c.year === 1),
				"Năm hai": data.filter(c => c.year === 2),
				"Năm ba": data.filter(c => c.year === 3),
				"Năm tư": data.filter(c => c.year === 4),
			};

			setCoursesBuffer(grouped);

		} catch (error) {
			console.error("Error fetching courses:", error);
		}
	};


	const [activeTab, setActiveTab] = useState("Năm nhất");
	return (
		<div className="flex flex-col mt-35 w-full justify-center" >
			<div className="w-full h-full  ">
				<Slide />
			</div>
			<div className="w-full h-full flex flex-col bg-white px-10 py-5">
				<h1 className="text-3xl font-bold mb-4 mt-4">Lộ trình các năm học</h1>
				<TabsYear activeTab={activeTab} SetActiveTab={setActiveTab} />
				{/* hien thi khoa hoc */}
				<div className="grid grid-cols-4 gap-4 mt-5">
					{coursesBuffer[activeTab]?.map((course) => (
						<CourseCard
							key={course.course_id}
							id={course.course_id}
							title={course.title}
							description={course.description}
							thumbnail={course.thumbnail}
							teacher={course.teacher}
							handleCourseClick ={handleCourseClick}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
export default Home;