'use client';

import { KnowledgeNote, NoteType } from '../../types/notes';
import { TrashIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface NoteCardProps {
  note: KnowledgeNote;
  onEdit: (note: KnowledgeNote) => void;
  onDelete: (note: KnowledgeNote) => void;
  onToggleLearned: (category: NoteType, itemId: string) => void;
}

export function NoteCard({ note, onEdit, onDelete, onToggleLearned }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 min-h-[120px] flex flex-col ${
        note.isLearned ? 'border-green-300 bg-green-50/30' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {note.title}
          </h3>
          {note.isLearned && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
              <CheckCircleIconSolid className="w-3 h-3" />
              Đã học
            </span>
          )}
        </div>
        <div className="flex gap-1 ml-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 rounded-lg ${note.isLearned ? 'text-green-600' : 'text-gray-400'}`}
            onClick={() => onToggleLearned(note.category, note._id)}
            title={note.isLearned ? 'Đánh dấu chưa học' : 'Đánh dấu đã học'}
          >
            {note.isLearned ? (
              <CheckCircleIconSolid className="w-5 h-5" />
            ) : (
              <CheckCircleIcon className="w-5 h-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 p-1 rounded-lg"
            onClick={() => onEdit(note)}
            title="Chỉnh sửa"
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 p-1 rounded-lg"
            onClick={() => onDelete(note)}
            title="Xóa"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-sm sm:text-base text-gray-700 mb-2 whitespace-pre-wrap flex-1">{note.content}</p>

      {note.example && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-2.5 sm:p-3 rounded mt-auto">
          <p className="text-xs sm:text-sm text-gray-700 italic">{note.example}</p>
        </div>
      )}
    </motion.div>
  );
}

