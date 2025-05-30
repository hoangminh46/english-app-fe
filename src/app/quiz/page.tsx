"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
};

type QuizData = {
  questions: Question[];
};

type QuizProgress = {
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  showResults: boolean;
  selectedAnswer: number | null;
  showExplanation: boolean;
}

export default function QuizPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Lưu tiến độ làm bài mỗi khi có sự thay đổi
  useEffect(() => {
    if (!quizData) return;
    
    const progress: QuizProgress = {
      currentQuestionIndex,
      userAnswers,
      showResults,
      selectedAnswer,
      showExplanation
    };
    
    localStorage.setItem("quizProgress", JSON.stringify(progress));
  }, [currentQuestionIndex, userAnswers, showResults, selectedAnswer, showExplanation, quizData]);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component mount
    const storedData = localStorage.getItem("quizData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setQuizData(parsedData);
        
        // Kiểm tra xem có tiến độ đã lưu không
        const storedProgress = localStorage.getItem("quizProgress");
        
        if (storedProgress) {
          // Nếu có tiến độ đã lưu, khôi phục lại trạng thái
          const progress: QuizProgress = JSON.parse(storedProgress);
          setCurrentQuestionIndex(progress.currentQuestionIndex);
          setUserAnswers(progress.userAnswers);
          setShowResults(progress.showResults);
          setSelectedAnswer(progress.selectedAnswer);
          setShowExplanation(progress.showExplanation);
        } else {
          // Nếu không có tiến độ, khởi tạo mảng câu trả lời mới
          setUserAnswers(new Array(parsedData.questions.length).fill(null));
        }
        
        // Log ra để kiểm tra
        console.log("Dữ liệu từ API:", parsedData);
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu quiz:", error);
      }
    }
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Ngăn chọn lại đáp án
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    // Lưu câu trả lời của người dùng
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleNextQuestion = () => {
    if (!quizData) return;
    
    if (currentQuestionIndex < quizData.questions.length - 1) {
      // Chuyển sang câu hỏi tiếp theo
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Đã hoàn thành tất cả câu hỏi
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    // Xóa tiến độ đã lưu khi làm lại bài
    localStorage.removeItem("quizProgress");
    
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setUserAnswers(new Array(quizData?.questions.length).fill(null));
    setShowResults(false);
  };

  const createNewQuiz = () => {
    // Xóa tiến độ và dữ liệu quiz khi tạo bài mới
    localStorage.removeItem("quizProgress");
    localStorage.removeItem("quizData");
    router.push('/');
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    
    return userAnswers.reduce((score, userAnswer, index) => {
      const correctAnswer = quizData.questions[index].correct_answer;
      return userAnswer === correctAnswer ? (score ?? 0) + 1 : score;
    }, 0);
  };

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
        <div className="animate-pulse bg-white p-6 rounded-xl shadow-lg">
          <p className="text-xl text-blue-600 font-semibold">Đang khởi tạo bộ câu hỏi...</p>
        </div>
      </div>
    );
  }

  // Màn hình kết quả
  if (showResults) {
    const score = calculateScore();
    const totalQuestions = quizData.questions.length;
    const percentage = (score ?? 0 / totalQuestions) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-8 mb-6 text-center border border-blue-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Kết quả bài kiểm tra</h1>
            
            <div className="mb-8">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke={
                      percentage === 100 ? "#2563eb" : 
                      percentage >= 70 ? "#10b981" : 
                      "#f87171"
                    } 
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (percentage * 282.7 / 100)}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <text 
                    x="50" 
                    y="50" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="text-3xl font-bold"
                    fill={
                      percentage === 100 ? "#2563eb" : 
                      percentage >= 70 ? "#10b981" : 
                      "#f87171"
                    }
                  >
                    {score}/{totalQuestions}
                  </text>
                </svg>
              </div>
              <div className="text-lg">
                {score === totalQuestions
                  ? "Tuyệt vời! Bạn đã trả lời đúng tất cả các câu hỏi."
                  : score && score >= totalQuestions * 0.7
                  ? "Tốt lắm! Bạn đã hoàn thành bài kiểm tra rất tốt."
                  : "Cố gắng hơn nhé! Bạn có thể làm lại bài kiểm tra để cải thiện kết quả."}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={restartQuiz}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Làm lại
              </button>
              <button
                onClick={createNewQuiz}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Tạo câu hỏi mới
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Màn hình quiz
  const currentQuestion = quizData.questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-8 mb-6 border border-blue-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600">Bộ câu hỏi của bạn</h1>
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
              Câu {currentQuestionIndex + 1}/{quizData.questions.length}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="border rounded-xl p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-inner">
            <h3 className="text-md sm:text-xl font-semibold mb-5 text-blue-800">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-2 sm:p-4 border rounded-lg cursor-pointer transition-all shadow-sm hover:shadow ${
                    selectedAnswer === null
                      ? "hover:bg-blue-100 border-blue-200"
                      : selectedAnswer === index
                        ? index === currentQuestion.correct_answer
                          ? "border-emerald-500 bg-emerald-50 shadow-emerald-100"
                          : "border-red-500 bg-red-50 shadow-red-100"
                        : index === currentQuestion.correct_answer && showExplanation
                          ? "border-emerald-500 bg-emerald-50 shadow-emerald-100"
                          : "border-gray-200"
                  }`}
                  tabIndex={0}
                  aria-label={`Đáp án ${String.fromCharCode(65 + index)}: ${option}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleAnswerSelect(index);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 font-medium px-2.5 ${
                      selectedAnswer === null
                        ? "bg-blue-100 text-blue-700"
                        : selectedAnswer === index
                          ? index === currentQuestion.correct_answer
                            ? "bg-emerald-500 text-white"
                            : "bg-red-500 text-white" 
                          : index === currentQuestion.correct_answer && showExplanation
                            ? "bg-emerald-500 text-white"
                            : "bg-blue-100 text-blue-700"
                    }`}>{String.fromCharCode(65 + index)}</span>
                    <span className={`${selectedAnswer !== null && (
                      (selectedAnswer === index && index === currentQuestion.correct_answer) ||
                      (index === currentQuestion.correct_answer && showExplanation)
                    ) ? "font-medium text-emerald-800" : ""}`}>{option}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {showExplanation && (
              <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow-inner">
                <div className="flex items-start">
                  <div className="mr-3 bg-blue-100 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-blue-700">{currentQuestion.explanation}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                selectedAnswer === null
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700"
              }`}
              aria-label={currentQuestionIndex < quizData.questions.length - 1 ? "Câu tiếp theo" : "Kết thúc bài kiểm tra"}
            >
              {currentQuestionIndex < quizData.questions.length - 1 
                ? "Câu tiếp theo" 
                : "Kết thúc bài kiểm tra"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 