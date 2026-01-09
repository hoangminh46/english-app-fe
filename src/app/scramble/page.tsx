"use client";

import React, { useEffect, useState } from 'react';
import { ScrambleWord, ScrambleResponse, FormData, ScrambleProgress } from '@/types/quiz';
import { GameComplete } from '@/components/scramble/GameComplete';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function ScramblePage() {
  const router = useRouter();
  const [words, setWords] = useState<ScrambleWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    // Load game data from localStorage
    const savedData = localStorage.getItem('scrambleData');
    const formData = localStorage.getItem('formData');
    if (savedData && formData) {
      const gameData: ScrambleResponse = JSON.parse(savedData);
      const { timer = 20 } = JSON.parse(formData) as FormData;
      setWords(gameData.words);
      
      // Khôi phục tiến độ nếu có
      const savedProgress = localStorage.getItem('scrambleProgress');
      if (savedProgress) {
        const progress: ScrambleProgress = JSON.parse(savedProgress);
        setCurrentWordIndex(progress.currentWordIndex);
        setScore(progress.score);
        setSelectedLetters(progress.selectedLetters);
        setAvailableLetters(progress.availableLetters);
        setShowHint(progress.showHint);
        setIsCorrect(progress.isCorrect);
        setTimeLeft(progress.timeLeft);
        setShowAnswer(progress.showAnswer);
        setIsGameComplete(progress.isGameComplete);
      } else {
        setTimeLeft(timer);
      }
    } else {
      router.push('/');
    }
  }, [router]);

  // Lưu tiến độ mỗi khi có thay đổi
  useEffect(() => {
    if (!words.length) return;
    
    const progress: ScrambleProgress = {
      currentWordIndex,
      score,
      selectedLetters,
      availableLetters,
      showHint,
      isCorrect,
      timeLeft,
      showAnswer,
      isGameComplete
    };
    
    localStorage.setItem('scrambleProgress', JSON.stringify(progress));
  }, [currentWordIndex, score, selectedLetters, availableLetters, showHint, isCorrect, timeLeft, showAnswer, isGameComplete, words]);

  useEffect(() => {
    // Reset game state when word changes
    setSelectedLetters([]);
    setShowHint(false);
    setIsCorrect(false);
    setShowAnswer(false);
    // Reset timer
    const formData = localStorage.getItem('formData');
    if (formData) {
      const { timer = 20 } = JSON.parse(formData) as FormData;
      setTimeLeft(timer);
    }
    // Split scrambled word into array of letters
    if (words[currentWordIndex]) {
      setAvailableLetters(words[currentWordIndex].scrambled.split(''));
    }
  }, [currentWordIndex, words]);

  // Timer effect
  useEffect(() => {
    if (isCorrect || showAnswer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCorrect, showAnswer]);

  const handleLetterSelect = (letter: string, index: number) => {
    if (isCorrect || showAnswer) return;

    // Remove letter from available letters
    const newAvailable = [...availableLetters];
    newAvailable[index] = '';
    setAvailableLetters(newAvailable);
    
    // Add letter to selected letters
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    // Check if word is complete
    if (newSelected.join('') === words[currentWordIndex].word) {
      setIsCorrect(true);
      setScore(prev => prev + 1);
    }
  };

  const handleLetterRemove = (letter: string, index: number) => {
    if (isCorrect || showAnswer) return;

    // Remove letter from selected letters
    const newSelected = [...selectedLetters];
    newSelected.splice(index, 1);
    setSelectedLetters(newSelected);

    // Add letter back to first empty spot in available letters
    const newAvailable = [...availableLetters];
    const emptyIndex = newAvailable.findIndex(l => l === '');
    if (emptyIndex !== -1) {
      newAvailable[emptyIndex] = letter;
    }
    setAvailableLetters(newAvailable);
  };

  const handleNext = () => {
    // Move to next word or complete game
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setIsGameComplete(true);
      // Xóa tiến độ khi hoàn thành game
      localStorage.removeItem('scrambleProgress');
    }
  };

  const handleReset = () => {
    if (isCorrect || showAnswer) return;
    // Reset selected letters
    setSelectedLetters([]);
    // Reset available letters to original scrambled word
    if (words[currentWordIndex]) {
      setAvailableLetters(words[currentWordIndex].scrambled.split(''));
    }
  };

  if (words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-blue-100">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Không tìm thấy dữ liệu trò chơi
          </h1>
          <p className="text-blue-600 mb-6">
            Vui lòng quay lại trang chủ để bắt đầu trò chơi mới.
          </p>
          <Button
            onClick={() => router.push('/')}
            size="lg"
            className="px-8"
          >
            Về trang chủ
          </Button>
        </div>
      </div>
    );
  }

  // Show game complete screen
  if (isGameComplete) {
    return <GameComplete score={score} totalWords={words.length} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 border border-blue-100">

          {/* Game Stats */}
          <div className="grid grid-cols-3 divide-x divide-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl mb-6">
            <div className="p-4 text-center">
              <div className="text-xs text-blue-600 mb-1 font-medium">Điểm số</div>
              <div className="font-bold text-lg">
                <span className="text-emerald-600">{score}</span>
                <span className="text-blue-400 mx-1">/</span>
                <span className="text-blue-700">{words.length}</span>
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-xs text-blue-600 mb-1 font-medium">Thời gian</div>
              <div className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                {timeLeft}s
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="text-xs text-blue-600 mb-1 font-medium">Tiến độ</div>
              <div className="font-bold text-lg text-blue-600">
                {Math.round(((currentWordIndex + 1) / words.length) * 100)}%
              </div>
            </div>
          </div>

          <div className="border-2 border-blue-200 rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-inner">
            {/* Hint Section */}
            <div className="mb-6 text-center">
              {!showHint && (
                <Button
                  onClick={() => setShowHint(true)}
                  size="sm"
                  disabled={isCorrect || showAnswer}
                >
                  Hiện gợi ý
                </Button>
              )}
              {showHint && (
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl shadow-lg">
                  <div className="flex items-start">
                    <div className="mr-3 bg-gradient-to-r from-emerald-400 to-green-500 p-2 rounded-full flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold text-emerald-900 text-sm">Gợi ý:</h4>
                      <p className="text-emerald-800 text-sm leading-relaxed font-medium">{words[currentWordIndex].hint}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Letters */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-blue-800">Đáp án của bạn</h3>
                <Button
                  onClick={handleReset}
                  variant="secondary"
                  size="sm"
                  disabled={isCorrect || showAnswer}
                >
                  Đặt lại
                </Button>
              </div>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {Array.from({ length: words[currentWordIndex].word.length }).map((_, index) => {
                  const letter = selectedLetters[index];
                  return (
                    <div
                      key={`selected-${index}`}
                      className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-lg font-bold 
                        rounded-lg transition-all duration-200 shadow-sm hover:shadow-md
                        ${isCorrect 
                          ? 'bg-emerald-100 border-2 border-emerald-400 transform scale-105 text-emerald-800'
                          : showAnswer
                            ? 'bg-red-100 border-2 border-red-400 text-red-800'
                            : letter 
                              ? 'bg-white border-2 border-blue-400 cursor-pointer hover:bg-blue-50 hover:scale-105 text-blue-800' 
                              : 'bg-gray-100 border-2 border-gray-300 text-gray-500'
                        }`}
                      onClick={() => !isCorrect && !showAnswer && letter && handleLetterRemove(letter, index)}
                    >
                      {letter || ''}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Show Answer Section */}
            {(showAnswer || isCorrect) && (
              <div className={`mb-6 rounded-xl overflow-hidden border-2 shadow-lg ${
                isCorrect 
                  ? 'border-emerald-400 bg-white' 
                  : 'border-red-400 bg-white'
              }`}>
                {/* Header with Status */}
                <div className={`px-4 py-2.5 ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}>
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <svg className="w-5 h-5 stroke-white" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 stroke-white" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <h4 className="text-white font-bold text-sm">
                      {isCorrect ? 'Chính xác!' : 'Hết thời gian!'}
                    </h4>
                  </div>
                </div>

                {/* Content */}
                <div className="py-2 px-4 pb-4 bg-white">
                  {/* Word and Pronunciation */}
                  <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-bold text-2xl uppercase tracking-wide text-blue-900">
                          {words[currentWordIndex].word}
                        </span>
                        <span className="text-sm italic text-blue-600">
                        {words[currentWordIndex].explanation.pronunciation}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wider w-fit bg-blue-100 text-blue-700">
                          {words[currentWordIndex].explanation.partOfSpeech}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-1 h-4 rounded-full ${
                        isCorrect 
                          ? 'bg-gradient-to-b from-emerald-500 to-emerald-600' 
                          : 'bg-gradient-to-b from-red-500 to-red-600'
                      }`}></div>
                      <p className="text-sm font-bold text-gray-800">Ý nghĩa:</p>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {words[currentWordIndex].explanation.meaning}
                      </p>
                    </div>
                  </div>

                  {/* Example */}
                  <div className={`rounded-lg p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 ${
                    isCorrect ? 'border-emerald-500' : 'border-red-500'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1 h-4 rounded-full ${
                        isCorrect 
                          ? 'bg-gradient-to-b from-emerald-500 to-emerald-600' 
                          : 'bg-gradient-to-b from-red-500 to-red-600'
                      }`}></div>
                      <p className="text-sm font-bold text-gray-800">Ví dụ:</p>
                    </div>
                    <div className="ml-3 space-y-1.5">
                      <p className="text-sm italic leading-relaxed text-gray-800">
                        &ldquo;{words[currentWordIndex].explanation.example}&rdquo;
                      </p>
                      <div className="flex items-start gap-2">
                        <span className={`font-bold text-sm ${
                          isCorrect ? 'text-emerald-600' : 'text-red-600'
                        }`}>→</span>
                        <p className="text-sm leading-relaxed flex-1 text-gray-700">
                          {words[currentWordIndex].explanation.exampleTranslation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Available Letters */}
            {(!showAnswer && !isCorrect) && (
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-4">Chọn chữ cái</h3>
                <div className="flex justify-center flex-wrap gap-1.5">
                  {availableLetters.map((letter, index) => (
                    <div
                      key={`available-${index}`}
                      className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-lg font-bold 
                        rounded-lg transition-all duration-200 shadow-sm hover:shadow-md
                        ${!letter 
                          ? 'bg-gray-100 border-2 border-gray-300 text-gray-400' 
                          : isCorrect || showAnswer
                            ? 'bg-gray-100 border-2 border-gray-300 cursor-not-allowed text-gray-400'
                            : 'bg-white border-2 border-blue-400 cursor-pointer hover:bg-blue-50 hover:scale-105 text-blue-800'
                        }`}
                      onClick={() => letter && handleLetterSelect(letter, index)}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Button */}
            {(isCorrect || showAnswer) && (
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleNext}
                  size="xl"
                  fullWidth
                  className="sm:w-auto px-12"
                >
                  {currentWordIndex < words.length - 1 ? 'Tiếp tục' : 'Kết thúc'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 