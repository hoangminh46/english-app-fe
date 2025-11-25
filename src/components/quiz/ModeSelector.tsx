import React from 'react';

type ModeSelectorProps = {
  onSelectMode: (mode: 'quiz' | 'practice' | 'grammar') => void;
  selectedMode: 'quiz' | 'practice' | 'grammar' | null;
};

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  onSelectMode,
  selectedMode
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
          Chọn chế độ học tập
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Chọn chế độ phù hợp với mục tiêu học tập
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <button
          onClick={() => onSelectMode('quiz')}
          className={`group p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
            selectedMode === 'quiz'
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-4">
            <div className={`p-2 sm:p-3 rounded-full transition-colors duration-300 ${
              selectedMode === 'quiz'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 sm:flex-none text-left sm:text-center">
              <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${
                selectedMode === 'quiz' ? 'text-blue-600' : 'text-gray-800'
              }`}>Tạo bộ câu hỏi</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Tạo và làm bài kiểm tra theo chủ đề bạn muốn
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectMode('practice')}
          className={`group p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
            selectedMode === 'practice'
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-4">
            <div className={`p-2 sm:p-3 rounded-full transition-colors duration-300 ${
              selectedMode === 'practice'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 sm:flex-none text-left sm:text-center">
              <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${
                selectedMode === 'practice' ? 'text-blue-600' : 'text-gray-800'
              }`}>Mini game</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Học tập qua trò chơi tương tác thú vị
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectMode('grammar')}
          className={`group p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
            selectedMode === 'grammar'
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-4">
            <div className={`p-2 sm:p-3 rounded-full transition-colors duration-300 ${
              selectedMode === 'grammar'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1 sm:flex-none text-left sm:text-center">
              <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${
                selectedMode === 'grammar' ? 'text-blue-600' : 'text-gray-800'
              }`}>Ngữ pháp cơ bản</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Nắm vững các quy tắc ngữ pháp nền tảng
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}; 