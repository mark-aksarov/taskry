"use client";

import {
  SelectedItem,
  useSelectedItemsState,
} from "@/lib/hooks/useSelectedItemsState";
import React, { createContext, useContext } from "react";

const SelectedItemsContext = createContext<ReturnType<
  typeof useSelectedItemsState
> | null>(null);

interface SelectedItemsProviderProps {
  pageItems: SelectedItem[];
  children: React.ReactNode;
}

export function SelectedItemsProvider({
  pageItems,
  children,
}: SelectedItemsProviderProps) {
  const value = useSelectedItemsState<SelectedItem>(pageItems);

  return (
    <SelectedItemsContext.Provider value={value}>
      {children}
    </SelectedItemsContext.Provider>
  );
}

export function useSelectedItems() {
  const context = useContext(SelectedItemsContext);
  if (!context) {
    throw new Error(
      "useSelectedItems must be used within SelectedItemsProvider",
    );
  }
  return context;
}
