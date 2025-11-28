'use client';

import { useState, useEffect } from 'react';
import { NoteFormData, KnowledgeNote, NoteType } from '../../types/notes';

interface NoteFormProps {
  onSubmit: (data: NoteFormData) => void | Promise<void>;
  onCancel: () => void;
  editingNote?: KnowledgeNote | null;
  isSubmitting?: boolean;
  defaultType?: NoteType;
}

export function NoteForm({ onSubmit, onCancel, editingNote, isSubmitting = false, defaultType = 'vocabulary' }: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>({
    type: defaultType,
    title: '',
    content: '',
    example: '',
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        type: editingNote.type,
        title: editingNote.title,
        content: editingNote.content,
        example: editingNote.example || '',
      });
    } else {
      setFormData(prev => ({ ...prev, type: defaultType }));
    }
  }, [editingNote, defaultType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      type: defaultType,
      title: '',
      content: '',
      example: '',
    });
  };

  const typeOptions = [
    { value: 'vocabulary', label: 'Từ vựng' },
    { value: 'formula', label: 'Công thức' },
    { value: 'other', label: 'Khác' },
  ];

  return (
    <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
      <div className="mb-2.5 sm:mb-3">
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as NoteType })}
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

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang xử lý...' : (editingNote ? 'Cập nhật' : 'Lưu')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

