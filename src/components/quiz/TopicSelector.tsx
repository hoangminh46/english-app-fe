import React, { useState } from 'react';
import { categories, Topic } from '../../types/quiz';

type TopicSelectorProps = {
  selectedTopics: string[];
  onTopicToggle: (topicName: string) => void;
  onRemoveTopic: (topicName: string) => void;
  onClearAll: () => void;
  onCategorySelect: (categoryName: string) => void;
  onMainTopicSelect: (topicName: string) => void;
};

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopics,
  onTopicToggle,
  onRemoveTopic,
  onClearAll,
  onCategorySelect,
  onMainTopicSelect
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMainTopic, setSelectedMainTopic] = useState<string>('');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedMainTopic('');
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      onCategorySelect(category.name);
    }
  };

  const handleMainTopicSelect = (topicId: string) => {
    setSelectedMainTopic(topicId);
    const currentCategory = categories.find(cat => cat.id === selectedCategory);
    const topic = currentCategory?.topics.find(t => t.id === topicId);
    if (topic) {
      onMainTopicSelect(topic.name);
    }
  };

  const renderSubtopics = (subtopics: Topic[]) => {
    return subtopics.map((subtopic) => {
      const isSelected = selectedTopics.includes(subtopic.name);
      const isDisabled = selectedTopics.length >= 3 && !isSelected;

      return (
        <div
          key={subtopic.id}
          onClick={() => !isDisabled && onTopicToggle(subtopic.name)}
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
              className={`p-4 rounded-lg border text-left transition-all ${
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
                className={`p-4 rounded-lg border text-left transition-all ${
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

      {/* Selected Topics Info */}
      <div className="px-2 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="text-sm font-medium text-blue-500">
            Đã chọn: {selectedTopics.length}/3
          </div>
          {selectedTopics.length > 0 && (
            <button
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              onClick={onClearAll}
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {selectedTopics.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-sm text-blue-600 mb-2">Chủ đề đã chọn:</div>
            <div className="flex flex-wrap gap-2">
              {selectedTopics.map((topicName) => (
                <div
                  key={topicName}
                  className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1 shadow-sm"
                >
                  <span className="truncate max-w-[200px]">{topicName}</span>
                  <button
                    type="button"
                    className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveTopic(topicName);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 