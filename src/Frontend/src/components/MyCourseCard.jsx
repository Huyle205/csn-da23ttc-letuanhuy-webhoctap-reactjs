
// const MyCourseCard = ({ course,id, handleClick, percent }) => {
//     return (
//         <div onClick={() => handleClick(id)} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer min-w-65">
//             <div className="p-4">
//                 <h2 className="text-[20px] font-semibold mb-2 line-clamp-1 h-15">{course.title}</h2>
//                 <p className="text-gray-600 line-clamp-1">{course.description}</p>
//                 <p className="text-gray-600 ">{ percent !== 100 ? <span className='text-yellow-500 font-semibold'>Đang học</span> : <span className='text-green-500 font-semibold'>Đã hoàn thành</span> }</p>
//             </div>
//             <div className="w-full bg-gray-200 h-2 rounded">
//                 <div className="bg-green-500 h-2 rounded" style={{ width: `${percent}%` }}></div>
//             </div>
//         </div>
//     )

// }


// export default MyCourseCard;

const MyCourseCard = ({ course, id, handleClick, percent }) => {
    return (
        <div
            onClick={() => handleClick(id)}
            className="group cursor-pointer rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white w-full min-w-72 hover:-translate-y-1">
            <div className="p-5">
                <h2 className="text-[22px] font-semibold mb-2 line-clamp-1 text-gray-800">{course.title}</h2>
                <p className="font-semibold text-[15px] mb-4">
                    {percent !== 100 ? (
                        <span className="text-yellow-500 bg-yellow-100 px-2 py-1 rounded-lg">
                            Đang học
                        </span>
                    ) : (
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                            Đã hoàn thành
                        </span>
                    )}
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-md relative">
                    <div
                        className="h-full bg-green-500 rounded-md transition-all duration-500"
                        style={{ width: `${percent}%` }}
                    ></div>
                    <span className="absolute -top-6 right-0 text-[15px] font-bold text-green-600">
                        {percent}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MyCourseCard;
