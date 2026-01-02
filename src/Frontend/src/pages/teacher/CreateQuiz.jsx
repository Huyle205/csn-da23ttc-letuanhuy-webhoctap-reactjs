import { useState } from "react";
import { apiClient } from "../../services/apiClient";

const CreateQuiz = ({ lessonId, onSuccess }) => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctIndex, setCorrectIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!question.trim()) {
            setError("Vui lòng nhập câu hỏi");
            return;
        }

        const filledOptions = options.filter(op => op.trim());
        if (filledOptions.length < 2) {
            setError("Cần ít nhất 2 đáp án");
            return;
        }

        if (!options[correctIndex]?.trim()) {
            setError("Đáp án đúng không hợp lệ");
            return;
        }

        setLoading(true);
        try {
            await apiClient("http://localhost:3000/api/teacher/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lesson_id: lessonId,
                    question,
                    options: filledOptions,
                    correct_answer: options[correctIndex]
                })
            });

            onSuccess();
            setQuestion("");
            setOptions(["", "", "", ""]);
            setCorrectIndex(0);
            setIsExpanded(false);
        } catch (err) {
            setError("Có lỗi xảy ra khi tạo câu hỏi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">Thêm câu hỏi mới</h3>
                </div>
                <span className="text-gray-400 text-xl">{isExpanded ? "−" : "+"}</span>
            </button>

            {isExpanded && (
                <form onSubmit={handleSubmit} className="p-4 pt-0 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Câu hỏi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nhập câu hỏi của bạn..."
                            rows="3"
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Các đáp án <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                            {options.map((op, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="correct"
                                        checked={correctIndex === i}
                                        onChange={() => setCorrectIndex(i)}
                                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                                    />
                                    <input
                                        className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={`Đáp án ${i + 1}`}
                                        value={op}
                                        onChange={e => {
                                            const newOps = [...options];
                                            newOps[i] = e.target.value;
                                            setOptions(newOps);
                                        }}
                                    />
                                    {correctIndex === i && (
                                        <span className="text-green-600 font-semibold text-sm whitespace-nowrap">✓ Đúng</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Chọn radio button để đánh dấu đáp án đúng</p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                        >
                            {loading ? "Đang lưu..." : " Lưu câu hỏi"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setQuestion("");
                                setOptions(["", "", "", ""]);
                                setCorrectIndex(0);
                                setError("");
                                setIsExpanded(false);
                            }}
                            className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CreateQuiz;
