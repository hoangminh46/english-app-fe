// @ts-nocheck
'use client';

import { BookmarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface FloatingNoteButtonProps {
  onClick: () => void;
  noteCount: number;
}

export function FloatingNoteButton({ onClick, noteCount }: FloatingNoteButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-primary hover:bg-primary/90 text-primary-foreground border-b-[6px] border-emerald-700 rounded-2xl p-3.5 sm:p-4 shadow-xl hover:-translate-y-1 transition-all duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, borderBottomWidth: '0px', translateY: '6px' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      aria-label="Mở ghi chú kiến thức"
    >
      <BookmarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      
      {noteCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm ring-2 ring-background"
        >
          {noteCount > 99 ? '99+' : noteCount}
        </motion.span>
      )}
    </motion.button>
  );
}

