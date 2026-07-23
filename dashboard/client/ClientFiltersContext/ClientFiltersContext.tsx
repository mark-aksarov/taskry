"use client";

import { ClientFilters } from "@/lib/types";
import { useContext, createContext } from "react";

/**
 * Single source of truth for client filters.
 * The filters provided here have been validated and normalized from the URL search params.
 */

const ClientFiltersContext = createContext<ClientFilters | null>(null);

interface ClientFiltersProviderProps {
  filters: ClientFilters;
  children: React.ReactNode;
}

export const ClientFiltersProvider = ({
  filters,
  children,
}: ClientFiltersProviderProps) => {
  return (
    <ClientFiltersContext.Provider value={filters}>
      {children}
    </ClientFiltersContext.Provider>
  );
};

export function useClientFilters() {
  const context = useContext(ClientFiltersContext);
  if (context === null) {
    throw new Error(
      "useClientFilters must be used within a ClientFiltersProvider",
    );
  }
  return context;
}
