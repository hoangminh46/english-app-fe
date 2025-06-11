"use client";

import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormData, QuizResponse } from "../types/quiz";
import { StepIndicator } from "../components/StepIndicator";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { NavigationButtons } from "../components/NavigationButtons";
import { AudienceSelector } from "../components/quiz/AudienceSelector";
import { LanguageSelector } from "../components/quiz/LanguageSelector";
import { QuizCustomizer } from "../components/quiz/QuizCustomizer";
import { motion, AnimatePresence } from "framer-motion";

// Định nghĩa các bước trong ứng dụng
enum AppStep {
  WELCOME = "welcome",
  SETUP = "setup" // Các bước tạo quiz: audience, language, customizer
}

export default function Home() {
  const router = useRouter();
  const [appStep, setAppStep] = useState<AppStep>(AppStep.WELCOME);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    audience: "",
    language: "",
    subtopics: [],
    difficulty: "Trung cấp",
    quantity: 10,
    category: "",
    mainTopic: "",
  });
  const [isNavigating, setIsNavigating] = useState(false);

  // Sử dụng react-query để gọi API
  const generateQuizMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post<QuizResponse>(
        "http://localhost:5000/api/generate-quiz",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Xóa dữ liệu câu hỏi cũ và tiến trình làm bài trước khi lưu dữ liệu mới
      localStorage.removeItem('quizProgress');
      localStorage.removeItem('quizData');
      
      // Lưu dữ liệu mới vào localStorage để có thể truy cập ở trang /quiz
      localStorage.setItem('quizData', JSON.stringify(data));
      
      // Đánh dấu đang trong quá trình chuyển trang
      setIsNavigating(true);
      
      // Điều hướng đến trang /quiz
      router.push('/quiz');
    },
    onError: (error) => {
      // Hiển thị thông báo lỗi
      toast.error("Tạo câu hỏi thất bại, vui lòng thử lại sau!", {
        duration: 3000
      });
      console.error("Error generating quiz:", error);
    }
  });

  const handleStartApp = () => {
    setAppStep(AppStep.SETUP);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      // Quay lại màn hình chào mừng nếu đang ở bước 1
      setAppStep(AppStep.WELCOME);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAudienceSelect = (audience: string) => {
    setFormData({ ...formData, audience });
  };

  const handleLanguageSelect = (language: string) => {
    // When selecting a new language, clear previously selected topics
    setFormData({ ...formData, language, subtopics: [] });
  };

  const handleCategorySelect = (categoryName: string) => {
    setFormData({ ...formData, category: categoryName, mainTopic: "", subtopics: [] });
  };

  const handleMainTopicSelect = (topicName: string) => {
    setFormData({ ...formData, mainTopic: topicName, subtopics: [] });
  };

  // Handle topic selection/deselection
  const handleTopicToggle = (topicName: string) => {
    // Check if the topic is already selected
    const isSelected = formData.subtopics.includes(topicName);
    
    if (isSelected) {
      // If already selected, deselect it
      setFormData({
        ...formData,
        subtopics: formData.subtopics.filter(name => name !== topicName),
      });
    } else {
      // If not selected and haven't reached the limit, add it
      if (formData.subtopics.length < 3) {
        setFormData({
          ...formData,
          subtopics: [...formData.subtopics, topicName],
        });
      }
    }
  };

  // Handle removing a topic from the tags below
  const handleRemoveTopic = (topicName: string) => {
    setFormData({
      ...formData,
      subtopics: formData.subtopics.filter(name => name !== topicName)
    });
  };

  const handleClearAllTopics = () => {
    setFormData({
      ...formData,
      subtopics: []
    });
  };

  const handleDifficultyChange = (difficultyLabel: string) => {
    setFormData({ ...formData, difficulty: difficultyLabel });
  };

  const handleQuantityChange = (quantity: number) => {
    setFormData({ ...formData, quantity });
  };

  const handleSubmit = () => {
    // Gọi API thông qua mutation
    generateQuizMutation.mutate(formData);
  };

  // Xác định nút Next có được kích hoạt hay không
  const canGoNext = 
    (currentStep === 1 && formData.audience) ||
    (currentStep === 2 && formData.language) ||
    (currentStep === 3 && formData.subtopics.length > 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: { ease: "easeInOut" }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Màn hình chào mừng
  if (appStep === AppStep.WELCOME) {
    return (
      <AnimatePresence mode="wait">
        <motion.div 
          key="welcome"
          className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={itemVariants}
            >
              Chào mừng đến với Mine
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-10"
              variants={itemVariants}
            >
              Trang web giúp bạn nâng cao kỹ năng ngôn ngữ qua các bài tập thú vị!
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handleStartApp}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                Bắt đầu ngay
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="setup"
        className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        exit="exit" 
        variants={containerVariants}
      >
        {/* Loading Overlay */}
        <LoadingOverlay isLoading={generateQuizMutation.isPending || isNavigating} />

        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={currentStep} totalSteps={3} />

          <motion.div 
            className="bg-white shadow-lg rounded-xl p-8 mb-6 border border-blue-100"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="audience"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <AudienceSelector 
                    selectedAudience={formData.audience} 
                    onSelectAudience={handleAudienceSelect} 
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <LanguageSelector 
                    selectedLanguage={formData.language} 
                    onSelectLanguage={handleLanguageSelect} 
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="customizer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuizCustomizer 
                    formData={formData}
                    onTopicToggle={handleTopicToggle}
                    onRemoveTopic={handleRemoveTopic}
                    onClearAllTopics={handleClearAllTopics}
                    onDifficultyChange={handleDifficultyChange}
                    onQuantityChange={handleQuantityChange}
                    onCategorySelect={handleCategorySelect}
                    onMainTopicSelect={handleMainTopicSelect}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants}>
            <NavigationButtons 
              currentStep={currentStep}
              totalSteps={3}
              canGoNext={canGoNext as boolean}
              isSubmitting={generateQuizMutation.isPending}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}