import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { apiClient } from "../../services/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faLightbulb } from "@fortawesome/free-solid-svg-icons";

// Hàm chuyển đổi YouTube URL thành embed URL
const convertToEmbedUrl = (url) => {
    if (!url || !url.trim()) return "";

    try {
        // Nếu đã là embed URL thì giữ nguyên
        if (url.includes("youtube.com/embed/")) {
            return url;
        }

        let videoId = null;

        // Xử lý URL dạng: https://www.youtube.com/watch?v=VIDEO_ID
        if (url.includes("youtube.com/watch")) {
            const urlObj = new URL(url);
            videoId = urlObj.searchParams.get("v");
        }
        // Xử lý URL dạng: https://youtu.be/VIDEO_ID
        else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1]?.split("?")[0];
        }
        // Xử lý URL dạng: https://m.youtube.com/watch?v=VIDEO_ID
        else if (url.includes("m.youtube.com/watch")) {
            const urlObj = new URL(url);
            videoId = urlObj.searchParams.get("v");
        }

        // Nếu tìm được video ID thì trả về embed URL
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // Nếu không phải YouTube URL thì giữ nguyên
        return url;
    } catch (error) {
        // Nếu URL không hợp lệ thì giữ nguyên
        return url;
    }
};

const CreateLesson = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [orderIndex, setOrderIndex] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Vui lòng nhập tiêu đề bài học");
            return;
        }

        // Chuyển đổi YouTube URL thành embed URL trước khi gửi lên server
        const embedUrl = convertToEmbedUrl(videoUrl);

        setLoading(true);
        try {
            await apiClient("http://localhost:3000/api/teacher/lessons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    course_id: courseId,
                    title,
                    content,
                    video_url: embedUrl,
                    order_index: orderIndex ? parseInt(orderIndex) : undefined
                })
            });

            navigate(`/teacher/courses/${courseId}/lessons`);
        } catch (err) {
            setError("Có lỗi xảy ra khi tạo bài học. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link 
                    to={`/teacher/courses/${courseId}/lessons`} 
                    className="text-blue-600 hover:text-blue-800 text-sm inline-block mb-2"
                >
                    ← Quay lại danh sách bài học
                </Link>
                <h2 className="text-2xl font-bold text-gray-800">Tạo bài học mới</h2>
                <p className="text-gray-600 text-sm mt-1">Thêm nội dung học tập cho khóa học</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tiêu đề bài học <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập tiêu đề bài học"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Thứ tự bài học
                    </label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập thứ tự bài học"
                        value={orderIndex}
                        onChange={e => setOrderIndex(e.target.value)}
                        min="1"
                    />
                    <p className="text-sm text-gray-500 mt-1">Để trống nếu muốn tự động sắp xếp</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nội dung bài học
                    </label>
                    <textarea
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập nội dung bài học"
                        rows="6"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Link video YouTube
                    </label>
                    <input
                        type="url"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nhập link video YouTube"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faSave} />
                        <span>{loading ? "Đang tạo..." : "Tạo bài học"}</span>
                    </button>
                    <Link
                        to={`/teacher/courses/${courseId}/lessons`}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Hủy
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateLesson;
