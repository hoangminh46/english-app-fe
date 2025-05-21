import React from 'react';
import { audiences } from '../../types/quiz';

type AudienceSelectorProps = {
  selectedAudience: string;
  onSelectAudience: (audience: string) => void;
};

export const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  selectedAudience,
  onSelectAudience
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Bạn là ai?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audiences.map((audience) => (
          <button
            key={audience}
            type="button"
            className={`p-4 border rounded-lg flex items-center justify-center transition-all shadow-sm ${
              selectedAudience === audience
                ? "border-blue-400 bg-gradient-to-r from-blue-400/10 to-blue-600/10 text-blue-600 shadow-md"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
            onClick={() => onSelectAudience(audience)}
          >
            {audience}
          </button>
        ))}
      </div>
    </div>
  );
}; 