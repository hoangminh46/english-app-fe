'use client';

import { useState, useEffect } from 'react';
import { NoteFormData, KnowledgeNote, NoteType } from '../../types/notes';
import { Button } from '../ui/Button';

interface NoteFormProps {
  onSubmit: (data: NoteFormData) => void | Promise<void>;
  onCancel: () => void;
  editingNote?: KnowledgeNote | null;
  isSubmitting?: boolean;
  defaultType?: NoteType;
}

export function NoteForm({ onSubmit, onCancel, editingNote, isSubmitting = false, defaultType = 'vocabulary' }: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>({
    category: defaultType,
    title: '',
    content: '',
    example: '',
    isLearned: false,
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        category: editingNote.category,
        title: editingNote.title,
        content: editingNote.content,
        example: editingNote.example || '',
        isLearned: editingNote.isLearned,
      });
    } else {
      setFormData(prev => ({ ...prev, category: defaultType }));
    }
  }, [editingNote, defaultType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      category: defaultType,
      title: '',
      content: '',
      example: '',
      isLearned: false,
    });
  };

  const typeOptions = [
    { value: 'vocabulary', label: 'Từ vựng' },
    { value: 'formula', label: 'Công thức' },
    { value: 'other', label: 'Khác' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="mb-2.5 sm:mb-3">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as NoteType })}
          className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          required
          disabled={!!editingNote}
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2.5 sm:mb-3">
        <input
          type="text"
          placeholder="Tiêu đề..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-2.5 sm:mb-3">
        <textarea
          placeholder="Nội dung..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          required
        />
      </div>

      <div className="mb-2.5 sm:mb-3">
        <textarea
          placeholder="Ví dụ (tùy chọn)..."
          value={formData.example}
          onChange={(e) => setFormData({ ...formData, example: e.target.value })}
          className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={2}
        />
      </div>

      {editingNote && (
        <div className="mb-2.5 sm:mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isLearned}
              onChange={(e) => setFormData({ ...formData, isLearned: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm sm:text-base text-gray-700">Đã học</span>
          </label>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          variant="gray"
          fullWidth
        >
          Hủy
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          fullWidth
        >
          {editingNote ? 'Cập nhật' : 'Lưu'}
        </Button>
      </div>
    </form>
  );
}

