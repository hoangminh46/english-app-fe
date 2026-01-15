import React, { useState } from 'react';
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { Plus, Loader2, Check } from "lucide-react";
import { createNote, getAllNotes, flattenAllNotes } from "@/services/noteService";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface VocabularyTooltipProps {
  word: string;
  pronunciation: string;
  meaning: string;
  children: React.ReactNode;
}

export default function VocabularyTooltip({ word, pronunciation, meaning, children }: VocabularyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccessfullyAdded, setIsSuccessfullyAdded] = useState(false);
  const queryClient = useQueryClient();

  // Reset success state when word/meaning changes to avoid state reuse issues
  React.useEffect(() => {
    setIsSuccessfullyAdded(false);
  }, [word, meaning]);

  // Fetch notes to check for duplicates
  const { data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const allNotesData = await getAllNotes();
      return flattenAllNotes(allNotesData);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const isDuplicate = notes?.some(note => 
    note.category === 'vocabulary' && 
    note.title.toLowerCase().trim() === word.toLowerCase().trim()
  );

  const isAlreadyNote = !!(isDuplicate || isSuccessfullyAdded);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleAddToNote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding || isAlreadyNote) return;
    
    setIsAdding(true);
    try {
      await createNote({
        category: 'vocabulary',
        title: word,
        content: pronunciation ? `[${pronunciation}] - ${meaning}` : meaning,
        isLearned: false
      });
      setIsSuccessfullyAdded(true);
      toast.success(`Đã thêm "${word}" vào sổ tay!`);
      // Invalidate queries to refresh notes list
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['notes'] }),
        queryClient.invalidateQueries({ queryKey: ['notes-stats'] })
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Không thể thêm từ vào sổ tay. Vui lòng thử lại!");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <TooltipPrimitive.Trigger asChild>
          <span 
            className="cursor-pointer border-b border-dashed border-blue-500 hover:border-blue-700 transition-colors"
            onClick={handleClick}
            onMouseEnter={(e) => e.preventDefault()}
            onMouseLeave={(e) => e.preventDefault()}
          >
            {children}
          </span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top"
            sideOffset={4}
            className={cn(
              "relative max-w-64 p-3 bg-white text-gray-900 border border-gray-200 shadow-lg text-left rounded-md z-50",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=top]:slide-in-from-bottom-2"
            )}
            onPointerDownOutside={() => setIsOpen(false)}
            onEscapeKeyDown={() => setIsOpen(false)}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium text-blue-700">{word}</div>
                <button 
                  onClick={handleAddToNote}
                  disabled={isAdding || isAlreadyNote}
                  className={cn(
                    "p-1 rounded-full border transition-all disabled:cursor-not-allowed",
                    isAlreadyNote 
                      ? "border-emerald-500 text-emerald-500 bg-emerald-50" 
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-50"
                  )}
                  title={isAlreadyNote ? "Đã có trong sổ tay" : "Thêm vào sổ tay"}
                >
                  {isAdding ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : isAlreadyNote ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                </button>
              </div>
              <div className="text-gray-600 italic text-sm">{pronunciation}</div>
              <div className="text-gray-800 text-sm">{meaning}</div>
            </div>
            {/* Custom white arrow */}
            <div className="absolute w-2 h-2 bg-white border-b border-r border-gray-200 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
} 
