"use client";

import { ClientFilters } from "@/lib/types";
import { useReducer, useContext, createContext } from "react";

const ClientFiltersFormContext =
  createContext<ClientFiltersFormState | null>(null);

const ClientFiltersFormDispatchContext =
  createContext<React.Dispatch<ClientFiltersFormAction> | null>(null);

interface ClientFiltersFormProviderProps {
  initialFilters?: ClientFilters;
  children: React.ReactNode;
}

export const ClientFiltersFormProvider = ({
  initialFilters,
  children,
}: ClientFiltersFormProviderProps) => {
  const [filters, dispatch] = useReducer(
    clientFiltersReducer,
    createInitialState(initialFilters),
  );

  return (
    <ClientFiltersFormContext.Provider value={filters}>
      <ClientFiltersFormDispatchContext.Provider value={dispatch}>
        {children}
      </ClientFiltersFormDispatchContext.Provider>
    </ClientFiltersFormContext.Provider>
  );
};

export function useClientFiltersForm() {
  const context = useContext(ClientFiltersFormContext);
  if (context === null) {
    throw new Error(
      "useClientFiltersForm must be used within a ClientFiltersFormProvider",
    );
  }
  return context;
}

export function useClientFiltersFormDispatch() {
  const context = useContext(ClientFiltersFormDispatchContext);
  if (context === null) {
    throw new Error(
      "useClientFiltersFormDispatch must be used within a ClientFiltersFormProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type ClientFiltersFormAction =
  | { type: "changeHasNoActiveProjects"; payload: boolean }
  | { type: "changeHasActiveProjects"; payload: boolean }
  | { type: "changeHasOverdueProjects"; payload: boolean }
  | { type: "setCompanyIds"; payload: string[] }
  | { type: "resetFilters" };

interface ClientFiltersFormState {
  hasNoActiveProjects: boolean;
  hasActiveProjects: boolean;
  hasOverdueProjects: boolean;
  companyIds: string[];
}

function createInitialState(
  initialFilters?: ClientFilters,
): ClientFiltersFormState {
  return {
    hasNoActiveProjects: initialFilters?.hasNoActiveProjects ?? false,
    hasActiveProjects: initialFilters?.hasActiveProjects ?? false,
    hasOverdueProjects: initialFilters?.hasOverdueProjects ?? false,
    companyIds: initialFilters?.companyIds?.map((id) => id.toString()) ?? [],
  };
}

function clientFiltersReducer(
  state: ClientFiltersFormState,
  action: ClientFiltersFormAction,
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
