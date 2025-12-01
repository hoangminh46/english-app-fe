'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { KnowledgeNote, NoteType, NoteFormData } from '../types/notes';
import * as noteService from '../services/noteService';

export function useKnowledgeNotes() {
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState<KnowledgeNote[]>([]);

  // Fetch notes from API
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      return await noteService.getNotes();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update local state when data changes
  useEffect(() => {
    if (data) {
      setNotes(data);
    }
  }, [data]);

  // Create note mutation
  const createNoteMutation = useMutation({
    mutationFn: async ({ type, data }: { type: NoteType; data: NoteFormData }) => {
      return await noteService.createNote(type, data);
    },
    onSuccess: (newNote) => {
      // Update cache immediately for optimistic UI
      queryClient.setQueryData(['notes'], (old: KnowledgeNote[] = []) => {
        return [newNote, ...old];
      });
      toast.success('Tạo ghi chú thành công!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Tạo ghi chú thất bại');
      console.error('Create note error:', error);
    },
  });

  // Update note mutation
  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NoteFormData> }) => {
      return await noteService.updateNote(id, data);
    },
    onSuccess: (updatedNote) => {
      // Update cache
      queryClient.setQueryData(['notes'], (old: KnowledgeNote[] = []) => {
        return old.map(note => note.id === updatedNote.id ? updatedNote : note);
      });
      toast.success('Cập nhật ghi chú thành công!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Cập nhật ghi chú thất bại');
      console.error('Update note error:', error);
    },
  });

  // Delete note mutation
  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      await noteService.deleteNote(id);
      return id;
    },
    onSuccess: (deletedId) => {
      // Update cache
      queryClient.setQueryData(['notes'], (old: KnowledgeNote[] = []) => {
        return old.filter(note => note.id !== deletedId);
      });
      toast.success('Xóa ghi chú thành công!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Xóa ghi chú thất bại');
      console.error('Delete note error:', error);
    },
  });

  // Add a new note
  const addNote = async (type: NoteType, data: NoteFormData) => {
    await createNoteMutation.mutateAsync({ type, data });
  };

  // Update an existing note
  const updateNote = async (id: string, data: Partial<NoteFormData>) => {
    await updateNoteMutation.mutateAsync({ id, data });
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    await deleteNoteMutation.mutateAsync(id);
  };

  // Get notes by type (client-side filter)
  const getNotesByType = (type: NoteType) => {
    return notes.filter(note => note.type === type);
  };

  // Search notes (client-side search)
  const searchNotes = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery) ||
        note.example?.toLowerCase().includes(lowerQuery)
    );
  };

  // Refresh notes from server
  const refreshNotes = () => {
    refetch();
  };

  return {
    notes,
    isLoading: isLoading || createNoteMutation.isPending || updateNoteMutation.isPending || deleteNoteMutation.isPending,
    error: error?.message,
    addNote,
    updateNote,
    deleteNote,
    getNotesByType,
    searchNotes,
    refreshNotes,
  };
}

