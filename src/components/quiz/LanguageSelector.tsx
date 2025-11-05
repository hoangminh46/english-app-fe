import React from 'react';
import { languages } from '../../types/quiz';
import Image from 'next/image';

type LanguageInfo = {
  [key: string]: {
    imagePath: string;
    code: string;
    description: string;
    isSupported: boolean;
  }
}

const languageInfo: LanguageInfo = {
  "english": {
    imagePath: "/images/england.png",
    code: "GB",
    description: "Ngôn ngữ được sử dụng nhiều nhất",
    isSupported: true
  },
  "japanese": {
    imagePath: "/images/japan.png",
    code: "JP",
    description: "Đang phát triển",
    isSupported: false
  },
  "chinese": {
    imagePath: "/images/china.png",
    code: "CN",
    description: "Đang phát triển",
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
          Chọn ngôn ngữ
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Chọn ngôn ngữ bạn muốn cải thiện
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {languages.map((language) => (
          <button
            key={language.value}
            type="button"
            disabled={!languageInfo[language.value].isSupported}
            className={`group p-4 sm:p-6 border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              selectedLanguage === language.value
                ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg"
                : languageInfo[language.value].isSupported
                ? "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                : "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
            }`}
            onClick={() => languageInfo[language.value].isSupported && onSelectLanguage(language.value)}
          >
            <div className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-4">
              <div className="relative w-8 h-8">
                <Image
                  src={languageInfo[language.value].imagePath}
                  alt={`${language.label} icon`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex-1 sm:flex-none text-left sm:text-center">
                <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 ${
                  selectedLanguage === language.value ? "text-blue-600" : "text-gray-800"
                }`}>
                  {language.label}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {languageInfo[language.value].description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 