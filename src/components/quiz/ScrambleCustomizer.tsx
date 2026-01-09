import { FormData, difficulties } from '@/types/quiz';
import { Button } from '@/components/ui/Button';

interface ScrambleCustomizerProps {
  formData: FormData;
  onDifficultyChange: (difficulty: string) => void;
  onQuantityChange: (quantity: number) => void;
  onTopicToggle: (topic: string) => void;
  onTimerChange: (seconds: number) => void;
}

export const ScrambleCustomizer: React.FC<ScrambleCustomizerProps> = ({
  formData,
  onDifficultyChange,
  onQuantityChange,
  onTopicToggle,
  onTimerChange,
}) => {
  const topics = [
    { value: 'Random Topic', label: 'Chủ đề ngẫu nhiên' },
    { value: 'Family', label: 'Gia đình' },
    { value: 'Work', label: 'Công việc' },
    { value: 'Travel', label: 'Du lịch' },
    { value: 'Education', label: 'Giáo dục' },
    { value: 'Sports', label: 'Thể thao' },
    { value: 'Entertainment', label: 'Giải trí' },
    { value: 'Fashion', label: 'Thời trang' },
    { value: 'Food', label: 'Ẩm thực' },
    { value: 'Technology', label: 'Công nghệ' },
    { value: 'Environment', label: 'Môi trường' },
    { value: 'Health', label: 'Sức khỏe' }
  ];

  const isRandomSelected = formData.subtopics.includes('Random Topic');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tùy chỉnh Word Scramble</h2>
        <p className="text-gray-600 mb-6">
          Chọn chủ đề và độ khó cho trò chơi
        </p>
      </div>

      {/* Topics Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Chọn chủ đề (tối đa 3)</h3>
          {formData.subtopics.length > 0 && (
            <span className="text-sm text-gray-500">
              Đã chọn: {formData.subtopics.length}/3
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {topics.map((topic) => {
            const isSelected = formData.subtopics.includes(topic.value);
            const isDisabled = !isSelected && 
              ((formData.subtopics.length >= 3) || 
              (isRandomSelected) || 
              (topic.value !== 'Random Topic' && isRandomSelected));

            return (
              <Button
                key={topic.value}
                onClick={() => onTopicToggle(topic.value)}
                disabled={isDisabled}
                variant={isSelected ? 'primary' : 'gray'}
                size="sm"
                className="h-11"
              >
                {topic.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Độ khó</h3>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty.value}
              onClick={() => onDifficultyChange(difficulty.value)}
              variant={formData.difficulty === difficulty.value ? 'primary' : 'gray'}
              size="sm"
              className="h-11"
            >
              {difficulty.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Số lượng từ</h3>
        <div className="grid grid-cols-4 gap-3">
          {[5, 10, 15, 20].map((quantity) => (
            <Button
              key={quantity}
              onClick={() => onQuantityChange(quantity)}
              variant={formData.quantity === quantity ? 'primary' : 'gray'}
              size="sm"
              className="h-11"
            >
              {quantity}
            </Button>
          ))}
        </div>
      </div>

      {/* Timer Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Thời gian trả lời (giây)</h3>
        <div className="grid grid-cols-4 gap-3">
          {[20, 25, 30, 45].map((seconds) => (
            <Button
              key={seconds}
              onClick={() => onTimerChange(seconds)}
              variant={formData.timer === seconds ? 'primary' : 'gray'}
              size="sm"
              className="h-11"
            >
              {seconds}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}; 