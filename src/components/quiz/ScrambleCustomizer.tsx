import React from 'react';
import { FormData, difficulties } from '@/types/quiz';

interface ScrambleCustomizerProps {
  formData: FormData;
  onDifficultyChange: (difficulty: string) => void;
  onQuantityChange: (quantity: number) => void;
  onTopicToggle: (topic: string) => void;
  onTimerChange: (seconds: number) => void;
}

export const ScrambleCustomizer: React.FC<ScrambleCustomizerProps> = ({
  formData,
  onDifficultyChange,
  onQuantityChange,
  onTopicToggle,
  onTimerChange,
}) => {
  const topics = [
    { value: 'Random Topic', label: 'Chủ đề ngẫu nhiên' },
    { value: 'Family', label: 'Gia đình' },
    { value: 'Work', label: 'Công việc' },
    { value: 'Travel', label: 'Du lịch' },
    { value: 'Education', label: 'Giáo dục' },
    { value: 'Sports', label: 'Thể thao' },
    { value: 'Entertainment', label: 'Giải trí' },
    { value: 'Fashion', label: 'Thời trang' },
    { value: 'Food', label: 'Ẩm thực' },
    { value: 'Technology', label: 'Công nghệ' },
    { value: 'Environment', label: 'Môi trường' },
    { value: 'Health', label: 'Sức khỏe' }
  ];

  const isRandomSelected = formData.subtopics.includes('Random Topic');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tùy chỉnh Word Scramble</h2>
        <p className="text-gray-600 mb-6">
          Chọn chủ đề và độ khó cho trò chơi
        </p>
      </div>

      {/* Topics Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Chọn chủ đề (tối đa 3)</h3>
          {formData.subtopics.length > 0 && (
            <span className="text-sm text-gray-500">
              Đã chọn: {formData.subtopics.length}/3
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {topics.map((topic) => {
            const isSelected = formData.subtopics.includes(topic.value);
            const isDisabled = !isSelected && 
              ((formData.subtopics.length >= 3) || 
              (isRandomSelected) || 
              (topic.value !== 'Random Topic' && isRandomSelected));

            return (
              <button
                key={topic.value}
                onClick={() => onTopicToggle(topic.value)}
                disabled={isDisabled}
                className={`p-3 rounded-lg text-sm font-medium transition-colors
                  ${isSelected
                    ? 'bg-blue-600 text-white'
                    : isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Độ khó</h3>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => onDifficultyChange(difficulty.value)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors
                ${formData.difficulty === difficulty.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {difficulty.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Số lượng từ</h3>
        <div className="grid grid-cols-4 gap-3">
          {[5, 10, 15, 20].map((quantity) => (
            <button
              key={quantity}
              onClick={() => onQuantityChange(quantity)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors
                ${formData.quantity === quantity
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {quantity}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Thời gian trả lời (giây)</h3>
        <div className="grid grid-cols-4 gap-3">
          {[20, 25, 30, 45].map((seconds) => (
            <button
              key={seconds}
              onClick={() => onTimerChange(seconds)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors
                ${formData.timer === seconds
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {seconds}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 