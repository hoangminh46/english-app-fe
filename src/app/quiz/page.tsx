"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { encode } from 'base64-arraybuffer'
import { BaseModal } from "@/components/ui/BaseModal";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { QuizResponse } from "@/types/quiz";
import VocabularyTooltip from "@/components/quiz/VocabularyTooltip";
import { Button } from "@/components/ui/Button";

type QuizProgress = {
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  showResults: boolean;
  selectedAnswer: number | null;
  showExplanation: boolean;
  shuffledOptionsIndices: number[][];
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizPage() {
  const router = useRouter();

  // Load initial state synchronously to avoid flicker
  const { initData, initProg } = useMemo(() => {
    if (typeof window === 'undefined') return { initData: null, initProg: null };
    const data = JSON.parse(localStorage.getItem('quizData') || 'null');
    const prog = JSON.parse(localStorage.getItem('quizProgress') || 'null');
    return { initData: data, initProg: prog };
  }, []);

  const [quizData, setQuizData] = useState<QuizResponse | null>(initData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initProg?.currentQuestionIndex || 0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(initProg?.selectedAnswer ?? null);
  const [showExplanation, setShowExplanation] = useState(initProg?.showExplanation || false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(initProg?.userAnswers || (initData ? new Array(initData.questions.length).fill(null) : []));
  const [showResults, setShowResults] = useState(initProg?.showResults || false);
  const [isExporting, setIsExporting] = useState(false);
  const [shuffledOptionsIndices, setShuffledOptionsIndices] = useState<number[][]>(
    initProg?.shuffledOptionsIndices || (initData ? initData.questions.map((q: any) => shuffleArray(Array.from({ length: q.options.length }, (_, i) => i))) : [])
  );
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingTargetPath, setPendingTargetPath] = useState<string | null>(null);

  // Chuyển hướng nếu không có dữ liệu
  useEffect(() => {
    if (!quizData) router.push('/');
  }, [quizData, router]);

  // Lưu tiến độ làm bài mỗi khi có sự thay đổi
  useEffect(() => {
    if (!quizData) return;
    
    const progress: QuizProgress = {
      currentQuestionIndex,
      userAnswers,
      showResults,
      selectedAnswer,
      showExplanation,
      shuffledOptionsIndices
    };
    
    localStorage.setItem("quizProgress", JSON.stringify(progress));
  }, [currentQuestionIndex, userAnswers, showResults, selectedAnswer, showExplanation, quizData, shuffledOptionsIndices]);

  // Lắng nghe sự kiện điều hướng từ Header
  useEffect(() => {
    const handleNav = (e: any) => {
      // Chỉ hiện thông báo nếu chưa xong bài
      if (!showResults) {
        setPendingTargetPath(e.detail?.targetPath || '/');
        setShowExitModal(true);
      }
    };

    window.addEventListener('request-navigation', handleNav);
    return () => window.removeEventListener('request-navigation', handleNav);
  }, [showResults]);

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
      setCurrentQuestionIndex((prevIndex:any) => prevIndex + 1);
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
    
    // Tạo lại thứ tự xáo trộn mới khi làm lại bài
    if (quizData) {
      const newIndices = quizData.questions.map(q => 
        shuffleArray(Array.from({ length: q.options.length }, (_, i) => i))
      );
      setShuffledOptionsIndices(newIndices);
    }
    
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

  const handleConfirmedExit = () => {
    // Xóa tiến độ khi người dùng xác nhận thoát
    localStorage.removeItem('quizProgress');
    localStorage.removeItem('quizData');
    router.push(pendingTargetPath || '/');
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
        
        // Thêm các lựa chọn (xáo trộn nếu có)
        const questionShuffledIndices = shuffledOptionsIndices[index] || Array.from({ length: question.options.length }, (_, i) => i);
        
        questionShuffledIndices.forEach((originalIndex, displayIndex) => {
          const option = question.options[originalIndex];
          const optionText = `${String.fromCharCode(65 + displayIndex)}. ${option}`;
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
      const tableData = quizData.questions.map((question, index) => {
        let explanationText = question.explanation.summary;
        if (question.explanation.formula && question.explanation.formula !== 'N/A') {
          explanationText += `\n\nCông thức: ${question.explanation.formula}`;
        }
        if (question.explanation.note) {
          explanationText += `\n\nLưu ý: ${question.explanation.note}`;
        }
        
        // Tìm vị trí của đáp án đúng trong mảng đã xáo trộn cho PDF
        const questionShuffledIndices = shuffledOptionsIndices[index] || Array.from({ length: question.options.length }, (_, i) => i);
        const displayCorrectIdx = questionShuffledIndices.indexOf(question.correct_answer);
        
        return [
          `Câu ${index + 1}`,
          String.fromCharCode(65 + (displayCorrectIdx !== -1 ? displayCorrectIdx : question.correct_answer)),
          explanationText
        ];
      });
      
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
              <Button
                onClick={restartQuiz}
                size="lg"
                className="w-full sm:w-auto"
              >
                Làm lại
              </Button>
              <Button
                onClick={createNewQuiz}
                size="lg"
                className="w-full sm:w-auto"
              >
                Tạo câu hỏi mới
              </Button>
              <Button
                onClick={exportToPDF}
                isLoading={isExporting}
                variant="success"
                size="lg"
                className="w-full sm:w-auto"
              >
                Xuất PDF
              </Button>
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

    // Sắp xếp các từ theo độ dài giảm dần để ưu tiên các từ dài hơn trước
    const sortedWords = [...newWords].sort((a, b) => b.word.length - a.word.length);
    
    // Theo dõi các từ đã được thay thế để chỉ thay thế lần đầu tiên (theo logic cũ)
    const replacedWords = new Set<string>();

    // Tạo một regex tổng hợp để tìm tất cả các từ cần thay thế trong một lần duy nhất
    // Điều này ngăn chặn việc thay thế nhầm vào nội dung các attribute của thẻ đã thêm
    const escapedWords = sortedWords
      .map(nw => nw.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    
    // Sử dụng regex với word boundaries (\b) để đảm bảo chỉ thay thế chính xác từ đó
    const regex = new RegExp(`\\b(${escapedWords})\\b`, 'gi');

    let result = question.replace(regex, (match) => {
      const lowerMatch = match.toLowerCase();
      // Tìm thông tin từ vựng tương ứng (không phân biệt hoa thường)
      const nw = sortedWords.find(n => n.word.toLowerCase() === lowerMatch);
      
      if (nw && !replacedWords.has(lowerMatch)) {
        replacedWords.add(lowerMatch);
        return `<vocabulary-tooltip word="${nw.word}" pronunciation="${nw.pronunciation}" meaning="${nw.meaning}">${match}</vocabulary-tooltip>`;
      }
      return match;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 border border-blue-100">
          {/* Question counter with progress indicator */}
          <div className="flex flex-col items-center mb-2">
            <div className="flex justify-between items-center w-full mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-blue-800">Bài tập trắc nghiệm</h1>
              <div className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-bold text-base sm:text-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
                {currentQuestionIndex + 1}/{quizData.questions.length}
              </div>
            </div>
          </div>
          
          <div className="border-2 border-blue-200 rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-inner">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 text-blue-800 leading-relaxed">
              {renderQuestionWithTooltips(currentQuestion.question, currentQuestion.new_words)}
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {(shuffledOptionsIndices[currentQuestionIndex] || Array.from({ length: currentQuestion.options.length }, (_, i) => i)).map((originalIndex, displayIndex) => {
                const option = currentQuestion.options[originalIndex];
                const isCorrect = originalIndex === currentQuestion.correct_answer;
                const isSelected = selectedAnswer === originalIndex;
                const isCorrectButNotSelected = isCorrect && showExplanation;

                return (
                  <div 
                    key={originalIndex}
                    onClick={() => handleAnswerSelect(originalIndex)}
                    className={`p-2 sm:p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] ${
                      selectedAnswer === null
                        ? `hover:bg-blue-50 border-blue-300 hover:border-blue-400 bg-white hover:shadow-blue-100 ${
                            displayIndex === 0 ? "hover:bg-blue-50" : 
                            displayIndex === 1 ? "hover:bg-indigo-50" : 
                            displayIndex === 2 ? "hover:bg-purple-50" : 
                            "hover:bg-cyan-50"
                          }`
                        : isSelected
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-50 shadow-emerald-200"
                            : "border-red-500 bg-red-50 shadow-red-200"
                          : isCorrectButNotSelected
                            ? "border-emerald-500 bg-emerald-50 shadow-emerald-200"
                            : "border-blue-300 bg-white"
                    }`}
                    tabIndex={0}
                    aria-label={`Đáp án ${String.fromCharCode(65 + displayIndex)}: ${option}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleAnswerSelect(originalIndex);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <span className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4 font-bold text-lg sm:text-xl flex-shrink-0 ${
                        selectedAnswer === null
                          ? "bg-blue-100 text-blue-700"
                          : isSelected
                            ? isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-red-500 text-white" 
                            : isCorrectButNotSelected
                              ? "bg-emerald-500 text-white"
                              : "bg-blue-100 text-blue-700"
                      }`}>{String.fromCharCode(65 + displayIndex)}</span>
                      <span className={`text-base sm:text-lg leading-relaxed flex-1 ${
                        selectedAnswer !== null && (isSelected && isCorrect || isCorrectButNotSelected) 
                          ? "font-semibold text-emerald-800" : "text-blue-800"
                      }`}>{option}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {showExplanation && (
              <div className={`mt-6 rounded-xl overflow-hidden border-2 shadow-lg ${
                selectedAnswer === currentQuestion.correct_answer
                  ? 'border-emerald-400 bg-white' 
                  : 'border-red-400 bg-white'
              }`}>
                {/* Header with Status */}
                <div className={`px-4 py-2.5 ${
                  selectedAnswer === currentQuestion.correct_answer
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold text-lg">
                      {selectedAnswer === currentQuestion.correct_answer ? '🎉 Chính xác!' : '⚠️ Sai mất rồi!'}
                    </h4>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 bg-white">
                  {/* Summary Section */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-1 h-4 rounded-full ${
                        selectedAnswer === currentQuestion.correct_answer
                          ? 'bg-gradient-to-b from-emerald-500 to-emerald-600' 
                          : 'bg-gradient-to-b from-red-500 to-red-600'
                      }`}></div>
                      <p className="text-sm font-bold text-gray-800">Giải thích:</p>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700 ml-3">{currentQuestion.explanation.summary}</p>
                  </div>

                  {/* Formula Section - Only show if not N/A */}
                  {currentQuestion.explanation.formula && currentQuestion.explanation.formula !== 'N/A' && (
                    <div className={`rounded-lg p-3 mb-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 ${
                      selectedAnswer === currentQuestion.correct_answer ? 'border-emerald-500' : 'border-red-500'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-1 h-4 rounded-full ${
                          selectedAnswer === currentQuestion.correct_answer
                            ? 'bg-gradient-to-b from-emerald-500 to-emerald-600' 
                            : 'bg-gradient-to-b from-red-500 to-red-600'
                        }`}></div>
                        <p className="text-sm font-bold text-gray-800">Công thức:</p>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold italic leading-relaxed text-blue-900 bg-white px-3 py-2 rounded border border-blue-200">
                          {currentQuestion.explanation.formula}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Note Section - Only show if exists */}
                  {currentQuestion.explanation.note && (
                    <div className={`rounded-lg p-3 bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 ${
                      selectedAnswer === currentQuestion.correct_answer ? 'border-emerald-500' : 'border-red-500'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-1 h-4 rounded-full ${
                          selectedAnswer === currentQuestion.correct_answer
                            ? 'bg-gradient-to-b from-emerald-500 to-emerald-600' 
                            : 'bg-gradient-to-b from-red-500 to-red-600'
                        }`}></div>
                        <p className="text-sm font-bold text-gray-800">Lưu ý:</p>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm leading-relaxed text-gray-800">
                          {currentQuestion.explanation.note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-center sm:justify-end">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
              aria-label={currentQuestionIndex < quizData.questions.length - 1 ? "Câu tiếp theo" : "Kết thúc bài kiểm tra"}
            >
              {currentQuestionIndex < quizData.questions.length - 1 
                ? "Câu tiếp theo" 
                : "Kết thúc bài kiểm tra"}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal xác nhận thoát */}
      <BaseModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Xác nhận thoát"
        maxWidth="md"
        headerGradient="from-red-600 to-red-700"
        showCloseButton={false}
        footer={
          <div className="flex gap-3">
            <Button 
              variant="gray" 
              fullWidth
              onClick={() => setShowExitModal(false)}
            >
              Ở lại tiếp tục
            </Button>
            <Button 
              variant="danger" 
              fullWidth
              onClick={handleConfirmedExit}
            >
              Thoát bài tập
            </Button>
          </div>
        }
      >
        <div className="flex flex-col items-center text-center py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Nếu quay về trang chủ lúc này, kết quả của bạn sẽ không được lưu lại và bạn sẽ mất quá trình hiện tại. Bạn có chắc chắn muốn thoát?
          </p>
        </div>
      </BaseModal>
    </div>
  );
}