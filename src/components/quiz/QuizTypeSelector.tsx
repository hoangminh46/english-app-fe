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

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => onSelectQuizType('quick')}
          className={`group p-6 border rounded-lg transition-all duration-300 flex flex-col items-center text-center ${
            selectedType === 'quick'
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
            selectedType === 'quick' ? 'bg-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Tạo câu hỏi nhanh</h3>
          <p className="text-gray-600">
            Hệ thống sẽ tự động tạo bộ câu hỏi dựa trên cấp độ của bạn
          </p>
        </button>

        <button
          onClick={() => onSelectQuizType('custom')}
          className={`group p-6 border rounded-lg transition-all duration-300 flex flex-col items-center text-center ${
            selectedType === 'custom'
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-blue-300 hover:bg-gray-50'
          }`}
        >
          <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
            selectedType === 'custom' ? 'bg-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thiết lập bộ câu hỏi</h3>
          <p className="text-gray-600">
            Tùy chỉnh bộ câu hỏi theo chủ đề, độ khó và số lượng mong muốn
          </p>
        </button>
      </div>
    </div>
  );
}; 