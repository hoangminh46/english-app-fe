'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BaseModal } from '../ui/BaseModal';
import { Button } from '../ui/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  isDanger = true,
}: ConfirmModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="md"
      headerGradient={isDanger ? 'from-red-600 to-red-700' : 'from-blue-600 to-blue-700'}
      showCloseButton={false}
      zIndex={70}
      footer={
        <div className="flex gap-3">
          <Button
            variant="gray"
            fullWidth
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            fullWidth
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center py-2">
        {isDanger && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
        )}
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {message}
        </p>
      </div>
    </BaseModal>
  );
}
