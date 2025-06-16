import React from 'react';

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep,
  totalSteps
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex-1">
            <div
              className={`h-2 rounded-full ${
                step <= currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}; 