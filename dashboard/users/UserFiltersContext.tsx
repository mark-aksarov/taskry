"use client";

import { UserFilters } from "@/lib/types";
import { useContext, createContext } from "react";

/**
 * Single source of truth for user filters.
 * The filters provided here have been validated and normalized from the URL search params.
 */

const UserFiltersContext = createContext<UserFilters | null>(null);

interface UserFiltersProviderProps {
  filters: UserFilters;
  children: React.ReactNode;
}

export const UserFiltersProvider = ({
  filters,
  children,
}: UserFiltersProviderProps) => {
  return (
    <UserFiltersContext.Provider value={filters}>
      {children}
    </UserFiltersContext.Provider>
  );
};

export function useUserFilters() {
  const context = useContext(UserFiltersContext);
  if (context === null) {
    throw new Error("useUserFilters must be used within a UserFiltersProvider");
  }
  return context;
}
