import React, { useState } from 'react';
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

interface VocabularyTooltipProps {
  word: string;
  pronunciation: string;
  meaning: string;
  children: React.ReactNode;
}

export default function VocabularyTooltip({ word, pronunciation, meaning, children }: VocabularyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
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
              <div className="font-medium text-blue-700">{word}</div>
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