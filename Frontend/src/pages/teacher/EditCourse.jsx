// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { apiClient } from "../../services/apiClient";

// const EditCourse = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//         academic_year: ""
//     });

//     useEffect(() => {
//         apiClient(`http://localhost:3000/api/teacher/courses`)
//             .then(data => {
//                 const course = data.find(c => c.course_id == id);
//                 if (course) setForm(course);
//             });
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         await apiClient(`http://localhost:3000/api/teacher/courses/${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(form)
//         });

//         navigate("/teacher/courses");
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
//             <h2 className="text-xl font-bold">Sửa khóa học</h2>

//             <input
//                 className="w-full border p-2"
//                 value={form.title}
//                 onChange={e => setForm({ ...form, title: e.target.value })}
//             />

//             <textarea
//                 className="w-full border p-2"
//                 value={form.description}
//                 onChange={e => setForm({ ...form, description: e.target.value })}
//             />

//             <select
//                 className="w-full border p-2"
//                 value={form.academic_year}
//                 onChange={e => setForm({ ...form, academic_year: e.target.value })}
//             >
//                 <option>Năm 1</option>
//                 <option>Năm 2</option>
//                 <option>Năm 3</option>
//                 <option>Năm 4</option>
//             </select>

//             <button className="bg-green-600 text-white px-4 py-2 rounded">
//                 Lưu
//             </button>
//         </form>
//     );
// };

// export default EditCourse;


import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        year: ""
    });

    useEffect(() => {
        apiClient(`http://localhost:3000/api/teacher/courses`)
            .then(data => {
                const course = data.find(c => c.course_id == id);
                if (course) setForm(course);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await apiClient(`http://localhost:3000/api/teacher/courses/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        navigate("/teacher/courses");
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link 
                    to="/teacher/courses" 
                    className="text-blue-600 hover:text-blue-800 text-sm inline-block mb-2"
                >
                    ← Quay lại danh sách khóa học
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Sửa khóa học</span>
                </h2>
                <p className="text-gray-600 text-sm mt-1">Cập nhật thông tin khóa học của bạn</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                {/* Tên khóa học */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tên khóa học <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        placeholder="Nhập tên khóa học"
                        required
                    />
                </div>

                {/* Mô tả */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mô tả khóa học
                    </label>
                    <textarea
                        rows={5}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        placeholder="Nhập mô tả khóa học"
                    />
                </div>

                {/* Năm học */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Năm học <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={form.year}
                        onChange={e => setForm({ ...form, year: e.target.value })}
                        required
                    >
                        <option value="">-- Chọn năm học --</option>
                        <option value="1">Năm nhất</option>
                        <option value="2">Năm hai</option>
                        <option value="3">Năm ba</option>
                        <option value="4">Năm tư</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-4 border-t">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Lưu thay đổi</span>
                    </button>
                    <Link
                        to="/teacher/courses"
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Hủy
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default EditCourse;
