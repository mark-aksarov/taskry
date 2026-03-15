"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface SearchModalContextType {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const SearchModalContext = createContext<SearchModalContextType | null>(
  null,
);

export function SearchModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      onOpenChange: setIsOpen,
    }),
    [isOpen],
  );

  return (
    <SearchModalContext.Provider value={contextValue}>
      {children}
    </SearchModalContext.Provider>
  );
}

export function useSearchModal() {
  const context = useContext(SearchModalContext);
  if (context === null) {
    throw new Error("useSearchModal must be used within a SearchModalProvider");
  }
  return context;
}
