'use client';

import { NoteType } from '../../types/notes';

interface TabNavigationProps {
  activeTab: NoteType;
  onTabChange: (tab: NoteType) => void;
  counts: {
    vocabulary: number;
    formula: number;
    other: number;
  };
}

const tabs = [
  { id: 'vocabulary' as NoteType, label: 'Từ vựng' },
  { id: 'formula' as NoteType, label: 'Công thức' },
  { id: 'other' as NoteType, label: 'Khác' },
];

export function TabNavigation({ activeTab, onTabChange, counts }: TabNavigationProps) {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3.5 px-2 sm:py-3 sm:px-4 font-medium transition-all duration-200 relative ${
            activeTab === tab.id
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-sm sm:text-base">{tab.label}</span>
            <span
              className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? 'bg-blue-200 text-blue-700'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {counts[tab.id]}
            </span>
          </div>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      ))}
    </div>
  );
}

