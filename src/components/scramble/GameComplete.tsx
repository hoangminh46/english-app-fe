import React from 'react';
import { useRouter } from 'next/navigation';

interface GameCompleteProps {
  score: number;
  totalWords: number;
}

export const GameComplete: React.FC<GameCompleteProps> = ({ score, totalWords }) => {
  const router = useRouter();

  const handlePlayAgain = () => {
    // Clear game data
    localStorage.removeItem('scrambleData');
    localStorage.removeItem('scrambleProgress');
    // Save state to indicate we want to show scramble customization screen
    localStorage.setItem('progessState', JSON.stringify({
      currentStep: 5,
      selectedMode: 'practice',
      selectedPracticeType: 'scramble'
    }));
    // Navigate to home
    router.push('/');
  };

  const handleGoHome = () => {
    // Clear all game data and state
    localStorage.removeItem('scrambleData');
    localStorage.removeItem('scrambleProgress');
    localStorage.removeItem('formData');
    localStorage.removeItem('progessState');
    // Navigate to home
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            {/* Trophy Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>

            {/* Score Display */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Chúc mừng! Bạn đã hoàn thành trò chơi
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {score}/{totalWords}
            </div>
            <p className="text-gray-600 mb-8">
              {score === totalWords 
                ? "Tuyệt vời! Bạn đã trả lời đúng tất cả các từ." 
                : score >= totalWords * 0.7 
                  ? "Rất tốt! Hãy tiếp tục cố gắng để đạt điểm tối đa." 
                  : "Đừng nản chí! Hãy thử lại để cải thiện kết quả của bạn."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePlayAgain}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Chơi lại
              </button>
              <button
                onClick={handleGoHome}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 