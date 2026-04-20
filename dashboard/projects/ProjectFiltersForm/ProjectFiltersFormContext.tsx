"use client";

import { ProjectFilters } from "@/lib/types";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useReducer, useContext, createContext } from "react";
import { CalendarDate, parseDate } from "@internationalized/date";

export const ProjectFiltersFormContext =
  createContext<ProjectFiltersFormState | null>(null);

export const ProjectFiltersFormDispatchContext =
  createContext<React.Dispatch<ProjectFiltersFormAction> | null>(null);

interface ProjectFiltersFormProviderProps {
  initialFilters?: ProjectFilters;
  children: React.ReactNode;
}

export const ProjectFiltersFormProvider = ({
  initialFilters,
  children,
}: ProjectFiltersFormProviderProps) => {
  const [filters, dispatch] = useReducer(
    projectFiltersReducer,
    createInitialState(initialFilters),
  );

  return (
    <ProjectFiltersFormContext.Provider value={filters}>
      <ProjectFiltersFormDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectFiltersFormDispatchContext.Provider>
    </ProjectFiltersFormContext.Provider>
  );
};

export function useProjectFiltersForm() {
  const context = useContext(ProjectFiltersFormContext);
  if (context === null) {
    throw new Error(
      "useProjectFiltersForm must be used within a ProjectFiltersFormProvider",
    );
  }
  return context;
}

export function useProjectFiltersFormDispatch() {
  const context = useContext(ProjectFiltersFormDispatchContext);
  if (context === null) {
    throw new Error(
      "useProjectFiltersFormDispatch must be used within a ProjectFiltersFormProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type ProjectFiltersFormAction =
  | { type: "changeNoActiveTasks"; payload: boolean }
  | { type: "changeDeadlineFrom"; payload: CalendarDate | null }
  | { type: "changeDeadlineTo"; payload: CalendarDate | null }
  | { type: "setStatuses"; payload: ProjectStatus[] }
  | { type: "setCreatorIds"; payload: string[] }
  | { type: "setCategoryIds"; payload: string[] }
  | { type: "setCustomerIds"; payload: string[] }
  | { type: "resetFilters" };

interface ProjectFiltersFormState {
  noActiveTasks: boolean;
  deadlineFrom: CalendarDate | null;
  deadlineTo: CalendarDate | null;
  statuses: ProjectStatus[];
  creatorIds: string[];
  categoryIds: string[];
  customerIds: string[];
}

function createInitialState(
  initialFilters?: ProjectFilters,
): ProjectFiltersFormState {
  return {
    noActiveTasks: initialFilters?.noActiveTasks ?? false,
    deadlineFrom: initialFilters?.deadlineFrom
      ? parseDate(initialFilters.deadlineFrom)
      : null,
    deadlineTo: initialFilters?.deadlineTo
      ? parseDate(initialFilters.deadlineTo)
      : null,
    statuses: initialFilters?.statuses ?? [],
    creatorIds: initialFilters?.creatorIds ?? [],
    categoryIds: initialFilters?.categoryIds?.map((id) => id.toString()) ?? [],
    customerIds: initialFilters?.customerIds?.map((id) => id.toString()) ?? [],
  };
}

export function projectFiltersReducer(
  state: ProjectFiltersFormState,
  action: ProjectFiltersFormAction,
) {
  switch (action.type) {
    case "changeNoActiveTasks":
      return { ...state, noActiveTasks: action.payload };
    case "changeDeadlineFrom":
      return { ...state, deadlineFrom: action.payload };
    case "changeDeadlineTo":
      return { ...state, deadlineTo: action.payload };
    case "setStatuses":
      return { ...state, statuses: action.payload };
    case "setCreatorIds":
      return { ...state, creatorIds: action.payload };
    case "setCategoryIds":
      return { ...state, categoryIds: action.payload };
    case "setCustomerIds":
      return { ...state, customerIds: action.payload };
    case "resetFilters":
      return {
        noActiveTasks: false,
        deadlineFrom: null,
        deadlineTo: null,
        statuses: [],
        creatorIds: [],
        categoryIds: [],
        customerIds: [],
      };
    default:
      return state;
  }
}
