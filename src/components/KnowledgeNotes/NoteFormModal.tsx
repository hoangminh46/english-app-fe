'use client';

import { NoteFormData, KnowledgeNote, NoteType } from '../../types/notes';
import { NoteForm } from './NoteForm';
import { BaseModal } from '../ui/BaseModal';

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NoteFormData) => void | Promise<void>;
  editingNote?: KnowledgeNote | null;
  isSubmitting?: boolean;
  defaultType?: NoteType;
}

export function NoteFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingNote,
  isSubmitting = false,
  defaultType = 'vocabulary',
}: NoteFormModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingNote ? 'Chỉnh sửa kiến thức' : 'Thêm kiến thức mới'}
      maxWidth="lg"
      zIndex={60}
    >
      <NoteForm
        onSubmit={onSubmit}
        onCancel={onClose}
        editingNote={editingNote}
        isSubmitting={isSubmitting}
        defaultType={defaultType}
      />
    </BaseModal>
  );
}
