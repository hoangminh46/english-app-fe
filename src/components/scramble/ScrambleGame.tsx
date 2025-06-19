import React, { useState, useEffect } from 'react';
import { ScrambleWord } from '@/types/quiz';

interface ScrambleGameProps {
  word: ScrambleWord;
  onNext: () => void;
}

export const ScrambleGame: React.FC<ScrambleGameProps> = ({ word, onNext }) => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Reset game state when word changes
    setSelectedLetters([]);
    setShowHint(false);
    setIsCorrect(false);
    // Split scrambled word into array of letters
    setAvailableLetters(word.scrambled.split(''));
  }, [word]);

  const handleLetterSelect = (letter: string, index: number) => {
    if (isCorrect) return; // Prevent further interaction after correct answer

    // Remove letter from available letters
    const newAvailable = [...availableLetters];
    newAvailable[index] = '';
    setAvailableLetters(newAvailable);
    
    // Add letter to selected letters
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    // Check if word is complete
    if (newSelected.join('') === word.word) {
      setIsCorrect(true);
    }
  };

  const handleLetterRemove = (letter: string, index: number) => {
    if (isCorrect) return; // Prevent further interaction after correct answer

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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Hint Section */}
      <div className="mb-8 text-center">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-blue-600 hover:text-blue-800 font-medium"
          disabled={isCorrect}
        >
          {showHint ? 'Ẩn gợi ý' : 'Hiện gợi ý'}
        </button>
        {showHint && (
          <p className="mt-2 text-gray-600 italic">
            {word.hint}
          </p>
        )}
      </div>

      {/* Available Letters */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Chữ cái có sẵn:</h3>
        <div className="flex justify-center gap-2">
          {availableLetters.map((letter, index) => (
            letter && (
              <button
                key={`available-${index}`}
                onClick={() => handleLetterSelect(letter, index)}
                disabled={isCorrect}
                className={`w-12 h-12 flex items-center justify-center text-xl font-bold 
                  bg-blue-100 text-blue-800 rounded-lg shadow-sm 
                  ${!isCorrect ? 'hover:bg-blue-200 transition-colors duration-200' : 'opacity-50 cursor-not-allowed'}
                `}
              >
                {letter}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Selected Letters */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Đáp án của bạn:</h3>
        <div className="flex justify-center gap-2">
          {Array.from({ length: word.word.length }).map((_, index) => {
            const letter = selectedLetters[index];
            return (
              <div
                key={`selected-${index}`}
                className={`w-12 h-12 flex items-center justify-center text-xl font-bold 
                  rounded-lg shadow-sm border-2 
                  ${isCorrect 
                    ? 'bg-green-100 border-green-400'
                    : letter 
                      ? 'bg-white border-blue-400 cursor-pointer hover:bg-gray-50' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                onClick={() => !isCorrect && letter && handleLetterRemove(letter, index)}
              >
                {letter || ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation and Next Button */}
      {isCorrect && (
        <div className="mt-8 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              Chính xác! 🎉
            </h4>
            <p className="text-green-700">
              {word.explanation}
            </p>
          </div>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium 
              hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Câu tiếp theo
          </button>
        </div>
      )}
    </div>
  );
}; 