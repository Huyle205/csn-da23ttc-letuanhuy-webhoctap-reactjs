import React from 'react'

const QuizResult = ({ score, totalQuestions, restartQuiz, rewatchQuiz
}) => {
    return (
        // <div className='flex flex-col justify-center'>
        //     <div className='border-1 border-gray-300 rounded-lg p-4 w-full max-w-md mx-auto shadow-md'>
        //         <h2 className='font-bold text-[24px] text-center my-4'> Kết quả </h2>
        //         <p className='font-semibold text-[16px] text-center'>Bạn đã trả lời đúng {score}/{totalQuestions} câu</p>
        //         <div className='my-4 flex justify-around'>
        //             <button onClick={rewatchQuiz} className=" text-[16px] bg-gray-500 text-white py-2 px-6  font-semibold cursor-pointer rounded-xl hover:opacity-75"> Xem lại</button>
        //             <button onClick={restartQuiz} className=" text-[16px] bg-gray-500 text-white py-2 px-6 font-semibold cursor-pointer rounded-xl hover:opacity-75"> Làm lại</button>
        //         </div>
        //     </div>


        // </div>
        
        
        
 <div className="flex justify-center items-center mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4"> Kết quả Quiz </h2>

        <p className="text-gray-600 text-lg mb-6">
          Bạn trả lời đúng <span className="text-blue-600 font-bold">{score}</span> / {totalQuestions} câu
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 justify-center">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full transition font-semibold"
            onClick={rewatchQuiz}
          >
             Xem lại
          </button>

          <button 
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition font-semibold"
            onClick={restartQuiz}
          >
             Làm lại
          </button>
        </div>

      </div>
    </div>

    )
}

export default QuizResult