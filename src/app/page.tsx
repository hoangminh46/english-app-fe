// ... existing code ...
"use client";

import { useState } from "react";

// Define data types
type Topic = {
  id: string;
  name: string;
};

type FormData = {
  audience: string;
  language: string;
  topic: string[]; // Store topic names instead of id
  difficulty: string;
  quantity: number;
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    audience: "",
    language: "",
    topic: [],
    difficulty: "intermediate",
    quantity: 10,
  });

  const audiences = ["Học sinh", "Sinh viên", "Người đi làm", "Người cao tuổi"];
  const languages = ["Tiếng Anh", "Tiếng Nhật", "Tiếng Trung"];
  
  // Define topics for each language
  const topicsByLanguage: Record<string, Topic[]> = {
    "Tiếng Anh": [
      { id: "business", name: "Kinh doanh" },
      { id: "travel", name: "Du lịch" },
      { id: "education", name: "Giáo dục" },
      { id: "health", name: "Sức khỏe" },
      { id: "technology", name: "Công nghệ" },
      { id: "daily", name: "Đời sống hàng ngày" },
    ],
    "Tiếng Nhật": [
      { id: "anime", name: "Anime & Manga" },
      { id: "culture", name: "Văn hóa Nhật Bản" },
      { id: "cuisine", name: "Ẩm thực Nhật" },
      { id: "travel_jp", name: "Du lịch Nhật Bản" },
      { id: "business_jp", name: "Kinh doanh với Nhật" },
    ],
    "Tiếng Trung": [
      { id: "culture_cn", name: "Văn hóa Trung Quốc" },
      { id: "business_cn", name: "Kinh doanh với Trung Quốc" },
      { id: "cuisine_cn", name: "Ẩm thực Trung Hoa" },
      { id: "travel_cn", name: "Du lịch Trung Quốc" },
      { id: "history_cn", name: "Lịch sử Trung Hoa" },
    ]
  };
  
  const difficulties = [
    { value: "beginner", label: "Cơ bản" },
    { value: "intermediate", label: "Trung cấp" },
    { value: "advanced", label: "Nâng cao" }
  ];
  const quantityOptions = [10, 15, 20, 25];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleAudienceSelect = (audience: string) => {
    setFormData({ ...formData, audience });
  };

  const handleLanguageSelect = (language: string) => {
    // When selecting a new language, clear previously selected topics
    setFormData({ ...formData, language, topic: [] });
  };

  // Handle topic selection/deselection
  const handleTopicToggle = (topicName: string) => {
    // Check if the topic is already selected
    const isSelected = formData.topic.includes(topicName);
    
    if (isSelected) {
      // If already selected, deselect it
      setFormData({
        ...formData,
        topic: formData.topic.filter(name => name !== topicName)
      });
    } else {
      // If not selected and haven't reached the limit, add it
      if (formData.topic.length < 3) {
        setFormData({
          ...formData,
          topic: [...formData.topic, topicName]
        });
      }
    }
  };

  // Handle removing a topic from the tags below
  const handleRemoveTopic = (topicName: string) => {
    setFormData({
      ...formData,
      topic: formData.topic.filter(name => name !== topicName)
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    setFormData({ ...formData, difficulty });
  };

  const handleQuantityChange = (quantity: number) => {
    setFormData({ ...formData, quantity });
  };

  const handleSubmit = () => {
    console.log({
      language: formData.language,
      quantity: formData.quantity,
      topic: formData.topic, // Topic stored as name
      difficulty: formData.difficulty,
      audience: formData.audience,
    });
  };

  // Get the list of topics based on the selected language
  const availableTopics = formData.language ? topicsByLanguage[formData.language] || [] : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1">
                <div
                  className={`h-2 rounded-full ${
                    step <= currentStep
                      ? "bg-blue-600"
                      : "bg-gray-200"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bạn là ai?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {audiences.map((audience) => (
                  <button
                    key={audience}
                    type="button"
                    className={`p-4 border rounded-lg flex items-center justify-center transition-all ${
                      formData.audience === audience
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleAudienceSelect(audience)}
                  >
                    {audience}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Bạn muốn học ngôn ngữ gì?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    className={`p-4 border rounded-lg flex items-center justify-center transition-all ${
                      formData.language === language
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleLanguageSelect(language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Tùy chỉnh bộ câu hỏi
              </h2>
              
              {/* Topic selection - Custom UI */}
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Chọn chủ đề {formData.language} (tối đa 3)
                </h3>
                {availableTopics.length > 0 ? (
                  <div className="space-y-4">
                    <div className="border rounded-lg bg-white overflow-auto max-h-[240px] shadow-sm">
                      {availableTopics.map((topic) => {
                        const isSelected = formData.topic.includes(topic.name);
                        const isDisabled = formData.topic.length >= 3 && !isSelected;
                        return (
                          <div 
                            key={topic.id}
                            onClick={() => !isDisabled && handleTopicToggle(topic.name)}
                            className={`p-4 border-b last:border-b-0 flex items-center justify-between cursor-pointer transition-all ${
                              isDisabled 
                                ? "bg-gray-50 opacity-75 cursor-not-allowed"
                                : isSelected 
                                  ? "bg-blue-50 border-blue-100" 
                                  : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 flex items-center justify-center rounded border mr-3 ${
                                isSelected 
                                  ? "bg-blue-600 border-blue-600 text-white" 
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
                      <div className="text-sm font-medium text-blue-600">
                        Đã chọn: {formData.topic.length}/3
                      </div>
                      {formData.topic.length > 0 && (
                        <button 
                          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => setFormData({...formData, topic: []})}
                        >
                          Xóa tất cả
                        </button>
                      )}
                    </div>
                    
                    {formData.topic.length > 0 && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="text-sm text-gray-500 mb-2">Chủ đề đã chọn:</div>
                        <div className="flex flex-wrap gap-2">
                          {formData.topic.map((topicName) => (
                            <div 
                              key={topicName} 
                              className="px-3 py-1.5 bg-white border border-blue-200 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1 shadow-sm"
                            >
                              <span>{topicName}</span>
                              <button 
                                type="button" 
                                className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveTopic(topicName);
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
              
              {/* Difficulty selection */}
              <div>
                <h3 className="text-lg font-medium mb-3">Độ khó</h3>
                <div className="flex flex-wrap gap-3">
                  {difficulties.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={`px-4 py-2 rounded-full transition-all ${
                        formData.difficulty === item.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleDifficultyChange(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity selection */}
              <div>
                <h3 className="text-lg font-medium mb-3">Số lượng câu hỏi</h3>
                <div className="flex flex-wrap gap-3">
                  {quantityOptions.map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                        formData.quantity === qty
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => handleQuantityChange(qty)}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Quay lại
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.audience) ||
                (currentStep === 2 && !formData.language)
              }
              className={`px-6 py-2 rounded-lg ${
                (currentStep === 1 && !formData.audience) ||
                (currentStep === 2 && !formData.language)
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Tiếp theo
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={formData.topic.length === 0}
              className={`px-6 py-2 rounded-lg ${
                formData.topic.length === 0
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Tạo bộ câu hỏi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}