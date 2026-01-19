'use client';

import { useState } from 'react';
import { FloatingNoteButton } from './FloatingNoteButton';
import { NotesModal } from './NotesModal';
import { useKnowledgeNotes } from '@/hooks/useKnowledgeNotes';
import { useAuth } from '@/contexts/AuthContext';
import { useUI } from '@/contexts/UIContext';

export function KnowledgeNotesWidget() {
  const { activeWidget, openWidget, closeWidget } = useUI();
  const isModalOpen = activeWidget === 'notes';
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  // Fetch notes immediately when user is authenticated
  const { 
    notes, 
    isLoading: notesLoading, 
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
          onClick={() => openWidget('notes')}
          noteCount={safeNotes.length}
        />
      )}

      <NotesModal
        isOpen={isModalOpen}
        onClose={closeWidget}
        notes={safeNotes}
        isLoading={notesLoading}
        onAddNote={addNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
        onToggleLearned={toggleLearned}
      />
    </>
  );
}

