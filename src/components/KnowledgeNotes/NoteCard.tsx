// @ts-nocheck
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
      className={`relative card-3d p-4 min-h-[140px] flex flex-col group ${
        note.isLearned ? 'border-primary/50 bg-green-50/50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 flex items-center gap-2">
          <h3 className="text-lg font-bold text-foreground">
            {note.title}
          </h3>
          {note.isLearned && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
              <CheckCircleIconSolid className="w-3.5 h-3.5" />
              Đã học
            </span>
          )}
        </div>
        <div className="flex gap-1 ml-2 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1.5 rounded-lg ${note.isLearned ? 'text-green-600' : 'text-muted-foreground'}`}
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
            className="text-primary p-1.5 rounded-lg"
            onClick={() => onEdit(note)}
            title="Chỉnh sửa"
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive p-1.5 rounded-lg"
            onClick={() => onDelete(note)}
            title="Xóa"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-base text-foreground/80 mb-3 whitespace-pre-wrap flex-1 leading-relaxed">{note.content}</p>

      {note.example && (
        <div className="bg-secondary/10 border-l-4 border-secondary p-3 rounded-r-xl mt-auto">
          <p className="text-sm text-foreground/70 italic"><span className="font-semibold text-secondary not-italic">Ví dụ:</span> {note.example}</p>
        </div>
      )}
    </motion.div>
  );
}

