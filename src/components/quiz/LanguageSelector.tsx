import React from 'react';
import { languages } from '../../types/quiz';

type LanguageSelectorProps = {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Bạn muốn học ngôn ngữ gì?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.map((language) => (
          <button
            key={language}
            type="button"
            className={`p-4 border rounded-lg flex items-center justify-center transition-all shadow-sm ${
              selectedLanguage === language
                ? "border-blue-400 bg-gradient-to-r from-blue-400/10 to-blue-600/10 text-blue-600 shadow-md"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            }`}
            onClick={() => onSelectLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}; 