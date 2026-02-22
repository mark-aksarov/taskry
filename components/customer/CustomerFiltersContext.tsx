"use client";

import { CustomerFilters } from "@/lib/types";
import { useReducer, useContext, createContext } from "react";

export const CustomerFiltersContext =
  createContext<CustomerFiltersState | null>(null);

export const CustomerFiltersDispatchContext =
  createContext<React.Dispatch<CustomerFiltersAction> | null>(null);

interface CustomerFiltersProviderProps {
  initialFilters?: CustomerFilters;
  children: React.ReactNode;
}

export const CustomerFiltersProvider = ({
  initialFilters,
  children,
}: CustomerFiltersProviderProps) => {
  const [filters, dispatch] = useReducer(
    customerFiltersReducer,
    createInitialState(initialFilters),
  );

  return (
    <CustomerFiltersContext.Provider value={filters}>
      <CustomerFiltersDispatchContext.Provider value={dispatch}>
        {children}
      </CustomerFiltersDispatchContext.Provider>
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

export function useCustomerFiltersDispatch() {
  const context = useContext(CustomerFiltersDispatchContext);
  if (context === null) {
    throw new Error(
      "useCustomerFiltersDispatch must be used within a CustomerFiltersProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type CustomerFiltersAction =
  | { type: "changeHasNoActiveProjects"; payload: boolean }
  | { type: "changeHasActiveProjects"; payload: boolean }
  | { type: "changeHasOverdueProjects"; payload: boolean }
  | { type: "setCompany"; payload: string[] }
  | { type: "resetFilters" };

interface CustomerFiltersState {
  hasNoActiveProjects: boolean;
  hasActiveProjects: boolean;
  hasOverdueProjects: boolean;
  company: string[];
}

function createInitialState(
  initialFilters?: CustomerFilters,
): CustomerFiltersState {
  return {
    hasNoActiveProjects: initialFilters?.hasNoActiveProjects ?? false,
    hasActiveProjects: initialFilters?.hasActiveProjects ?? false,
    hasOverdueProjects: initialFilters?.hasOverdueProjects ?? false,
    company: initialFilters?.company?.map((id) => id.toString()) ?? [],
  };
}

export function customerFiltersReducer(
  state: CustomerFiltersState,
  action: CustomerFiltersAction,
) {
  switch (action.type) {
    case "changeHasNoActiveProjects":
      return { ...state, hasNoActiveProjects: action.payload };
    case "changeHasActiveProjects":
      return { ...state, hasActiveProjects: action.payload };
    case "changeHasOverdueProjects":
      return { ...state, hasOverdueProjects: action.payload };
    case "setCompany":
      return { ...state, company: action.payload };
    case "resetFilters":
      return {
        hasNoActiveProjects: false,
        hasActiveProjects: false,
        hasOverdueProjects: false,
        company: [],
      };
    default:
      return state;
  }
}
