"use client";

import React, { createContext, useContext } from "react";
import { SearchCategory } from "../types";

interface SearchContextProps {
  query: string;
  page: number;
  searchCategory: SearchCategory;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchField: React.ReactNode;
  searchToggleButtonGroup: React.ReactNode;
}

export const SearchContext = createContext<SearchContextProps | null>(null);

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error(
      "useSearchContext must be used within a SearchContext.Provider",
    );
  }
  return context;
}
