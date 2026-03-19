"use client";

import { CustomerFilters } from "@/lib/types";
import { useReducer, useContext, createContext } from "react";

const CustomerFiltersFormContext =
  createContext<CustomerFiltersFormState | null>(null);

const CustomerFiltersFormDispatchContext =
  createContext<React.Dispatch<CustomerFiltersFormAction> | null>(null);

interface CustomerFiltersFormProviderProps {
  initialFilters?: CustomerFilters;
  children: React.ReactNode;
}

export const CustomerFiltersFormProvider = ({
  initialFilters,
  children,
}: CustomerFiltersFormProviderProps) => {
  const [filters, dispatch] = useReducer(
    customerFiltersReducer,
    createInitialState(initialFilters),
  );

  return (
    <CustomerFiltersFormContext.Provider value={filters}>
      <CustomerFiltersFormDispatchContext.Provider value={dispatch}>
        {children}
      </CustomerFiltersFormDispatchContext.Provider>
    </CustomerFiltersFormContext.Provider>
  );
};

export function useCustomerFiltersForm() {
  const context = useContext(CustomerFiltersFormContext);
  if (context === null) {
    throw new Error(
      "useCustomerFiltersForm must be used within a CustomerFiltersFormProvider",
    );
  }
  return context;
}

export function useCustomerFiltersFormDispatch() {
  const context = useContext(CustomerFiltersFormDispatchContext);
  if (context === null) {
    throw new Error(
      "useCustomerFiltersFormDispatch must be used within a CustomerFiltersFormProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type CustomerFiltersFormAction =
  | { type: "changeHasNoActiveProjects"; payload: boolean }
  | { type: "changeHasActiveProjects"; payload: boolean }
  | { type: "changeHasOverdueProjects"; payload: boolean }
  | { type: "setCompanyIds"; payload: string[] }
  | { type: "resetFilters" };

interface CustomerFiltersFormState {
  hasNoActiveProjects: boolean;
  hasActiveProjects: boolean;
  hasOverdueProjects: boolean;
  companyIds: string[];
}

function createInitialState(
  initialFilters?: CustomerFilters,
): CustomerFiltersFormState {
  return {
    hasNoActiveProjects: initialFilters?.hasNoActiveProjects ?? false,
    hasActiveProjects: initialFilters?.hasActiveProjects ?? false,
    hasOverdueProjects: initialFilters?.hasOverdueProjects ?? false,
    companyIds: initialFilters?.companyIds?.map((id) => id.toString()) ?? [],
  };
}

function customerFiltersReducer(
  state: CustomerFiltersFormState,
  action: CustomerFiltersFormAction,
) {
  switch (action.type) {
    case "changeHasNoActiveProjects":
      return { ...state, hasNoActiveProjects: action.payload };
    case "changeHasActiveProjects":
      return { ...state, hasActiveProjects: action.payload };
    case "changeHasOverdueProjects":
      return { ...state, hasOverdueProjects: action.payload };
    case "setCompanyIds":
      return { ...state, companyIds: action.payload };
    case "resetFilters":
      return {
        hasNoActiveProjects: false,
        hasActiveProjects: false,
        hasOverdueProjects: false,
        companyIds: [],
      };
    default:
      return state;
  }
}
