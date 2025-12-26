import { Link } from "react-router";

const CourseHeader = (course, total, done, percent) => {
    return (
        <div className="w-full h-10  bg-[#360185] text-white flex items-center justify-between p-8">
            <div className="flex items-center space-x-4 ">
                <Link to="/" className="font-semibold flex flex-col items-center py-2 text-center text-[16px] text-[#F4B342]"> <i className="fa-solid fa-chevron-left text-[24px]"></i></Link>
                <h2 className="text-[22px] font-semibold text-[#F4B342] ">{course.courseTitle}</h2>
            </div>
        </div>
    );
}

export default CourseHeader;