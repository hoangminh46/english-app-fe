"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type WidgetType = "notes" | "assistant" | null;

interface UIContextType {
  activeWidget: WidgetType;
  openWidget: (type: WidgetType) => void;
  closeWidget: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWidget, setActiveWidget] = useState<WidgetType>(null);

  const openWidget = (type: WidgetType) => {
    setActiveWidget(type);
  };

  const closeWidget = () => {
    setActiveWidget(null);
  };

  return (
    <UIContext.Provider value={{ activeWidget, openWidget, closeWidget }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
