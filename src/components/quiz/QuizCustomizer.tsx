import React from 'react';
import { FormData } from '../../types/quiz';
import { TopicSelector } from './TopicSelector';

type QuizCustomizerProps = {
  formData: FormData;
  onTopicToggle: (topicName: string) => void;
  onRemoveTopic: (topicName: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onQuantityChange: (quantity: number) => void;
  onCategorySelect: (categoryName: string) => void;
  onMainTopicSelect: (topicName: string) => void;
};

export const QuizCustomizer: React.FC<QuizCustomizerProps> = ({
  formData,
  onTopicToggle,
  onRemoveTopic,
  onDifficultyChange,
  onQuantityChange,
  onCategorySelect,
  onMainTopicSelect
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Tùy chỉnh bộ câu hỏi
      </h2>
      
      {/* Topic selection */}
      <TopicSelector
        selectedTopics={formData.subtopics}
        onTopicToggle={onTopicToggle}
        onRemoveTopic={onRemoveTopic}
        onCategorySelect={onCategorySelect}
        onMainTopicSelect={onMainTopicSelect}
        selectedQuantity={formData.quantity}
        onQuantityChange={onQuantityChange}
        selectedDifficulty={formData.difficulty}
        onDifficultyChange={onDifficultyChange}
      />
    </div>
  );
}; 