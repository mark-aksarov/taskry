"use client";

import { ProjectFilters } from "@/lib/types";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useReducer, useContext, createContext } from "react";
import { CalendarDate, parseDate } from "@internationalized/date";

export const ProjectFiltersContext = createContext<ProjectFiltersState | null>(
  null,
);

export const ProjectFiltersDispatchContext =
  createContext<React.Dispatch<ProjectFiltersAction> | null>(null);

interface ProjectFiltersProviderProps {
  initialFilters?: ProjectFilters;
  children: React.ReactNode;
}

export const ProjectFiltersProvider = ({
  initialFilters,
  children,
}: ProjectFiltersProviderProps) => {
  const [filters, dispatch] = useReducer(
    projectFiltersReducer,
    createInitialState(initialFilters),
  );

  return (
    <ProjectFiltersContext.Provider value={filters}>
      <ProjectFiltersDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectFiltersDispatchContext.Provider>
    </ProjectFiltersContext.Provider>
  );
};

export function useProjectFilters() {
  const context = useContext(ProjectFiltersContext);
  if (context === null) {
    throw new Error(
      "useProjectFilters must be used within a ProjectFiltersProvider",
    );
  }
  return context;
}

export function useProjectFiltersDispatch() {
  const context = useContext(ProjectFiltersDispatchContext);
  if (context === null) {
    throw new Error(
      "useProjectFiltersDispatch must be used within a ProjectFiltersProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type ProjectFiltersAction =
  | { type: "changeNoActiveTasks"; payload: boolean }
  | { type: "changeDeadlineFrom"; payload: CalendarDate | null }
  | { type: "changeDeadlineTo"; payload: CalendarDate | null }
  | { type: "setStatus"; payload: ProjectStatus[] }
  | { type: "setUser"; payload: string[] }
  | { type: "setCategory"; payload: string[] }
  | { type: "setCustomer"; payload: string[] }
  | { type: "resetFilters" };

interface ProjectFiltersState {
  noActiveTasks: boolean;
  deadlineFrom: CalendarDate | null;
  deadlineTo: CalendarDate | null;
  status: ProjectStatus[];
  user: string[];
  category: string[];
  customer: string[];
}

function createInitialState(
  initialFilters?: ProjectFilters,
): ProjectFiltersState {
  return {
    noActiveTasks: initialFilters?.noActiveTasks ?? false,
    deadlineFrom: initialFilters?.deadlineFrom
      ? parseDate(initialFilters.deadlineFrom)
      : null,
    deadlineTo: initialFilters?.deadlineTo
      ? parseDate(initialFilters.deadlineTo)
      : null,
    status: initialFilters?.status ?? [],
    user: initialFilters?.user ?? [],
    category: initialFilters?.category?.map((id) => id.toString()) ?? [],
    customer: initialFilters?.customer?.map((id) => id.toString()) ?? [],
  };
}

export function projectFiltersReducer(
  state: ProjectFiltersState,
  action: ProjectFiltersAction,
) {
  switch (action.type) {
    case "changeNoActiveTasks":
      return { ...state, noActiveTasks: action.payload };
    case "changeDeadlineFrom":
      return { ...state, deadlineFrom: action.payload };
    case "changeDeadlineTo":
      return { ...state, deadlineTo: action.payload };
    case "setStatus":
      return { ...state, status: action.payload };
    case "setUser":
      return { ...state, user: action.payload };
    case "setCategory":
      return { ...state, category: action.payload };
    case "setCustomer":
      return { ...state, customer: action.payload };
    case "resetFilters":
      return {
        noActiveTasks: false,
        deadlineFrom: null,
        deadlineTo: null,
        status: [],
        user: [],
        category: [],
        customer: [],
      };
    default:
      return state;
  }
}
