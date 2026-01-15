// @ts-nocheck
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  showCloseButton?: boolean;
  headerGradient?: string;
  containerClassName?: string;
  contentClassName?: string;
  zIndex?: number;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
};

export function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'lg',
  showCloseButton = true,
  headerGradient = 'from-blue-600 to-blue-700',
  containerClassName = '',
  contentClassName = 'p-4 bg-gray-50',
  zIndex = 50,
}: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black/60 flex items-center justify-center p-4`}
        style={{ zIndex }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidthClasses[maxWidth]} overflow-hidden flex flex-col ${containerClassName}`}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r ${headerGradient} text-white`}>
              <div className="flex items-center gap-2">
                {typeof title === 'string' ? (
                  <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
                ) : (
                  title
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={`flex-1 overflow-y-auto ${contentClassName}`}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-4 bg-white border-t border-gray-100">
              {footer}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
