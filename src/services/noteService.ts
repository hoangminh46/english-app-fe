import axios from 'axios';
import apiClient from '@/lib/axios';
import { 
  KnowledgeNote, 
  NoteType, 
  NoteFormData,
  NotesStats,
  AllNotesData,
  Pagination,
  NotesQueryParams
} from '../types/notes';

const NOTES_ENDPOINT = '/api/v1/notes';

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: Pagination;
}

// 1. Tạo Notes Mặc Định
export const createDefaultNotes = async (): Promise<AllNotesData> => {
  try {
    const response = await apiClient.post<ApiResponse<AllNotesData>>(
      `${NOTES_ENDPOINT}/default`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to create default notes');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create default notes');
    }
    throw error;
  }
};

// 2. Lấy Thống Kê
export const getNotesStats = async (): Promise<NotesStats> => {
  try {
    const response = await apiClient.get<ApiResponse<NotesStats>>(
      `${NOTES_ENDPOINT}/stats`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to fetch notes stats');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notes stats');
    }
    throw error;
  }
};

// 3. Tìm Kiếm Notes
export const searchNotes = async (params: NotesQueryParams): Promise<{
  items: KnowledgeNote[];
  pagination: Pagination;
}> => {
  try {
    const response = await apiClient.get<ApiResponse<KnowledgeNote[]>>(
      `${NOTES_ENDPOINT}/search`,
      { params }
    );

    if (response.data.success && response.data.data) {
      return {
        items: response.data.data,
        pagination: response.data.pagination!,
      };
    }

    throw new Error(response.data.message || 'Failed to search notes');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search notes');
    }
    throw error;
  }
};

// 4. Lấy Tất Cả Notes
export const getAllNotes = async (): Promise<AllNotesData> => {
  try {
    const response = await apiClient.get<ApiResponse<AllNotesData>>(
      NOTES_ENDPOINT
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to fetch all notes');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch all notes');
    }
    throw error;
  }
};

// 5. Lấy Notes Theo Category (có phân trang)
export const getNotesByCategory = async (
  category: NoteType,
  params?: Omit<NotesQueryParams, 'category'>
): Promise<{
  items: KnowledgeNote[];
  pagination: Pagination;
}> => {
  try {
    const response = await apiClient.get<ApiResponse<KnowledgeNote[]>>(
      `${NOTES_ENDPOINT}/category/${category}`,
      { params }
    );

    if (response.data.success && response.data.data) {
      return {
        items: response.data.data,
        pagination: response.data.pagination!,
      };
    }

    throw new Error(response.data.message || 'Failed to fetch notes by category');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch notes by category');
    }
    throw error;
  }
};

// 6. Lấy Chi Tiết 1 Note Item
export const getNoteById = async (
  category: NoteType,
  itemId: string
): Promise<KnowledgeNote> => {
  try {
    const response = await apiClient.get<ApiResponse<KnowledgeNote>>(
      `${NOTES_ENDPOINT}/category/${category}/item/${itemId}`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to fetch note');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch note');
    }
    throw error;
  }
};

// 7. Tạo Note Item
export const createNote = async (
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

    throw new Error(response.data.message || 'Failed to create note');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create note');
    }
    throw error;
  }
};

// 8. Cập Nhật Note Item
export const updateNote = async (
  category: NoteType,
  itemId: string,
  data: Partial<Omit<NoteFormData, 'category'>>
): Promise<KnowledgeNote> => {
  try {
    const response = await apiClient.put<ApiResponse<KnowledgeNote>>(
      `${NOTES_ENDPOINT}/category/${category}/item/${itemId}`,
      data
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to update note');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update note');
    }
    throw error;
  }
};

// 9. Toggle Trạng Thái Learned
export const toggleNoteLearned = async (
  category: NoteType,
  itemId: string
): Promise<KnowledgeNote> => {
  try {
    const response = await apiClient.patch<ApiResponse<KnowledgeNote>>(
      `${NOTES_ENDPOINT}/category/${category}/item/${itemId}/toggle-learned`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to toggle note learned status');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to toggle note learned status');
    }
    throw error;
  }
};

// 10. Xóa Note Item
export const deleteNote = async (
  category: NoteType,
  itemId: string
): Promise<void> => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(
      `${NOTES_ENDPOINT}/category/${category}/item/${itemId}`
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete note');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete note');
    }
    throw error;
  }
};

// Helper: Convert AllNotesData to flat array with category field
export const flattenAllNotes = (data: AllNotesData): KnowledgeNote[] => {
  const allNotes: KnowledgeNote[] = [
    ...data.vocabulary.map(note => ({ ...note, category: 'vocabulary' as NoteType })),
    ...data.formula.map(note => ({ ...note, category: 'formula' as NoteType })),
    ...data.other.map(note => ({ ...note, category: 'other' as NoteType })),
  ];
  return allNotes;
};
