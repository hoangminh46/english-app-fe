'use client';

import { useState } from 'react';
import { FloatingNoteButton } from './FloatingNoteButton';
import { NotesModal } from './NotesModal';
import { useKnowledgeNotes } from '@/hooks/useKnowledgeNotes';

export function KnowledgeNotesWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notes, isLoading, addNote, updateNote, deleteNote } = useKnowledgeNotes(isModalOpen);

  // Ensure notes is always an array
  const safeNotes = Array.isArray(notes) ? notes : [];

  return (
    <>
      <FloatingNoteButton
        onClick={() => setIsModalOpen(true)}
        noteCount={safeNotes.length}
      />
      
      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notes={safeNotes}
        isLoading={isLoading}
        onAddNote={addNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
      />
    </>
  );
}

