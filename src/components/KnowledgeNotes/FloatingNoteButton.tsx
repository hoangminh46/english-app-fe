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
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <BookmarkIcon className="w-6 h-6" />
      
      {noteCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
        >
          {noteCount > 99 ? '99+' : noteCount}
        </motion.span>
      )}
    </motion.button>
  );
}

