"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormData, QuizResponse, ScrambleResponse } from "../types/quiz";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { NavigationButtons } from "../components/NavigationButtons";
import { AudienceSelector } from "../components/quiz/AudienceSelector";
import { LanguageSelector } from "../components/quiz/LanguageSelector";
import { QuizCustomizer } from "../components/quiz/QuizCustomizer";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { QuizTypeSelector } from "../components/quiz/QuizTypeSelector";
import { ModeSelector } from "../components/quiz/ModeSelector";
import { PracticeSelector } from "../components/quiz/PracticeSelector";
import { ScrambleCustomizer } from "../components/quiz/ScrambleCustomizer";
import { GrammarSelector } from "../components/quiz/GrammarSelector";
import { getUserPreferences, saveAudience, saveLanguage } from "../utils/userPreferences";
// import { StepIndicator } from "@/components/StepIndicator";

enum AppStep {
  WELCOME = "welcome",
  SETUP = "setup"
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter();
  const [appStep, setAppStep] = useState<AppStep>(AppStep.WELCOME);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    audience: "",
    language: "",
    subtopics: [],
    difficulty: "beginner",
    quantity: 10,
    category: "",
    mainTopic: "",
    timer: 20,
  });

  const [scrambleFormData, setScrambleFormData] = useState<FormData>({
    audience: "",
    language: "",
    subtopics: [],
    difficulty: "beginner",
    quantity: 5,
    category: "",
    mainTopic: "",
    timer: 20,
  });

  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedQuizType, setSelectedQuizType] = useState<'quick' | 'custom' | null>(null);
  const [selectedMode, setSelectedMode] = useState<'quiz' | 'practice' | 'grammar' | null>(null);
  const [selectedPracticeType, setSelectedPracticeType] = useState<'scramble' | null>(null);
  const [selectedGrammarTopic, setSelectedGrammarTopic] = useState<{
    categoryId: string;
    subcategoryId: string;
    topicId: string;
  } | null>(null);
  // const totalSteps = 4; // Tổng số bước trong quy trình

  useEffect(() => {
    // Load user preferences (audience and language)
    const preferences = getUserPreferences();
    if (preferences.audience || preferences.language) {
      setFormData(prev => ({
        ...prev,
        audience: preferences.audience || prev.audience,
        language: preferences.language || prev.language
      }));
      setScrambleFormData(prev => ({
        ...prev,
        audience: preferences.audience || prev.audience,
        language: preferences.language || prev.language
      }));
    }

    const progessState = localStorage.getItem('progessState');
    const quizData = localStorage.getItem('quizData');
    const scrambleData = localStorage.getItem('scrambleData');
    const quizProgress = localStorage.getItem('quizProgress');
    const scrambleProgress = localStorage.getItem('scrambleProgress');
    if (progessState) {
      const state = JSON.parse(progessState);
      setAppStep(AppStep.SETUP);
      setCurrentStep(state.currentStep);
      setSelectedMode(state.selectedMode);
      setSelectedPracticeType(state.selectedPracticeType);
      // Clear the saved state after loading
      localStorage.removeItem('progessState');
    }
    if(quizData){
      localStorage.removeItem('quizData');
    }
    if(scrambleData){
      localStorage.removeItem('scrambleData');
    }
    if(quizProgress){
      localStorage.removeItem('quizProgress');
    }
    if(scrambleProgress){
      localStorage.removeItem('scrambleProgress');
    }
  }, []);

  const generateQuizMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post<QuizResponse>(
        `${API_URL}/api/quiz/generate`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      handleQuizSuccess(data);
    },
    onError: (error) => {
      handleQuizError(error);
    }
  });

  const generateQuickQuizMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post<QuizResponse>(
        `${API_URL}/api/quiz/quick`
      );
      return response.data;
    },
    onSuccess: (data) => {
      handleQuizSuccess(data);
    },
    onError: (error) => {
      handleQuizError(error);
    }
  });

  const generateScrambleMutation = useMutation({
    mutationFn: async (data: { topics: string[], difficulty: string, quantity: number }) => {
      const response = await axios.post<ScrambleResponse>(
        `${API_URL}/api/scramble/generate`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      handleScrambleSuccess(data);
    },
    onError: (error) => {
      handleScrambleError(error);
    }
  });

  const handleQuizSuccess = (data: QuizResponse) => {
    // Xóa dữ liệu câu hỏi cũ và tiến trình làm bài trước khi lưu dữ liệu mới
    localStorage.removeItem('quizProgress');
    localStorage.removeItem('quizData');
    
    // Lưu dữ liệu mới vào localStorage để có thể truy cập ở trang /quiz
    localStorage.setItem('quizData', JSON.stringify(data));
    
    // Đánh dấu đang trong quá trình chuyển trang
    setIsNavigating(true);
    
    // Điều hướng đến trang /quiz
    router.push('/quiz');
  };

  const handleScrambleSuccess = (data: ScrambleResponse) => {
    // Lưu dữ liệu game vào localStorage
    localStorage.setItem('scrambleData', JSON.stringify(data));
    
    // Đánh dấu đang trong quá trình chuyển trang
    setIsNavigating(true);
    
    // Điều hướng đến trang scramble
    router.push('/scramble');
  };

  const handleQuizError = (error: unknown) => {
    // Hiển thị thông báo lỗi
    toast.error("Tạo câu hỏi thất bại, vui lòng thử lại sau!", {
      duration: 3000
    });
    console.error("Error generating quiz:", error);
  };

  const handleScrambleError = (error: unknown) => {
    toast.error("Tạo trò chơi thất bại, vui lòng thử lại sau!", {
      duration: 3000
    });
    console.error("Error generating scramble game:", error);
  };

  const handleStartApp = () => {
    setAppStep(AppStep.SETUP);
  };

  const handleNext = () => {
    if (currentStep === 3) {
      // At mode selection step
      if (selectedMode === 'practice') {
        setCurrentStep((prev) => prev + 1);
      } else if (selectedMode === 'quiz') {
        setCurrentStep((prev) => prev + 1);
      } else if (selectedMode === 'grammar') {
        setCurrentStep((prev) => prev + 1);
      }
    } else if (currentStep === 4) {
      // At quiz type or practice type selection step
      if (selectedMode === 'quiz' && selectedQuizType === 'quick') {
        generateQuickQuizMutation.mutate();
      } else if (selectedMode === 'quiz' && selectedQuizType === 'custom') {
        setCurrentStep((prev) => prev + 1);
      } else if (selectedMode === 'practice' && selectedPracticeType === 'scramble') {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setAppStep(AppStep.WELCOME);
    } else {
      setCurrentStep((prev) => prev - 1);
      // Reset selections when going back
      if (currentStep === 4) {
        setSelectedQuizType(null);
        setSelectedPracticeType(null);
        setSelectedGrammarTopic(null);
      } else if (currentStep === 3) {
        setSelectedMode(null);
      }
    }
  };

  const handleAudienceSelect = (audience: string) => {
    setFormData({ ...formData, audience });
    setScrambleFormData({ ...scrambleFormData, audience });
    // Save to localStorage
    saveAudience(audience);
  };

  const handleLanguageSelect = (language: string) => {
    // When selecting a new language, clear previously selected topics
    setFormData({ ...formData, language, subtopics: [] });
    setScrambleFormData({ ...scrambleFormData, language, subtopics: [] });
    // Save to localStorage
    saveLanguage(language);
  };

  const handleCategorySelect = (categoryName: string) => {
    setFormData({ ...formData, category: categoryName, mainTopic: "", subtopics: [] });
  };

  const handleMainTopicSelect = (topicName: string) => {
    setFormData({ ...formData, mainTopic: topicName, subtopics: [] });
  };

  // Handle topic selection/deselection
  const handleTopicToggle = (topicName: string) => {
    const currentData = selectedMode === 'practice' ? scrambleFormData : formData;
    const setData = selectedMode === 'practice' ? setScrambleFormData : setFormData;
    
    // Check if the topic is already selected
    const isSelected = currentData.subtopics.includes(topicName);
    
    if (isSelected) {
      // If already selected, deselect it
      setData({
        ...currentData,
        subtopics: currentData.subtopics.filter(name => name !== topicName),
      });
    } else {
      // If selecting "Random Topic", clear all other selections
      if (topicName === 'Random Topic') {
        setData({
          ...currentData,
          subtopics: [topicName],
        });
      } 
      // If not "Random Topic" and haven't reached the limit
      else if (currentData.subtopics.length < 3 && !currentData.subtopics.includes('Random Topic')) {
        setData({
          ...currentData,
          subtopics: [...currentData.subtopics, topicName],
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


  const handleDifficultyChange = (difficultyLabel: string) => {
    if (selectedMode === 'practice') {
      setScrambleFormData({ ...scrambleFormData, difficulty: difficultyLabel });
    } else {
      setFormData({ ...formData, difficulty: difficultyLabel });
    }
  };

  const handleQuantityChange = (quantity: number) => {
    if (selectedMode === 'practice') {
      setScrambleFormData({ ...scrambleFormData, quantity });
    } else {
      setFormData({ ...formData, quantity });
    }
  };

  const handleTimerChange = (timer: number) => {
    setScrambleFormData({ ...scrambleFormData, timer });
  };

  const handleSubmit = () => {
    if (selectedMode === 'practice' && selectedPracticeType === 'scramble') {
      // Save formData to localStorage for timer value
      localStorage.setItem('formData', JSON.stringify(scrambleFormData));
      // Gọi API tạo game scramble
      generateScrambleMutation.mutate({
        topics: scrambleFormData.subtopics,
        difficulty: scrambleFormData.difficulty,
        quantity: scrambleFormData.quantity
      });
    } else {
      // Gọi API tạo quiz
      generateQuizMutation.mutate(formData);
    }
  };

  const handleQuizTypeSelect = (type: 'quick' | 'custom') => {
    setSelectedQuizType(type);
  };

  const handleModeSelect = (mode: 'quiz' | 'practice' | 'grammar') => {
    setSelectedMode(mode);
    // Reset subsequent selections when mode changes
    setSelectedQuizType(null);
    setSelectedPracticeType(null);
    setSelectedGrammarTopic(null);
    // Reset formData when changing mode
    if (mode === 'quiz') {
      setFormData({
        audience: formData.audience,
        language: formData.language,
        subtopics: [],
        difficulty: "beginner",
        quantity: 10,
        category: "",
        mainTopic: "",
        timer: 20,
      });
    } else if (mode === 'practice') {
      setScrambleFormData({
        audience: formData.audience,
        language: formData.language,
        subtopics: [],
        difficulty: "beginner",
        quantity: 5,
        category: "",
        mainTopic: "",
        timer: 20,
      });
    }
    // No need to reset formData for grammar mode yet
  };

  const handlePracticeTypeSelect = (type: 'scramble') => {
    setSelectedPracticeType(type);
    // Reset scrambleFormData when selecting practice type
    setScrambleFormData({
      audience: formData.audience,
      language: formData.language,
      subtopics: [],
      difficulty: "beginner",
      quantity: 5,
      category: "",
      mainTopic: "",
      timer: 20,
    });
  };

  const handleGrammarTopicSelect = (categoryId: string, subcategoryId: string, topicId: string) => {
    setSelectedGrammarTopic({ categoryId, subcategoryId, topicId });
  };

  // Update canGoNext conditions
  const canGoNext = 
    (currentStep === 1 && formData.audience) ||
    (currentStep === 2 && formData.language) ||
    (currentStep === 3 && selectedMode) ||
    (currentStep === 4 && (
      (selectedMode === 'quiz' && selectedQuizType) ||
      (selectedMode === 'practice' && selectedPracticeType) ||
      (selectedMode === 'grammar' && selectedGrammarTopic !== null)
    )) ||
    (currentStep === 5 && (
      (selectedMode === 'quiz' && formData.subtopics.length > 0) ||
      (selectedMode === 'practice' && selectedPracticeType === 'scramble' && scrambleFormData.subtopics.length > 0)
    ));

  // Animation variants
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        ease: "easeInOut" 
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
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
        <LoadingOverlay isLoading={generateQuizMutation.isPending || generateQuickQuizMutation.isPending || generateScrambleMutation.isPending || isNavigating} />

        <div className="max-w-3xl mx-auto">
          {/* <StepIndicator currentStep={currentStep} totalSteps={totalSteps} /> */}

          <motion.div 
            className="bg-white shadow-lg rounded-xl p-6 md:p-8 mb-6 border border-blue-100"
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
                  key="mode"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <ModeSelector 
                    onSelectMode={handleModeSelect}
                    selectedMode={selectedMode}
                  />
                </motion.div>
              )}

              {currentStep === 4 && selectedMode === 'quiz' && (
                <motion.div
                  key="quiz-type"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuizTypeSelector 
                    onSelectQuizType={handleQuizTypeSelect}
                    selectedType={selectedQuizType}
                  />
                </motion.div>
              )}

              {currentStep === 4 && selectedMode === 'practice' && (
                <motion.div
                  key="practice-type"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <PracticeSelector 
                    onSelectPracticeType={handlePracticeTypeSelect}
                    selectedType={selectedPracticeType}
                  />
                </motion.div>
              )}

              {currentStep === 4 && selectedMode === 'grammar' && (
                <motion.div
                  key="grammar-selector"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <GrammarSelector 
                    onSelectTopic={handleGrammarTopicSelect}
                    selectedTopic={selectedGrammarTopic?.topicId || null}
                  />
                </motion.div>
              )}

              {currentStep === 5 && selectedMode === 'quiz' && (
                <motion.div
                  key="quiz-customizer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuizCustomizer 
                    formData={formData}
                    onTopicToggle={handleTopicToggle}
                    onRemoveTopic={handleRemoveTopic}
                    onDifficultyChange={handleDifficultyChange}
                    onQuantityChange={handleQuantityChange}
                    onCategorySelect={handleCategorySelect}
                    onMainTopicSelect={handleMainTopicSelect}
                  />
                </motion.div>
              )}

              {currentStep === 5 && selectedMode === 'practice' && selectedPracticeType === 'scramble' && (
                <motion.div
                  key="scramble-customizer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrambleCustomizer 
                    formData={scrambleFormData}
                    onTopicToggle={handleTopicToggle}
                    onDifficultyChange={handleDifficultyChange}
                    onQuantityChange={handleQuantityChange}
                    onTimerChange={handleTimerChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants}>
            <NavigationButtons 
              currentStep={currentStep}
              totalSteps={5}
              canGoNext={canGoNext as boolean}
              isSubmitting={generateQuizMutation.isPending || generateQuickQuizMutation.isPending || generateScrambleMutation.isPending}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
              mode={selectedMode as 'quiz' | 'practice' | undefined}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}