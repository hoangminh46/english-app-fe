import React from 'react';

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

      <div className="grid grid-cols-1 gap-4">
        {practiceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelectPracticeType(type.id as 'scramble')}
            className={`group p-6 border-2 rounded-lg transition-all duration-300 flex flex-col items-center text-center ${
              selectedType === type.id
                ? 'border-blue-500 bg-blue-50'
                : 'hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 ${
              selectedType === type.id ? 'bg-blue-200' : 'bg-blue-100 group-hover:bg-blue-200'
            }`}>
              {type.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
            <p className="text-gray-600">
              {type.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}; 