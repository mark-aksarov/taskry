"use client";

import {
  SelectedItem,
  useSelectedItemsState,
} from "@/lib/hooks/useSelectedItemsState";
import React, { createContext, useContext } from "react";

export interface SelectedItemsContextType {
  add: (item: SelectedItem) => void;
  remove: (id: number) => void;
  get: (id: number) => SelectedItem | undefined;
  clear: () => void;
  ids: number[];
}

export const SelectedItemsContext =
  createContext<SelectedItemsContextType | null>(null);

export const SelectedItemsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useSelectedItemsState<SelectedItem>();

  return (
    <SelectedItemsContext.Provider value={value}>
      {children}
    </SelectedItemsContext.Provider>
  );
};

export const useSelectedItems = () => {
  const context = useContext(SelectedItemsContext);

  if (!context) {
    throw new Error(
      "useSelectedItems must be used within SelectedItemsProvider",
    );
  }

  return context;
};
