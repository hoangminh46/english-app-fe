'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { KnowledgeNote, NoteType, NoteFormData } from '../types/notes';
import * as noteService from '../services/noteService';

export function useKnowledgeNotes(enabled: boolean = false) {
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState<KnowledgeNote[]>([]);

  // Fetch all notes from API - only when enabled (modal is open)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const allNotesData = await noteService.getAllNotes();
      return noteService.flattenAllNotes(allNotesData);
    },
    enabled, // Only fetch when enabled is true
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ['notes-stats'],
    queryFn: () => noteService.getNotesStats(),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  // Update local state when data changes
  useEffect(() => {
    if (data) {
      setNotes(Array.isArray(data) ? data : []);
    } else {
      setNotes([]);
    }
  }, [data]);

  // Create note mutation
  const createNoteMutation = useMutation({
    mutationFn: async (data: NoteFormData) => {
      return await noteService.createNote(data);
    },
    onSuccess: () => {
      // Invalidate queries to refetch latest data from server
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes-stats'] });
      toast.success('Tạo ghi chú thành công!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Tạo ghi chú thất bại');
      console.error('Create note error:', error);
    },
  });

  // Update note mutation
  const updateNoteMutation = useMutation({
    mutationFn: async ({ 
      category, 
      itemId, 
      data 
    }: { 
      category: NoteType; 
      itemId: string; 
      data: Partial<Omit<NoteFormData, 'category'>> 
    }) => {
      return await noteService.updateNote(category, itemId, data);
    },
    onSuccess: () => {
      // Invalidate queries to refetch latest data from server
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes-stats'] });
      toast.success('Cập nhật ghi chú thành công!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Cập nhật ghi chú thất bại');
      console.error('Update note error:', error);
    },
  });

  // Toggle learned mutation
  const toggleLearnedMutation = useMutation({
    mutationFn: async ({ category, itemId }: { category: NoteType; itemId: string }) => {
      return await noteService.toggleNoteLearned(category, itemId);
    },
    onSuccess: (updatedNote) => {
      // Invalidate queries to refetch latest data from server
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes-stats'] });
      toast.success(
        updatedNote.isLearned 
          ? 'Đã đánh dấu đã học!' 
          : 'Đã đánh dấu chưa học!'
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Cập nhật trạng thái thất bại');
      console.error('Toggle learned error:', error);
    },
  });

  // Delete note mutation
  const deleteNoteMutation = useMutation({
    mutationFn: async ({ category, itemId }: { category: NoteType; itemId: string }) => {
      await noteService.deleteNote(category, itemId);
      return itemId;
    },
    onSuccess: () => {
      // Invalidate queries to refetch latest data from server
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes-stats'] });
      toast.success('Xóa ghi chú thành công!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Xóa ghi chú thất bại');
      console.error('Delete note error:', error);
    },
  });

  // Create default notes mutation
  const createDefaultMutation = useMutation({
    mutationFn: async () => {
      const allNotesData = await noteService.createDefaultNotes();
      return noteService.flattenAllNotes(allNotesData);
    },
    onSuccess: () => {
      // Invalidate queries to refetch latest data from server
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes-stats'] });
      toast.success('Đã tạo ghi chú mặc định!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Tạo ghi chú mặc định thất bại');
      console.error('Create default notes error:', error);
    },
  });

  // Add a new note
  const addNote = async (data: NoteFormData) => {
    await createNoteMutation.mutateAsync(data);
  };

  // Update an existing note
  const updateNote = async (
    category: NoteType,
    itemId: string,
    data: Partial<Omit<NoteFormData, 'category'>>
  ) => {
    await updateNoteMutation.mutateAsync({ category, itemId, data });
  };

  // Toggle learned status
  const toggleLearned = async (category: NoteType, itemId: string) => {
    await toggleLearnedMutation.mutateAsync({ category, itemId });
  };

  // Delete a note
  const deleteNote = async (category: NoteType, itemId: string) => {
    await deleteNoteMutation.mutateAsync({ category, itemId });
  };

  // Create default notes
  const createDefault = async () => {
    await createDefaultMutation.mutateAsync();
  };

  // Get notes by category (client-side filter)
  const getNotesByCategory = (category: NoteType) => {
    return notes?.filter(note => note.category === category);
  };

  // Search notes (client-side search)
  const searchNotes = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return notes?.filter(
      note =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery) ||
        note.example?.toLowerCase().includes(lowerQuery)
    );
  };

  // Filter by learned status
  const filterByLearned = (isLearned: boolean) => {
    return notes?.filter(note => note.isLearned === isLearned);
  };

  // Refresh notes from server
  const refreshNotes = () => {
    refetch();
  };

  return {
    notes: Array.isArray(notes) ? notes : [],
    stats,
    isLoading: isLoading || 
               createNoteMutation.isPending || 
               updateNoteMutation.isPending || 
               deleteNoteMutation.isPending ||
               toggleLearnedMutation.isPending ||
               createDefaultMutation.isPending,
    error: error?.message,
    addNote,
    updateNote,
    toggleLearned,
    deleteNote,
    createDefault,
    getNotesByCategory,
    searchNotes,
    filterByLearned,
    refreshNotes,
  };
}
