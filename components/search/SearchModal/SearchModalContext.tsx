"use client";

import React, { createContext, useContext } from "react";

interface SearchModalContextProps {
  query: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchField: React.ReactNode;
  searchToggleButtonGroup: React.ReactNode;
}

export const SearchModalContext = createContext<SearchModalContextProps | null>(
  null,
);

export function useSearchModalContext() {
  const context = useContext(SearchModalContext);
  if (context === null) {
    throw new Error(
      "useSearchModalContext must be used within a SearchModalContext.Provider",
    );
  }
  return context;
}
