import React from 'react';
import { Button } from '@/components/ui/Button';

type PracticeSelectorProps = {
  onSelectPracticeType: (type: 'scramble') => void;
  selectedType: 'scramble' | null;
};

export const PracticeSelector: React.FC<PracticeSelectorProps> = ({
  onSelectPracticeType,
  selectedType
}) => {
  const practiceTypes = [
    {
      id: 'scramble',
      title: 'Word Scramble',
      description: 'Sắp xếp lại các chữ cái để tạo thành từ có nghĩa',
      icon: '🔤'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
          Chọn mini game
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Chọn trò chơi phù hợp để học tập vui vẻ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {practiceTypes.map((type) => (
          <Button
            key={type.id}
            onClick={() => onSelectPracticeType(type.id as 'scramble')}
            variant="ghost"
            size="none"
            className={`h-auto group p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              selectedType === type.id
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
          >
            <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-4">
              <div className={`p-2 sm:p-3 rounded-full flex items-center justify-center text-2xl sm:text-3xl transition-colors duration-300 ${
                selectedType === type.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-600'
              }`}>
                {type.icon}
              </div>
              <div className="flex-1 sm:flex-none text-left sm:text-center">
                <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${
                  selectedType === type.id ? 'text-blue-600' : 'text-gray-800'
                }`}>{type.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {type.description}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}; 