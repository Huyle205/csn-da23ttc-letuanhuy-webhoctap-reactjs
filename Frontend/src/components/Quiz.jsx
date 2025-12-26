import { useEffect } from 'react';
import { useState } from 'react';
import QuizResult from './QuizResult';
import { apiClient } from '../services/apiClient';

const Quiz = ({ lesson_id, course_id }) => {
    const [loading, setLoading] = useState(true);
    // luu du lieu quiz
    const [quizData, setQuizData] = useState([]);
    // luu cau tra loi nguoi dung chon
    const [userAnswers, setUserAnswers] = useState([]);
    // kiem tra da het cau hoi chua
    const [isEnded, setIsEnded] = useState(false);
    // tim diem so
    const [score, setScore] = useState(0);
    // luu cau hoi hien tai
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // luu dap an nguoi dung chon
    const [selectedOption, setSelectedOption] = useState(null);
    //API lay quiz theo lesson id




    useEffect(() => {
        if (!lesson_id) return;

        const fetchQuiz = async () => {
            try {
                const data = await apiClient(`http://localhost:3000/api/quiz/lesson/${lesson_id}`);
                setQuizData(data);
                setUserAnswers(Array(data.length).fill(null));
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        fetchQuiz();
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setScore(0);
        setIsEnded(false);

    }, [lesson_id]); // mỗi lần đổi lesson, load quiz mới
    useEffect(() => {
        if (!quizData || quizData.length === 0) return;  // tránh crash
        if (currentQuestionIndex >= quizData.length) return;

        const answerIndex = userAnswers[currentQuestionIndex];

        // Nếu chưa từng chọn → reset
        if (answerIndex === undefined || answerIndex === null) {
            setSelectedOption("");
            return;
        }

        // Lấy lại đáp án cũ khi chuyển câu
        const pastOption = quizData[currentQuestionIndex].options[answerIndex];
        setSelectedOption(pastOption);
    }, [currentQuestionIndex, userAnswers, quizData])

    // gửi kết quả quiz khi quiz kết thúc
    useEffect(() => {
        if (!isEnded) return; // chỉ chạy khi vừa kết thúc quiz

        const submitQuiz = async () => {
            try {
                await apiClient("http://localhost:3000/api/quiz/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lesson_id,
                        course_id,
                        score,
                        total_questions: quizData.length
                    })
                });

                console.log("Đã lưu kết quả quiz");
            } catch (err) {
                console.error("Lỗi submit quiz:", err);
            }
        };

        submitQuiz();
    }, [isEnded]); // chạy 1 lần duy nhất khi isEnded -> true

    // Nếu chưa có lesson_id → vẫn render nhưng hiển thị loading
    if (!lesson_id) {
        return <p className="text-gray-500">Chưa có bài học.</p>;
    }

    if (loading) {
        return <p className="text-gray-500">Đang tải quiz...</p>;
    }
    const question = quizData[currentQuestionIndex];
    if (!question) {
        return <p className="text-gray-500">Bài học này chưa có quiz.</p>;
    }

    //ham xu ly khi chon dap an
    const handleAnswerSelect = (selectedOption, index) => {
        setSelectedOption(selectedOption);
        // cap nhat cau tra loi nguoi dung
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestionIndex] = index;
        setUserAnswers(newUserAnswers);

        // tính điểm
        if (selectedOption === quizData[currentQuestionIndex].correct_answer) {
            setScore((prev) => prev + 1);
        }
    }

    // ham xu ly khi nhan nut next
    const goNext = () => {
        // neu la cau hoi cuoi cung thi ket thuc quiz
        if (currentQuestionIndex === quizData.length - 1) {
            setIsEnded(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);

        }
    }
    // ham xu ly khi nhan nut back
    const goBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    }


    // ham xu ly khi nhan vao nut lam lai
    const restartQuiz = () => {
        setIsEnded(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers(Array.from({ length: quizData.length }));
        setSelectedOption(null);
    }
    // ham xu ly khi nhan vao nut xem lai
    const rewatchQuiz = () => {
        setCurrentQuestionIndex(0);
        setIsEnded(false);
    };


    // neu het cau hoi thi hien thi ket qua
    if (isEnded) {
        return <QuizResult
            score={score}
            totalQuestions={quizData.length}
            restartQuiz={restartQuiz}
            rewatchQuiz={rewatchQuiz}
        />;
    }

    // style cau tra loi dung
    return (
        <div className='mt-5 mb-10 '>
            <h2 className="font-bold text-[24px] my-2">Câu {currentQuestionIndex + 1}</h2>
            <p className="font-semibold text-[20px] my-2">{quizData[currentQuestionIndex].question}</p>
            <div className='flex flex-col gap-4  justify-start'>{
                quizData[currentQuestionIndex].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(option, index)}
                        className={`bg-gray-50 text-left p-4 rounded-lg hover:bg-gray-100 border-1 cursor-pointer ${selectedOption === option && selectedOption === quizData[currentQuestionIndex].correct_answer ? 'border-3 border-green-500' : ''}  ${selectedOption === option && selectedOption !== quizData[currentQuestionIndex].correct_answer ? 'border-3 border-red-500' : ''}`}
                        disabled={!!selectedOption && selectedOption !== option}
                    >
                        {option}
                    </button>
                ))
            }

                {selectedOption ? (
                    selectedOption === quizData[currentQuestionIndex].correct_answer ? (
                        <p className='mt-4 text-green-600 font-semibold text-[18px]'>Câu trả lời chính xác! </p>
                    ) : (
                        <p className='mt-4 text-red-600 font-semibold text-[18px]'>Câu trả lời chưa chính xác! </p>
                    )) : ("")}
            </div>
            <div className="flex justify-between ">
                <button onClick={goBack} disabled={currentQuestionIndex === 0} className={`mt-6  bg-blue-500 text-white py-2 px-6 rounded-4xl hover:bg-blue-600 font-semibold cursor-pointer ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed hover:none' : ''} `}>
                    Quay lại
                </button>
                <button onClick={goNext} disabled={!selectedOption} className={`mt-6 ml-6 bg-green-500 text-white py-2 px-6 rounded-4xl hover:bg-green-600 font-semibold cursor-pointer ${!selectedOption ? 'opacity-50 cursor-not-allowed hover:none' : ''} `}>
                    {currentQuestionIndex === quizData.length - 1 ? "Hoàn thành" : "Tiếp theo"}
                </button>

            </div>




        </div>
    )
}

export default Quiz
