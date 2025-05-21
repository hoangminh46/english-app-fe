import React from 'react';
import { difficulties } from '../../types/quiz';

type DifficultySelectorProps = {
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
};

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onDifficultyChange
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 text-blue-600">Độ khó</h3>
      <div className="flex flex-wrap gap-3">
        {difficulties.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`px-4 py-2 rounded-full transition-all shadow-sm ${
              selectedDifficulty === item.label
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:shadow-lg"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => onDifficultyChange(item.label)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}; 