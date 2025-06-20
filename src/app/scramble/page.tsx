"use client";

import React, { useEffect, useState } from 'react';
import { ScrambleWord, ScrambleResponse, FormData } from '@/types/quiz';
import { GameComplete } from '@/components/scramble/GameComplete';

export default function ScramblePage() {
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
      setTimeLeft(timer);
    }
  }, []);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy dữ liệu trò chơi
          </h1>
          <p className="text-gray-600">
            Vui lòng quay lại trang chủ để bắt đầu trò chơi mới.
          </p>
        </div>
      </div>
    );
  }

  // Show game complete screen
  if (isGameComplete) {
    return <GameComplete score={score} totalWords={words.length} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-6 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Word Scramble
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
            />
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50">
            <div className="p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Từ</div>
              <div className="font-semibold">
                <span className="text-blue-600">{currentWordIndex + 1}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-600">{words.length}</span>
              </div>
            </div>
            <div className="p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Điểm</div>
              <div className="font-semibold">
                <span className="text-green-600">{score}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-600">{words.length}</span>
              </div>
            </div>
            <div className="p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Thời gian</div>
              <div className={`font-semibold ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                {timeLeft}s
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Hint Section */}
            <div className="mb-8 text-center">
              <button
                onClick={() => setShowHint(true)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all
                  ${showHint 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-blue-600 hover:bg-blue-50'}`}
                disabled={isCorrect || showAnswer}
              >
                {showHint ? 'Gợi ý' : 'Hiện gợi ý'}
              </button>
              {showHint && (
                <p className="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  {words[currentWordIndex].hint}
                </p>
              )}
            </div>

            {/* Selected Letters */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-700">Đáp án của bạn</h3>
                <button
                  onClick={handleReset}
                  disabled={isCorrect || showAnswer}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors
                    ${isCorrect || showAnswer
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                >
                  Đặt lại
                </button>
              </div>
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: words[currentWordIndex].word.length }).map((_, index) => {
                  const letter = selectedLetters[index];
                  return (
                    <div
                      key={`selected-${index}`}
                      className={`w-10 h-10 flex items-center justify-center text-lg font-bold 
                        rounded-lg transition-all duration-200
                        ${isCorrect 
                          ? 'bg-green-100 border-2 border-green-400 transform scale-105'
                          : showAnswer
                            ? 'bg-red-100 border-2 border-red-400'
                            : letter 
                              ? 'bg-white border-2 border-blue-400 cursor-pointer hover:bg-gray-50 hover:scale-105' 
                              : 'bg-gray-50 border-2 border-gray-200'
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
              <div className={`mb-8 rounded-xl p-4 border ${
                isCorrect 
                  ? 'bg-green-50 border-green-100' 
                  : 'bg-red-50 border-red-100'
              }`}>
                <div className="flex items-center mb-2">
                  {isCorrect ? (
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <h4 className={`text-sm font-semibold ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {isCorrect ? 'Chính xác!' : 'Hết thời gian!'}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Đáp án: <span className="font-bold">{words[currentWordIndex].word}</span>
                </p>
                <p className="text-xs text-gray-600">
                  {words[currentWordIndex].explanation}
                </p>
              </div>
            )}

            {/* Available Letters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Chọn chữ cái</h3>
              <div className="flex justify-center flex-wrap gap-1.5">
                {availableLetters.map((letter, index) => (
                  <div
                    key={`available-${index}`}
                    className={`w-10 h-10 flex items-center justify-center text-lg font-bold 
                      rounded-lg transition-all duration-200
                      ${!letter 
                        ? 'bg-gray-100 border-2 border-gray-200' 
                        : isCorrect || showAnswer
                          ? 'bg-gray-100 border-2 border-gray-200 cursor-not-allowed'
                          : 'bg-white border-2 border-blue-400 cursor-pointer hover:bg-blue-50 hover:scale-105'
                      }`}
                    onClick={() => letter && handleLetterSelect(letter, index)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            {(isCorrect || showAnswer) && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full
                    hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                >
                  {currentWordIndex < words.length - 1 ? 'Tiếp tục' : 'Kết thúc'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 