export type NoteType = 'vocabulary' | 'formula' | 'other';

export interface KnowledgeNote {
  _id: string;
  category: NoteType;
  title: string;
  content: string;
  example?: string;
  isLearned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  category: NoteType;
  title: string;
  content: string;
  example?: string;
  isLearned?: boolean;
}

// Stats interfaces
export interface CategoryStats {
  total: number;
  learned: number;
  notLearned: number;
}

export interface NotesStats {
  vocabulary: CategoryStats;
  formula: CategoryStats;
  other: CategoryStats;
  total: CategoryStats;
}

// Pagination interface
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// All notes response
export interface AllNotesData {
  userId: string;
  vocabulary: Omit<KnowledgeNote, 'category'>[];
  formula: Omit<KnowledgeNote, 'category'>[];
  other: Omit<KnowledgeNote, 'category'>[];
}

// Search/Category params
export interface NotesQueryParams {
  q?: string;
  category?: NoteType;
  isLearned?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

