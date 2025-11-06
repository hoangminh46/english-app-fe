import React, { useState } from 'react';
import { categories, difficulties, Topic } from '../../types/quiz';
import { quantityOptions } from '../../types/quiz';

type TopicSelectorProps = {
  selectedTopics: string[];
  onTopicToggle: (topicName: string) => void;
  onCategorySelect: (categoryName: string) => void;
  onMainTopicSelect: (topicName: string) => void;
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
};

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopics,
  onTopicToggle,
  onCategorySelect,
  onMainTopicSelect,
  selectedQuantity,
  onQuantityChange,
  selectedDifficulty,
  onDifficultyChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMainTopic, setSelectedMainTopic] = useState<string>('');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedMainTopic('');
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      onCategorySelect(category.nameEn);
    }
  };

  const handleMainTopicSelect = (topicId: string) => {
    setSelectedMainTopic(topicId);
    const currentCategory = categories.find(cat => cat.id === selectedCategory);
    const topic = currentCategory?.topics.find(t => t.id === topicId);
    if (topic) {
      onMainTopicSelect(topic.nameEn);
    }
  };

  const renderSubtopics = (subtopics: Topic[]) => {
    return subtopics.map((subtopic) => {
      const isSelected = selectedTopics.includes(subtopic.nameEn);
      const isDisabled = selectedTopics.length >= 3 && !isSelected;

      return (
        <div
          key={subtopic.id}
          onClick={() => !isDisabled && onTopicToggle(subtopic.nameEn)}
          className={`p-3 border-b last:border-b-0 flex items-center justify-between cursor-pointer transition-all ${
            isDisabled
              ? "bg-gray-50 opacity-75 cursor-not-allowed"
              : isSelected
                ? "bg-gradient-to-r from-blue-400/10 to-blue-600/10 border-blue-100"
                : "hover:bg-blue-50"
          }`}
        >
          <div className="flex items-center flex-1 min-w-0">
            <div className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded border mr-3 ${
              isSelected
                ? "bg-gradient-to-r from-blue-400 to-blue-600 border-blue-500 text-white"
                : "border-gray-300"
            }`}>
              {isSelected && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="font-medium truncate">{subtopic.name}</span>
          </div>
          {isDisabled && (
            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">Đã đạt giới hạn</span>
          )}
        </div>
      );
    });
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const currentMainTopic = currentCategory?.topics.find(topic => topic.id === selectedMainTopic);

  // Helper function to get Vietnamese name from English name
  const getTopicNameVi = (nameEn: string): string => {
    for (const category of categories) {
      for (const topic of category.topics) {
        if (topic.subtopics) {
          const subtopic = topic.subtopics.find(st => st.nameEn === nameEn);
          if (subtopic) return subtopic.name;
        }
      }
    }
    return nameEn;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Category Selection */}
      <div>
        <h3 className="text-lg font-medium mb-3 text-blue-600 px-2 sm:px-0">
          Chọn danh mục (tối đa 3 chủ đề con)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-2 sm:px-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`p-3 md:p-4 rounded-lg border text-left transition-all ${
                selectedCategory === category.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
              }`}
            >
              <h4 className="font-medium truncate">{category.name}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {category.topics.length} chủ đề chính
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Topics */}
      {currentCategory && (
        <div className="px-2 sm:px-0">
          <h3 className="text-lg font-medium mb-3 text-blue-600">
            Chọn chủ đề chính trong {currentCategory.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCategory.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleMainTopicSelect(topic.id)}
                className={`p-3 md:p-4 rounded-lg border text-left transition-all ${
                  selectedMainTopic === topic.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                }`}
              >
                <h4 className="font-medium truncate">{topic.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {topic.subtopics?.length || 0} chủ đề con
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subtopics */}
      {currentMainTopic && currentMainTopic.subtopics && (
        <div className="px-2 sm:px-0">
          <h3 className="text-lg font-medium mb-3 text-blue-600">
            Chọn chủ đề con trong {currentMainTopic.name}
          </h3>
          <div className="border rounded-lg bg-white overflow-auto max-h-[240px] shadow-sm">
            {renderSubtopics(currentMainTopic.subtopics)}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-3 text-blue-600">Độ khó</h3>
        <div className="flex flex-wrap gap-3">
          {difficulties.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`px-4 py-2 rounded-lg transition-all shadow-sm ${
                selectedDifficulty === item.value
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:shadow-lg"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
              onClick={() => onDifficultyChange(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-blue-600">Số lượng câu hỏi</h3>
        <div className="flex flex-wrap gap-3">
          {quantityOptions.map((qty) => (
            <button
              key={qty}
              type="button"
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all shadow-sm ${
                selectedQuantity === qty
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
              onClick={() => onQuantityChange(qty)}
            >
              {qty}
            </button>
          ))}
        </div>
      </div>

      {selectedTopics.length > 0 && (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-lg font-medium text-blue-600 mb-3">Thiết lập đã chọn</div>
          <div className="space-y-3">
            {/* Category and Main Topic */}
            {selectedCategory && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-blue-600">Danh mục:</span>
                <div className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm">
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </div>
              </div>
            )}
            {selectedMainTopic && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-blue-600">Chủ đề chính:</span>
                <div className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm">
                  {currentCategory?.topics.find(topic => topic.id === selectedMainTopic)?.name}
                </div>
              </div>
            )}

            {/* Selected Subtopics */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-blue-600">Chủ đề con đã chọn:</span>
              <div className="flex flex-wrap gap-2">
                {selectedTopics.map((topicNameEn) => (
                  <div
                    key={topicNameEn}
                    className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm"
                  >
                    {getTopicNameVi(topicNameEn)}
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty and Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-blue-600">Độ khó:</span>
                <div className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm">
                  {difficulties.find(d => d.value === selectedDifficulty)?.label || selectedDifficulty}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-blue-600">Số lượng câu hỏi:</span>
                <div className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm">
                  {selectedQuantity} câu
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 