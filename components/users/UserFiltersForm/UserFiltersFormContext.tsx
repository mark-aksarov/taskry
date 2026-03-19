"use client";

import { UserFilters } from "@/lib/types";
import { useReducer, useContext, createContext } from "react";

export const UserFiltersFormContext =
  createContext<UserFiltersFormState | null>(null);

export const UserFiltersFormDispatchContext =
  createContext<React.Dispatch<UserFiltersFormAction> | null>(null);

interface UserFiltersFormProviderProps {
  initialFilters?: UserFilters;
  children: React.ReactNode;
}

export const UserFiltersFormProvider = ({
  initialFilters,
  children,
}: UserFiltersFormProviderProps) => {
  const [filters, dispatch] = useReducer(
    UserFiltersFormReducer,
    createInitialState(initialFilters),
  );

  return (
    <UserFiltersFormContext.Provider value={filters}>
      <UserFiltersFormDispatchContext.Provider value={dispatch}>
        {children}
      </UserFiltersFormDispatchContext.Provider>
    </UserFiltersFormContext.Provider>
  );
};

export function useUserFiltersForm() {
  const context = useContext(UserFiltersFormContext);
  if (context === null) {
    throw new Error(
      "useUserFiltersForm must be used within a UserFiltersFormProvider",
    );
  }
  return context;
}

export function useUserFiltersFormDispatch() {
  const context = useContext(UserFiltersFormDispatchContext);
  if (context === null) {
    throw new Error(
      "useUserFiltersFormDispatch must be used within a UserFiltersFormProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type UserFiltersFormAction =
  | { type: "changeHasNoActiveTasks"; payload: boolean }
  | { type: "changeHasActiveTasks"; payload: boolean }
  | { type: "changeHasOverdueTasks"; payload: boolean }
  | { type: "setPositionIds"; payload: string[] }
  | { type: "resetFilters" };

interface UserFiltersFormState {
  hasNoActiveTasks: boolean;
  hasActiveTasks: boolean;
  hasOverdueTasks: boolean;
  positionIds: string[];
}

function createInitialState(
  initialFilters?: UserFilters,
): UserFiltersFormState {
  return {
    hasNoActiveTasks: initialFilters?.hasNoActiveTasks ?? false,
    hasActiveTasks: initialFilters?.hasActiveTasks ?? false,
    hasOverdueTasks: initialFilters?.hasOverdueTasks ?? false,
    positionIds: initialFilters?.positionIds?.map((id) => id.toString()) ?? [],
  };
}

export function UserFiltersFormReducer(
  state: UserFiltersFormState,
  action: UserFiltersFormAction,
) {
  switch (action.type) {
    case "changeHasNoActiveTasks":
      return { ...state, hasNoActiveTasks: action.payload };
    case "changeHasActiveTasks":
      return { ...state, hasActiveTasks: action.payload };
    case "changeHasOverdueTasks":
      return { ...state, hasOverdueTasks: action.payload };
    case "setPositionIds":
      return { ...state, positionIds: action.payload };
    case "resetFilters":
      return {
        hasNoActiveTasks: false,
        hasActiveTasks: false,
        hasOverdueTasks: false,
        positionIds: [],
      };
    default:
      return state;
  }
}
