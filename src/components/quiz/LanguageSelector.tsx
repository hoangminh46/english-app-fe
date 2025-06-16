import React from 'react';
import { languages } from '../../types/quiz';
import Image from 'next/image';

type LanguageInfo = {
  [key in typeof languages[number]]: {
    imagePath: string;
    code: string;
    isSupported: boolean;
  }
}

const languageInfo: LanguageInfo = {
  "Tiếng Anh": {
    imagePath: "/images/england.png",
    code: "GB",
    isSupported: true
  },
  "Tiếng Nhật": {
    imagePath: "/images/japan.png",
    code: "JP",
    isSupported: false
  },
  "Tiếng Trung": {
    imagePath: "/images/china.png",
    code: "CN",
    isSupported: false
  }
};

type LanguageSelectorProps = {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
};

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
          Bạn muốn học ngôn ngữ gì?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Chọn ngôn ngữ bạn muốn cải thiện
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {languages.map((language) => (
          <button
            key={language}
            type="button"
            disabled={!languageInfo[language].isSupported}
            className={`group p-4 border rounded-lg transition-all duration-300 flex items-center justify-between ${
              selectedLanguage === language
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : languageInfo[language].isSupported
                ? "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                : "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
            }`}
            onClick={() => languageInfo[language].isSupported && onSelectLanguage(language)}
          >
            <div className="flex items-center">
              <div className={`relative w-8 h-8 mr-3 rounded-lg overflow-hidden`}>
                <Image
                  src={languageInfo[language].imagePath}
                  alt={`${language} icon`}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-medium">
                {language}
              </span>
            </div>
            {!languageInfo[language].isSupported && (
              <span className="text-sm text-gray-500 italic">
                đang phát triển
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}; 