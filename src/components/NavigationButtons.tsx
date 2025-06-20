import React from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  mode?: 'quiz' | 'practice';
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  canGoNext,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
  mode
}) => {
  const isLastStep = currentStep === totalSteps;

  const getSubmitButtonText = () => {
    if (isSubmitting) return 'Đang tạo...';
    if (mode === 'practice') return 'Tạo trò chơi';
    return 'Tạo bộ câu hỏi';
  };

  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
        className={`px-6 py-2 rounded-lg shadow-sm transition-all ${
          currentStep === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
        }`}
      >
        Quay lại
      </button>
      
      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canGoNext || isSubmitting}
          className={`px-6 py-2 rounded-lg shadow-sm transition-all ${
            !canGoNext || isSubmitting
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
        >
          {getSubmitButtonText()}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className={`px-6 py-2 rounded-lg shadow-sm transition-all ${
            !canGoNext
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
        >
          Tiếp theo
        </button>
      )}
    </div>
  );
}; 