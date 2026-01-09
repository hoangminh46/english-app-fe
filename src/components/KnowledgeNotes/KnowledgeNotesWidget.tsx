'use client';

import { useState } from 'react';
import { FloatingNoteButton } from './FloatingNoteButton';
import { NotesModal } from './NotesModal';
import { useKnowledgeNotes } from '@/hooks/useKnowledgeNotes';
import { useAuth } from '@/contexts/AuthContext';

export function KnowledgeNotesWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  // Fetch notes immediately when user is authenticated
  const { 
    notes, 
    isLoading, 
    addNote, 
    updateNote, 
    deleteNote,
    toggleLearned
  } = useKnowledgeNotes(isAuthenticated && !authLoading);

  // Ensure notes is always an array
  const safeNotes = Array.isArray(notes) ? notes : [];

  return (
    <>
      {isAuthenticated && !authLoading && (
        <FloatingNoteButton
          onClick={() => setIsModalOpen(true)}
          noteCount={safeNotes.length}
        />
      )}

      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notes={safeNotes}
        isLoading={isLoading}
        onAddNote={addNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
        onToggleLearned={toggleLearned}
      />
    </>
  );
}

