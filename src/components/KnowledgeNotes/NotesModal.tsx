'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { NoteType, KnowledgeNote, NoteFormData } from '../../types/notes';
import { TabNavigation } from './TabNavigation';
import { NoteCard } from './NoteCard';
import { EmptyState } from './EmptyState';
import { NoteForm } from './NoteForm';

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
        const { category, ...updateData } = data;
        await onUpdateNote(editingNote.category, editingNote._id, updateData);
        setEditingNote(null);
      } else {
        await onAddNote(data);
      }
      setIsAddingNew(false);
    } catch (error) {
      console.error('Submit error:', error);
      // Error is already shown by toast in the hook
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

  const handleDelete = async (category: NoteType, itemId: string) => {
    try {
      await onDeleteNote(category, itemId);
    } catch (error) {
      console.error('Delete error:', error);
      // Error is already shown by toast in the hook
    }
  };

  const handleToggleLearned = async (category: NoteType, itemId: string) => {
    try {
      await onToggleLearned(category, itemId);
    } catch (error) {
      console.error('Toggle learned error:', error);
      // Error is already shown by toast in the hook
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">📚</span>
              <h2 className="text-base sm:text-xl font-bold">Kiến Thức Đã Note</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm ghi chú..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={counts}
          />

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
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

          {/* Add/Edit Form or Add Button */}
          {isAddingNew ? (
            <NoteForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              editingNote={editingNote}
              isSubmitting={isSubmitting}
              defaultType={activeTab}
            />
          ) : (
            <button
              onClick={() => setIsAddingNew(true)}
              disabled={isLoading}
              className="w-full p-3 sm:p-4 bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Thêm kiến thức mới</span>
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

