'use client';

import { KnowledgeNote } from '../../types/notes';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface NoteCardProps {
  note: KnowledgeNote;
  onEdit: (note: KnowledgeNote) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 min-h-[120px] flex flex-col"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex-1">
          {note.title}
        </h3>
        <div className="flex gap-2 ml-2 shrink-0">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
            title="Chỉnh sửa"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
            title="Xóa"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
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

