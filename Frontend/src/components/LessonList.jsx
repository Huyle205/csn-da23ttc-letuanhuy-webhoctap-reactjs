import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const LessonList = ({ lessons, currentLesson, onSelectLesson, completedLessons, order_index }) => {
    return (
        <div className="w-full h-auto bg-white py-1 px-1 flex flex-col justify-center border-2-gray-100">
            <h3 className="text-[20px] font-bold text-center border-b-2 p-4">Nội dung bài học</h3>
            <ul className="overflow-y-auto h-[550px]">
                {lessons.map((lesson) => (
                    <li
                        key={lesson.lesson_id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`p-3 cursor-pointer flex justify-between items-center text-[18px]  hover:bg-gray-200 transition ease-in-out 200ms
                        ${currentLesson?.lesson_id === lesson.lesson_id ? "bg-[#360185] text-[#F4B342] font-bold hover:cursor-default " : ""}`}
                    >
                       Bài {lesson.order_index}. {lesson.title}
                        {completedLessons.includes(lesson.lesson_id) && (
                            <span className="text-green-500 text-lg ">
                                <FontAwesomeIcon icon={faCheck}  />
                            </span>
                        )}
                    </li>

                ))}
            </ul>
        </div>


    )



};
export default LessonList;