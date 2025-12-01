'use client';

import { useState } from 'react';
import { FloatingNoteButton } from './FloatingNoteButton';
import { NotesModal } from './NotesModal';
import { useKnowledgeNotes } from '@/hooks/useKnowledgeNotes';

export function KnowledgeNotesWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notes, isLoading, addNote, updateNote, deleteNote } = useKnowledgeNotes();

  return (
    <>
      <FloatingNoteButton
        onClick={() => setIsModalOpen(true)}
        noteCount={notes.length}
      />
      
      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notes={notes}
        isLoading={isLoading}
        onAddNote={addNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
      />
    </>
  );
}

