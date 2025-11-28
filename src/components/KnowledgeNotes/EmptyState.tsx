'use client';

import { NoteType } from '../../types/notes';

interface EmptyStateProps {
  type: NoteType;
}

const emptyMessages = {
  vocabulary: {
    icon: '📚',
    title: 'Chưa có từ vựng nào',
    description: 'Thêm những từ vựng quan trọng mà bạn muốn ghi nhớ',
  },
  formula: {
    icon: '📐',
    title: 'Chưa có công thức nào',
    description: 'Lưu lại các công thức ngữ pháp và cấu trúc câu',
  },
  other: {
    icon: '📝',
    title: 'Chưa có ghi chú nào',
    description: 'Ghi chú những kiến thức bổ ích khác',
  },
};

export function EmptyState({ type }: EmptyStateProps) {
  const message = emptyMessages[type];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center min-h-[250px]">
      <div className="text-5xl sm:text-6xl mb-4">{message.icon}</div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
        {message.title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 max-w-sm">{message.description}</p>
    </div>
  );
}

