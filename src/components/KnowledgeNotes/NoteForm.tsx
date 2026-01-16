'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoteFormData, KnowledgeNote, NoteType } from '../../types/notes';
import { noteSchema, NoteSchemaType } from '../../schemas/note.schema';
import { Button } from '../ui/Button';

interface NoteFormProps {
  onSubmit: (data: NoteFormData) => void | Promise<void>;
  onCancel: () => void;
  editingNote?: KnowledgeNote | null;
  isSubmitting?: boolean;
  defaultType?: NoteType;
}

export function NoteForm({ 
  onSubmit, 
  onCancel, 
  editingNote, 
  isSubmitting = false, 
  defaultType = 'vocabulary' 
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteSchemaType>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      category: defaultType,
      title: '',
      content: '',
      example: '',
      isLearned: false,
    },
  });

  useEffect(() => {
    if (editingNote) {
      reset({
        category: editingNote.category,
        title: editingNote.title,
        content: editingNote.content,
        example: editingNote.example || '',
        isLearned: editingNote.isLearned,
      });
    } else {
      reset({
        category: defaultType,
        title: '',
        content: '',
        example: '',
        isLearned: false,
      });
    }
  }, [editingNote, defaultType, reset]);

  const onFormSubmit = (data: NoteSchemaType) => {
    onSubmit(data as NoteFormData);
    if (!editingNote) {
      reset();
    }
  };

  const typeOptions = [
    { value: 'vocabulary', label: 'Từ vựng' },
    { value: 'formula', label: 'Công thức' },
    { value: 'other', label: 'Khác' },
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3">
      <div className="mb-2">
        <select
          {...register('category')}
          className={`w-full p-2 text-sm sm:text-base border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all`}
          disabled={!!editingNote}
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-2">
        <input
          {...register('title')}
          type="text"
          placeholder="Tiêu đề..."
          className={`w-full p-2 text-sm sm:text-base border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-2">
        <textarea
          {...register('content')}
          placeholder="Nội dung..."
          className={`w-full p-2 text-sm sm:text-base border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all`}
          rows={3}
        />
        {errors.content && (
          <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="mb-2">
        <textarea
          {...register('example')}
          placeholder="Ví dụ (tùy chọn)..."
          className={`w-full p-2 text-sm sm:text-base border ${errors.example ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all`}
          rows={2}
        />
        {errors.example && (
          <p className="mt-1 text-xs text-red-500">{errors.example.message}</p>
        )}
      </div>

      {editingNote && (
        <div className="mb-3">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              {...register('isLearned')}
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-all cursor-pointer"
            />
            <span className="text-sm sm:text-base text-gray-700 group-hover:text-blue-600 transition-colors">Đã học</span>
          </label>
        </div>
      )}

      <div className="flex gap-2 pt-1">
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

