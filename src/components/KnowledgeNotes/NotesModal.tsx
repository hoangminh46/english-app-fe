'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { NoteType, KnowledgeNote, NoteFormData } from '../../types/notes';
import { TabNavigation } from './TabNavigation';
import { NoteCard } from './NoteCard';
import { EmptyState } from './EmptyState';
import { NoteFormModal } from './NoteFormModal';
import { ConfirmModal } from './ConfirmModal';
import { BaseModal } from '../ui/BaseModal';
import { Button } from '../ui/Button';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: KnowledgeNote[];
  isLoading?: boolean;
  onAddNote: (data: NoteFormData) => Promise<void>;
  onUpdateNote: (category: NoteType, itemId: string, data: Partial<Omit<NoteFormData, 'category'>>) => Promise<void>;
  onDeleteNote: (category: NoteType, itemId: string) => Promise<void>;
  onToggleLearned: (category: NoteType, itemId: string) => Promise<void>;
}

export function NotesModal({
  isOpen,
  onClose,
  notes,
  isLoading = false,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onToggleLearned,
}: NotesModalProps) {
  const [activeTab, setActiveTab] = useState<NoteType>('vocabulary');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingNote, setEditingNote] = useState<KnowledgeNote | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<KnowledgeNote | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure notes is always an array
  const safeNotes = Array.isArray(notes) ? notes : [];

  // Filter notes by active tab
  const filteredNotes = safeNotes
    .filter((note) => note.category === activeTab)
    .filter((note) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.example?.toLowerCase().includes(query)
      );
    });

  // Get counts for each tab
  const counts = {
    vocabulary: safeNotes.filter((n) => n.category === 'vocabulary').length,
    formula: safeNotes.filter((n) => n.category === 'formula').length,
    other: safeNotes.filter((n) => n.category === 'other').length,
  };

  const handleSubmit = async (data: NoteFormData) => {
    try {
      setIsSubmitting(true);
      if (editingNote) {
        const { ...updateData } = data;
        await onUpdateNote(editingNote.category, editingNote._id, updateData);
        setEditingNote(null);
      } else {
        await onAddNote(data);
      }
      setIsAddingNew(false);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (note: KnowledgeNote) => {
    setEditingNote(note);
    setIsAddingNew(true);
    setActiveTab(note.category);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingNote(null);
  };

  const handleDelete = (note: KnowledgeNote) => {
    setNoteToDelete(note);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    try {
      await onDeleteNote(noteToDelete.category, noteToDelete._id);
      setNoteToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleToggleLearned = async (category: NoteType, itemId: string) => {
    try {
      await onToggleLearned(category, itemId);
    } catch (error) {
      console.error('Toggle learned error:', error);
    }
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title={
          <>
            <span className="text-xl sm:text-2xl">📚</span>
            <h2 className="text-base sm:text-xl font-bold">Kiến Thức Đã Note</h2>
          </>
        }
        maxWidth="3xl"
        containerClassName="h-[600px]"
        contentClassName="bg-gray-50 flex flex-col h-full"
        footer={
          <Button
            onClick={() => setIsAddingNew(true)}
            disabled={isLoading}
            fullWidth
            leftIcon={<PlusIcon className="w-5 h-5" />}
          >
            Thêm kiến thức mới
          </Button>
        }
      >
        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50/50 shrink-0">
          <div className="relative">
            <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm ghi chú..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <EmptyState type={activeTab} />
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleLearned={handleToggleLearned}
                />
              ))}
            </div>
          )}
        </div>
      </BaseModal>

      {/* Add/Edit Form Modal */}
      <NoteFormModal
        isOpen={isAddingNew}
        onClose={handleCancel}
        onSubmit={handleSubmit}
        editingNote={editingNote}
        isSubmitting={isSubmitting}
        defaultType={activeTab}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={confirmDelete}
        title="Xóa ghi chú"
        message={`Bạn có chắc chắn muốn xóa ghi chú "${noteToDelete?.title}" không? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
      />
    </>
  );
}
