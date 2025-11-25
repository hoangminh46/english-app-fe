import React from 'react';

type QuizTypeSelectorProps = {
  onSelectQuizType: (type: 'quick' | 'custom') => void;
  selectedType: 'quick' | 'custom' | null;
};

export const QuizTypeSelector: React.FC<QuizTypeSelectorProps> = ({
  onSelectQuizType,
  selectedType
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
          Chọn kiểu bộ câu hỏi
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Chọn cách tạo bộ câu hỏi phù hợp với bạn
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <button
          onClick={() => onSelectQuizType('quick')}
          className={`group p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
            selectedType === 'quick'
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-4">
            <div className={`p-2 sm:p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
              selectedType === 'quick'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1 sm:flex-none text-left sm:text-center">
              <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${
                selectedType === 'quick' ? 'text-blue-600' : 'text-gray-800'
              }`}>Tạo câu hỏi nhanh</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Hệ thống sẽ tự động tạo bộ câu hỏi dựa trên cấp độ của bạn
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectQuizType('custom')}
          className={`group p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
            selectedType === 'custom'
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-4">
            <div className={`p-2 sm:p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
              selectedType === 'custom'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div className="flex-1 sm:flex-none text-left sm:text-center">
              <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${
                selectedType === 'custom' ? 'text-blue-600' : 'text-gray-800'
              }`}>Thiết lập bộ câu hỏi</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Tùy chỉnh bộ câu hỏi theo chủ đề, độ khó và số lượng mong muốn
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}; 