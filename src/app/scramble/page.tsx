"use client";

import { useEffect, useState } from 'react';
import { ScrambleWord, ScrambleResponse } from '@/types/quiz';
import { ScrambleGame } from '@/components/scramble/ScrambleGame';

export default function ScramblePage() {
  const [words, setWords] = useState<ScrambleWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Load game data from localStorage
    const savedData = localStorage.getItem('scrambleData');
    if (savedData) {
      const gameData: ScrambleResponse = JSON.parse(savedData);
      setWords(gameData.words);
    }
  }, []);

  const handleNext = () => {
    // Increment score
    setScore(prev => prev + 1);

    // Move to next word
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Word Scramble
          </h1>
          <div className="flex justify-center gap-8">
            <div className="text-lg font-medium text-gray-700">
              Từ: {currentWordIndex + 1}/{words.length}
            </div>
            <div className="text-lg font-medium text-gray-700">
              Điểm: {score}
            </div>
          </div>
        </div>

        {/* Game */}
        {currentWordIndex < words.length && (
          <ScrambleGame
            word={words[currentWordIndex]}
            onNext={handleNext}
          />
        )}

        {/* Game Complete */}
        {currentWordIndex === words.length - 1 && score === words.length && (
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎉 Chúc mừng! 🎉
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Bạn đã hoàn thành trò chơi với số điểm: {score}/{words.length}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Chơi lại
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 