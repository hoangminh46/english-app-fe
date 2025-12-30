import axios from 'axios';
import apiClient from '@/lib/axios';
import { KnowledgeNote, NoteType, NoteFormData } from '../types/notes';

const NOTES_ENDPOINT = '/api/notes';

// API Response types
interface ErrorDetail {
  message: string;
  field?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: ErrorDetail[];
  };
}

// API response structure for notes
interface NotesResponseData {
  id: string;
  userId: string;
  vocabulary: Omit<KnowledgeNote, 'type'>[];
  formula: Omit<KnowledgeNote, 'type'>[];
  other: Omit<KnowledgeNote, 'type'>[];
  createdAt: string;
  updatedAt: string;
}

// Get all notes with optional type filter
export const getNotes = async (params?: {
  type?: NoteType;
}): Promise<KnowledgeNote[]> => {
  try {
    const response = await apiClient.get<ApiResponse<NotesResponseData>>(
      NOTES_ENDPOINT,
      { params }
    );

    if (response.data.success && response.data.data) {
      const { vocabulary, formula, other } = response.data.data;
      
      // Combine all notes and add type field to each
      const allNotes: KnowledgeNote[] = [
        ...vocabulary.map(note => ({ ...note, type: 'vocabulary' as NoteType })),
        ...formula.map(note => ({ ...note, type: 'formula' as NoteType })),
        ...other.map(note => ({ ...note, type: 'other' as NoteType })),
      ];

      // Filter by type if specified
      if (params?.type) {
        return allNotes.filter(note => note.type === params.type);
      }

      return allNotes;
    }

    throw new Error(response.data.error?.message || 'Failed to fetch notes');
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch notes');
    }
    throw error;
  }
};

// Get a single note by ID
export const getNoteById = async (id: string): Promise<KnowledgeNote> => {
  try {
    const response = await apiClient.get<ApiResponse<KnowledgeNote>>(
      `${NOTES_ENDPOINT}/${id}`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to fetch note');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch note');
    }
    throw error;
  }
};

// Create a new note
export const createNote = async (
  type: NoteType,
  data: NoteFormData
): Promise<KnowledgeNote> => {
  try {
    const response = await apiClient.post<ApiResponse<KnowledgeNote>>(
      NOTES_ENDPOINT,
      data
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to create note');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || 'Failed to create note';
      const details = error.response?.data?.error?.details;
      
      if (details && details.length > 0) {
        throw new Error(`${errorMessage}: ${details.map((d: ErrorDetail) => d.message).join(', ')}`);
      }
      
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Update a note
export const updateNote = async (
  id: string,
  data: Partial<NoteFormData>
): Promise<KnowledgeNote> => {
  try {
    const response = await apiClient.put<ApiResponse<KnowledgeNote>>(
      `${NOTES_ENDPOINT}/${id}`,
      data
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error?.message || 'Failed to update note');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to update note');
    }
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${NOTES_ENDPOINT}/${id}`
    );

    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to delete note');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to delete note');
    }
    throw error;
  }
};


