"use client";

import { createContext, useContext, useMemo, useState } from "react";

/**
 * React context that stores the current value from the search bar.
 * The value is initially synchronized with the `query` search param.
 */
interface SearchBarContextProps {
  value: string;
  updateValue: (value: string) => void;
}

export const SearchBarContext = createContext<SearchBarContextProps | null>(
  null,
);

interface SearchBarProviderProps {
  initialValue: string;
  children: React.ReactNode;
}

export function SearchBarProvider({
  children,
  initialValue,
}: SearchBarProviderProps) {
  const [value, setValue] = useState(initialValue);

  const contextValue = useMemo(
    () => ({
      value,
      updateValue: setValue,
    }),
    [value],
  );

  return (
    <SearchBarContext.Provider value={contextValue}>
      {children}
    </SearchBarContext.Provider>
  );
}

export function useSearchBar() {
  const context = useContext(SearchBarContext);
  if (context === null) {
    throw new Error(
      "useSearchBar must be used within a SearchBarContext.Provider",
    );
  }
  return context;
}
