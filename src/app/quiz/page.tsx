"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { encode } from 'base64-arraybuffer'
import { QuizResponse } from "@/types/quiz";
import VocabularyTooltip from "@/components/quiz/VocabularyTooltip";

type QuizProgress = {
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  showResults: boolean;
  selectedAnswer: number | null;
  showExplanation: boolean;
}

export default function QuizPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<QuizResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

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
        router.push('/');
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
    localStorage.removeItem('quizProgress');
    localStorage.removeItem('quizData');
    // Lưu trạng thái để hiển thị màn hình tùy chọn câu hỏi
    localStorage.setItem('progessState', JSON.stringify({
      currentStep: 5,
      selectedMode: 'quiz'
    }));
    // Chuyển về trang chủ
    router.push('/');
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    
    return userAnswers.reduce((score, userAnswer, index) => {
      const correctAnswer = quizData.questions[index].correct_answer;
      return userAnswer === correctAnswer ? (score ?? 0) + 1 : score;
    }, 0);
  };

  const exportToPDF = async () => {
    if (!quizData || isExporting) return;
    
    try {
      setIsExporting(true);

      const response = await fetch('/fonts/Montserrat-Regular.ttf');
      const fontBuffer = await response.arrayBuffer();
      const base64Font = encode(fontBuffer);
      
      // Khởi tạo PDF với encoding UTF-8 và font mặc định
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16
      });

      pdf.addFileToVFS('Montserrat-Regular.ttf', base64Font);
      pdf.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal');
      pdf.setFont('Montserrat');

      
      // Tiêu đề
      pdf.setFontSize(16);
      const title = "BỘ CÂU HỎI TRẮC NGHIỆM";
      const titleWidth = pdf.getStringUnitWidth(title) * 16 / pdf.internal.scaleFactor;
      const titleX = (pdf.internal.pageSize.width - titleWidth) / 2;
      pdf.text(title, titleX, 15);
      
      // Phần câu hỏi
      pdf.setFontSize(12);
      let yPos = 30;
      
      quizData.questions.forEach((question, index) => {
        // Thêm câu hỏi
        const questionText = `Câu ${index + 1}: ${question.question}`;
        const splitQuestion = pdf.splitTextToSize(questionText, 180);
        pdf.text(splitQuestion, 15, yPos);
        
        yPos += splitQuestion.length * 7;
        
        // Thêm các lựa chọn
        question.options.forEach((option, optIndex) => {
          const optionText = `${String.fromCharCode(65 + optIndex)}. ${option}`;
          const splitOption = pdf.splitTextToSize(optionText, 170);
          pdf.text(splitOption, 20, yPos);
          yPos += splitOption.length * 7;
        });
        
        yPos += 10;
        
        // Kiểm tra nếu còn ít không gian trên trang
        if (yPos > 250) {
          pdf.addPage();
          yPos = 20;
        }
      });
      
      // Thêm trang mới cho phần đáp án và giải thích
      pdf.addPage();
      pdf.setFontSize(14);
      const subtitle = "ĐÁP ÁN VÀ GIẢI THÍCH";
      const subtitleWidth = pdf.getStringUnitWidth(subtitle) * 14 / pdf.internal.scaleFactor;
      const subtitleX = (pdf.internal.pageSize.width - subtitleWidth) / 2;
      pdf.text(subtitle, subtitleX, 15);
      
      // Tạo bảng đáp án và giải thích
      const tableData = quizData.questions.map((question, index) => [
        `Câu ${index + 1}`,
        String.fromCharCode(65 + question.correct_answer),
        question.explanation
      ]);
      
      autoTable(pdf, {
        head: [["Câu hỏi", "Đáp án", "Giải thích"]],
        body: tableData,
        startY: 25,
        headStyles: { 
          fillColor: [66, 139, 202],
          fontSize: 12,
          halign: 'center',
          font: "Montserrat"
        },
        bodyStyles: {
          fontSize: 10,
          font: "Montserrat"
        },
        columnStyles: {
          0: { cellWidth: 20, halign: 'center' },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 'auto' }
        },
        theme: 'grid',
        margin: { top: 25, right: 15, bottom: 15, left: 15 },
        willDrawCell: function() {
          // Đảm bảo font được set cho mỗi cell
          pdf.setFont("Montserrat", "normal");
        }
      });
      
      // Lưu file PDF với encoding UTF-8
      pdf.save("bo-cau-hoi.pdf");
    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
    } finally {
      setIsExporting(false);
    }
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
    const percentage = ((score ?? 0) / totalQuestions) * 100;
    
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
                    className="text-2xl font-bold"
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
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={restartQuiz}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base"
              >
                Làm lại
              </button>
              <button
                onClick={createNewQuiz}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base"
              >
                Tạo câu hỏi mới
              </button>
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className={`w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base ${
                  isExporting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                {isExporting ? 'Đang xuất PDF...' : 'Xuất PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Màn hình quiz
  const currentQuestion = quizData.questions[currentQuestionIndex];
  
  // Hàm để thay thế từ vựng mới bằng tooltip
  const renderQuestionWithTooltips = (question: string, newWords: Array<{ word: string; pronunciation: string; meaning: string }>) => {
    if (!newWords || newWords.length === 0) return question;

    let result = question;
    newWords.forEach(({ word, pronunciation, meaning }) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, `<vocabulary-tooltip word="${word}" pronunciation="${pronunciation}" meaning="${meaning}">${word}</vocabulary-tooltip>`);
    });

    const parts = result.split(/(<vocabulary-tooltip.*?<\/vocabulary-tooltip>)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('<vocabulary-tooltip')) {
        const wordMatch = part.match(/word="([^"]*)"/) || [];
        const pronunciationMatch = part.match(/pronunciation="([^"]*)"/) || [];
        const meaningMatch = part.match(/meaning="([^"]*)"/) || [];
        const contentMatch = part.match(/>([^<]*)</) || [];
        
        return (
          <VocabularyTooltip
            key={index}
            word={wordMatch[1] || ''}
            pronunciation={pronunciationMatch[1] || ''}
            meaning={meaningMatch[1] || ''}
          >
            {contentMatch[1] || ''}
          </VocabularyTooltip>
        );
      }
      return part;
    });
  };
  
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
            <h3 className="text-md sm:text-xl font-semibold mb-5 text-blue-800">
              {renderQuestionWithTooltips(currentQuestion.question, currentQuestion.new_words)}
            </h3>
            
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