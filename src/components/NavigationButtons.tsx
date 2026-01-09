import React from 'react';
import { Button } from './ui/Button';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  mode?: 'quiz' | 'practice';
  hideBackButton?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  canGoNext,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
  mode,
  hideBackButton = false
}) => {
  const isLastStep = currentStep === totalSteps;

  const getSubmitButtonText = () => {
    if (mode === 'practice') return 'Tạo trò chơi';
    return 'Tạo bộ câu hỏi';
  };

  return (
    <div className={`flex gap-3 ${hideBackButton ? 'justify-end' : 'justify-between'}`}>
      {!hideBackButton && (
        <Button
          type="button"
          onClick={onBack}
          disabled={currentStep === 1}
          variant="outline"
          className="px-6"
        >
          Quay lại
        </Button>
      )}
      
      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={!canGoNext}
          isLoading={isSubmitting}
          className="px-6"
        >
          {getSubmitButtonText()}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="px-6"
        >
          Tiếp theo
        </Button>
      )}
    </div>
  );
}; 