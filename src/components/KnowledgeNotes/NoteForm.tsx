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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-2.5 sm:mb-3">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as NoteType })}
          className="w-full text-foreground bg-background"
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
          className="w-full text-foreground font-bold placeholder:font-normal"
          required
        />
      </div>

      <div className="mb-2.5 sm:mb-3">
        <textarea
          placeholder="Nội dung..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full resize-none text-foreground leading-relaxed"
          rows={3}
          required
        />
      </div>

      <div className="mb-2.5 sm:mb-3">
        <textarea
          placeholder="Ví dụ (tùy chọn)..."
          value={formData.example}
          onChange={(e) => setFormData({ ...formData, example: e.target.value })}
          className="w-full resize-none bg-secondary/5 border-secondary/20 text-foreground"
          rows={2}
        />
      </div>

      {editingNote && (
        <div className="mb-2.5 sm:mb-3">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.isLearned}
              onChange={(e) => setFormData({ ...formData, isLearned: e.target.checked })}
              className="w-5 h-5 text-primary border-2 border-input rounded focus:ring-ring cursor-pointer"
            />
            <span className="text-sm sm:text-base text-foreground font-medium group-hover:text-primary transition-colors">Đã học</span>
          </label>
        </div>
      )}

      <div className="flex gap-3 pt-2">
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
          variant="primary" // Explicit primary
        >
          {editingNote ? 'Cập nhật' : 'Lưu'}
        </Button>
      </div>
    </form>
  );
}

