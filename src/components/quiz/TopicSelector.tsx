import React from 'react';
import { topicsByLanguage } from '../../types/quiz';

type TopicSelectorProps = {
  selectedLanguage: string;
  selectedTopics: string[];
  onTopicToggle: (topicName: string) => void;
  onRemoveTopic: (topicName: string) => void;
  onClearAll: () => void;
};

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedLanguage,
  selectedTopics,
  onTopicToggle,
  onRemoveTopic,
  onClearAll
}) => {
  const availableTopics = selectedLanguage ? topicsByLanguage[selectedLanguage] || [] : [];

  return (
    <div>
      <h3 className="text-lg font-medium mb-3 text-blue-600">
        Chọn chủ đề {selectedLanguage} (tối đa 3)
      </h3>
      {availableTopics.length > 0 ? (
        <div className="space-y-4">
          <div className="border rounded-lg bg-white overflow-auto max-h-[240px] shadow-sm">
            {availableTopics.map((topic) => {
              const isSelected = selectedTopics.includes(topic.name);
              const isDisabled = selectedTopics.length >= 3 && !isSelected;
              return (
                <div 
                  key={topic.id}
                  onClick={() => !isDisabled && onTopicToggle(topic.name)}
                  className={`p-4 border-b last:border-b-0 flex items-center justify-between cursor-pointer transition-all ${
                    isDisabled 
                      ? "bg-gray-50 opacity-75 cursor-not-allowed"
                      : isSelected 
                        ? "bg-gradient-to-r from-blue-400/10 to-blue-600/10 border-blue-100" 
                        : "hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 flex items-center justify-center rounded border mr-3 ${
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
                    <span className="font-medium">{topic.name}</span>
                  </div>
                  {isDisabled && (
                    <span className="text-xs text-gray-400">Đã đạt giới hạn</span>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center">
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
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-sm text-blue-600 mb-2">Chủ đề đã chọn:</div>
              <div className="flex flex-wrap gap-2">
                {selectedTopics.map((topicName) => (
                  <div 
                    key={topicName} 
                    className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1 shadow-sm"
                  >
                    <span>{topicName}</span>
                    <button 
                      type="button" 
                      className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
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
      ) : (
        <div className="text-gray-500 italic py-8 text-center border rounded-lg bg-gray-50">
          Vui lòng chọn ngôn ngữ trước khi chọn chủ đề
        </div>
      )}
    </div>
  );
}; 