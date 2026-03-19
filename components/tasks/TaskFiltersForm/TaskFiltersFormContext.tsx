"use client";

import { TaskFilters } from "@/lib/types";
import { TaskStatus } from "@/generated/prisma/enums";
import { useReducer, useContext, createContext } from "react";
import { CalendarDate, parseDate } from "@internationalized/date";

export const TaskFiltersFormContext =
  createContext<TaskFiltersFormState | null>(null);

export const TaskFiltersFormDispatchContext =
  createContext<React.Dispatch<TaskFiltersFormAction> | null>(null);

interface TaskFiltersFormProviderProps {
  initialFilters?: TaskFilters;
  children: React.ReactNode;
}

export const TaskFiltersFormProvider = ({
  initialFilters,
  children,
}: TaskFiltersFormProviderProps) => {
  const [filters, dispatch] = useReducer(
    taskFiltersReducer,
    createInitialState(initialFilters),
  );

  return (
    <TaskFiltersFormContext.Provider value={filters}>
      <TaskFiltersFormDispatchContext.Provider value={dispatch}>
        {children}
      </TaskFiltersFormDispatchContext.Provider>
    </TaskFiltersFormContext.Provider>
  );
};

export function useTaskFiltersForm() {
  const context = useContext(TaskFiltersFormContext);
  if (context === null) {
    throw new Error(
      "useTaskFiltersForm must be used within a TaskFiltersFormProvider",
    );
  }
  return context;
}

export function useTaskFiltersFormDispatch() {
  const context = useContext(TaskFiltersFormDispatchContext);
  if (context === null) {
    throw new Error(
      "useTaskFiltersFormDispatch must be used within a TaskFiltersFormProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type TaskFiltersFormAction =
  | { type: "changeOnlyMyTasks"; payload: boolean }
  | { type: "changeDeadlineFrom"; payload: CalendarDate | null }
  | { type: "changeDeadlineTo"; payload: CalendarDate | null }
  | { type: "setStatuses"; payload: TaskStatus[] }
  | { type: "setAssigneeIds"; payload: string[] }
  | { type: "setCategoryIds"; payload: string[] }
  | { type: "setProjectIds"; payload: string[] }
  | { type: "resetFilters" };

interface TaskFiltersFormState {
  onlyMyTasks: boolean;
  deadlineFrom: CalendarDate | null;
  deadlineTo: CalendarDate | null;
  statuses: TaskStatus[];
  assigneeIds: string[];
  categoryIds: string[];
  projectIds: string[];
}

function createInitialState(
  initialFilters?: TaskFilters,
): TaskFiltersFormState {
  return {
    onlyMyTasks: initialFilters?.onlyMyTasks ?? false,
    deadlineFrom: initialFilters?.deadlineFrom
      ? parseDate(initialFilters.deadlineFrom)
      : null,
    deadlineTo: initialFilters?.deadlineTo
      ? parseDate(initialFilters.deadlineTo)
      : null,
    statuses: initialFilters?.statuses ?? [],
    assigneeIds: initialFilters?.assigneeIds ?? [],
    categoryIds: initialFilters?.categoryIds?.map((id) => id.toString()) ?? [],
    projectIds: initialFilters?.projectIds?.map((id) => id.toString()) ?? [],
  };
}

export function taskFiltersReducer(
  state: TaskFiltersFormState,
  action: TaskFiltersFormAction,
) {
  switch (action.type) {
    case "changeOnlyMyTasks":
      return { ...state, onlyMyTasks: action.payload };
    case "changeDeadlineFrom":
      return { ...state, deadlineFrom: action.payload };
    case "changeDeadlineTo":
      return { ...state, deadlineTo: action.payload };
    case "setStatuses":
      return { ...state, statuses: action.payload };
    case "setAssigneeIds":
      return { ...state, assigneeIds: action.payload };
    case "setCategoryIds":
      return { ...state, categoryIds: action.payload };
    case "setProjectIds":
      return { ...state, projectIds: action.payload };
    case "resetFilters":
      return {
        onlyMyTasks: false,
        deadlineFrom: null,
        deadlineTo: null,
        statuses: [],
        assigneeIds: [],
        categoryIds: [],
        projectIds: [],
      };
    default:
      return state;
  }
}
