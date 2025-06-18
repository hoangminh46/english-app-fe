import React from 'react';

type ModeSelectorProps = {
  onSelectMode: (mode: 'quiz' | 'practice') => void;
  selectedMode: 'quiz' | 'practice' | null;
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

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => onSelectMode('quiz')}
          className={`group p-6 border-2 rounded-lg transition-all duration-300 flex flex-col items-center text-center ${
            selectedMode === 'quiz'
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
            selectedMode === 'quiz' ? 'bg-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Tạo bộ câu hỏi</h3>
          <p className="text-gray-600">
            Tạo và làm bài kiểm tra theo chủ đề bạn muốn
          </p>
        </button>

        <button
          onClick={() => onSelectMode('practice')}
          className={`group p-6 border-2 rounded-lg transition-all duration-300 flex flex-col items-center text-center ${
            selectedMode === 'practice'
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
            selectedMode === 'practice' ? 'bg-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Mini game</h3>
          <p className="text-gray-600">
            Học tập thông qua các trò chơi tương tác thú vị
          </p>
        </button>
      </div>
    </div>
  );
}; 