"use client";

import { UserFilters } from "@/lib/types";
import { useReducer, useContext, createContext } from "react";

export const UserFiltersContext = createContext<UserFiltersState | null>(null);

export const UserFiltersDispatchContext =
  createContext<React.Dispatch<UserFiltersAction> | null>(null);

interface UserFiltersProviderProps {
  initialFilters?: UserFilters;
  children: React.ReactNode;
}

export const UserFiltersProvider = ({
  initialFilters,
  children,
}: UserFiltersProviderProps) => {
  const [filters, dispatch] = useReducer(
    UserFiltersReducer,
    createInitialState(initialFilters),
  );

  return (
    <UserFiltersContext.Provider value={filters}>
      <UserFiltersDispatchContext.Provider value={dispatch}>
        {children}
      </UserFiltersDispatchContext.Provider>
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

export function useUserFiltersDispatch() {
  const context = useContext(UserFiltersDispatchContext);
  if (context === null) {
    throw new Error(
      "useUserFiltersDispatch must be used within a UserFiltersProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type UserFiltersAction =
  | { type: "changeHasNoActiveTasks"; payload: boolean }
  | { type: "changeHasActiveTasks"; payload: boolean }
  | { type: "changeHasOverdueTasks"; payload: boolean }
  | { type: "setPosition"; payload: string[] }
  | { type: "resetFilters" };

interface UserFiltersState {
  hasNoActiveTasks: boolean;
  hasActiveTasks: boolean;
  hasOverdueTasks: boolean;
  position: string[];
}

function createInitialState(initialFilters?: UserFilters): UserFiltersState {
  return {
    hasNoActiveTasks: initialFilters?.hasNoActiveTasks ?? false,
    hasActiveTasks: initialFilters?.hasActiveTasks ?? false,
    hasOverdueTasks: initialFilters?.hasOverdueTasks ?? false,
    position: initialFilters?.position?.map((id) => id.toString()) ?? [],
  };
}

export function UserFiltersReducer(
  state: UserFiltersState,
  action: UserFiltersAction,
) {
  switch (action.type) {
    case "changeHasNoActiveTasks":
      return { ...state, hasNoActiveTasks: action.payload };
    case "changeHasActiveTasks":
      return { ...state, hasActiveTasks: action.payload };
    case "changeHasOverdueTasks":
      return { ...state, hasOverdueTasks: action.payload };
    case "setPosition":
      return { ...state, position: action.payload };
    case "resetFilters":
      return {
        hasNoActiveTasks: false,
        hasActiveTasks: false,
        hasOverdueTasks: false,
        position: [],
      };
    default:
      return state;
  }
}
