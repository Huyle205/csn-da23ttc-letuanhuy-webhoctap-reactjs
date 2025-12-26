

import { Link } from "react-router-dom";

const CourseCard = ({ id, title, description, teacher, thumbnail, handleCourseClick }) => {
    return (
        <div
            className="w-full bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 "
            onClick={() => handleCourseClick(id)}
        >
            <img src={thumbnail} alt={title} className="h-44 w-full object-cover" />
            <div className="p-4 space-y-2">
                <h3 className="text-[20px] font-semibold text-gray-800 line-clamp-1">{title} </h3>
                <p className="text-[15px] text-gray-600 line-clamp-1">{description}</p>
                {teacher && (
                    <p className="text-sm text-gray-500 italic line-clamp-1"> Giảng viên: {teacher} </p>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
