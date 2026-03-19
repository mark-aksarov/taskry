"use client";

import { CustomerFilters } from "@/lib/types";
import { useContext, createContext } from "react";

/**
 * Single source of truth for customer filters.
 * The filters provided here have been validated and normalized from the URL search params.
 */

const CustomerFiltersContext = createContext<CustomerFilters | null>(null);

interface CustomerFiltersProviderProps {
  filters: CustomerFilters;
  children: React.ReactNode;
}

export const CustomerFiltersProvider = ({
  filters,
  children,
}: CustomerFiltersProviderProps) => {
  return (
    <CustomerFiltersContext.Provider value={filters}>
      {children}
    </CustomerFiltersContext.Provider>
  );
};

export function useCustomerFilters() {
  const context = useContext(CustomerFiltersContext);
  if (context === null) {
    throw new Error(
      "useCustomerFilters must be used within a CustomerFiltersProvider",
    );
  }
  return context;
}
