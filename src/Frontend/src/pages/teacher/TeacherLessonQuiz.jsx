import { useEffect, useState } from "react";
import { apiClient } from "../../services/apiClient";
import CreateQuiz from "./CreateQuiz";
const TeacherLessonQuiz = ({ lessonId }) => {
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingQuiz, setEditingQuiz] = useState(null);

    const fetchQuiz = async () => {
        try {
            const data = await apiClient(
                `http://localhost:3000/api/teacher/lessons/${lessonId}/quizzes`
            );
            setQuiz(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Lỗi khi tải quiz:", error);
            setQuiz([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (lessonId) fetchQuiz();
    }, [lessonId]);

    const handleDelete = async (quiz_id) => {
        if (!window.confirm("Xóa câu hỏi này?")) return;

        try {
            await apiClient(
                `http://localhost:3000/api/teacher/quiz/${quiz_id}`,
                { method: "DELETE" }
            );
            fetchQuiz(); // load lại
        } catch (error) {
            alert("Lỗi khi xóa quiz");
        }
    };

    const handleEdit = (q) => {
        setEditingQuiz(q);
    };

    const handleUpdate = async (quiz_id, updatedData) => {
        try {
            await apiClient(
                `http://localhost:3000/api/teacher/quiz/${quiz_id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(updatedData)
                }
            );
            setEditingQuiz(null);
            fetchQuiz();
        } catch (error) {
            alert("Lỗi khi cập nhật quiz");
        }
    };

    const handleCancelEdit = () => {
        setEditingQuiz(null);
    };

    if (loading) return <p>Đang tải quiz...</p>;

    return (
        <div>
            <CreateQuiz lessonId={lessonId} onSuccess={fetchQuiz} />

            {quiz.length === 0 && (
                <p className="text-gray-500">Chưa có quiz</p>
            )}

            {quiz.map((q, index) => (
                <div
                    key={q.question_id}
                    className="border rounded p-4 mb-4 bg-white shadow-sm"
                >
                    {editingQuiz?.question_id === q.question_id ? (
                        <EditQuizForm 
                            quiz={q} 
                            onSave={handleUpdate} 
                            onCancel={handleCancelEdit}
                        />
                    ) : (
                        <>
                            <p className="font-semibold mb-2">
                                Câu {index + 1}: {q.question}
                            </p>

                            <ul className="list-disc ml-6 my-2">
                                {q.options.map((op, i) => (
                                    <li
                                        key={i}
                                        className={
                                            op === q.correct_answer
                                                ? "text-green-600 font-semibold"
                                                : ""
                                        }
                                    >
                                        {op}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => handleEdit(q)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                >
                                     Chỉnh sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(q.question_id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                >
                                     Xóa
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );

};

// Component form chỉnh sửa quiz
const EditQuizForm = ({ quiz, onSave, onCancel }) => {
    const [question, setQuestion] = useState(quiz.question);
    const [options, setOptions] = useState([...quiz.options]);
    const [correctAnswer, setCorrectAnswer] = useState(quiz.correct_answer);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(quiz.question_id, {
            question,
            options: options.filter(op => op.trim()),
            correct_answer: correctAnswer
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <label className="block text-sm font-semibold mb-1">Câu hỏi</label>
                <textarea
                    className="border border-gray-300 p-2 w-full rounded"
                    rows="2"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-1">Các đáp án</label>
                {options.map((op, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                        <input
                            type="radio"
                            name="correct"
                            checked={correctAnswer === op}
                            onChange={() => setCorrectAnswer(op)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 p-2 flex-1 rounded"
                            value={op}
                            onChange={e => {
                                const newOptions = [...options];
                                newOptions[i] = e.target.value;
                                setOptions(newOptions);
                                if (correctAnswer === options[i]) {
                                    setCorrectAnswer(e.target.value);
                                }
                            }}
                            required
                        />
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                     Lưu
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                     Hủy
                </button>
            </div>
        </form>
    );
};

export default TeacherLessonQuiz;
