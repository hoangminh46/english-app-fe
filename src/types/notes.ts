export type NoteType = 'vocabulary' | 'formula' | 'other';

export interface KnowledgeNote {
  id: string;
  type: NoteType;
  title: string;
  content: string;
  example?: string;
}

export interface NoteFormData {
  type: NoteType;
  title: string;
  content: string;
  example?: string;
}

