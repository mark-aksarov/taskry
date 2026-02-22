"use client";

import { TaskFilters } from "@/lib/types";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useReducer, useContext, createContext } from "react";
import { CalendarDate, parseDate } from "@internationalized/date";

export const TaskFiltersContext = createContext<TaskFiltersState | null>(null);

export const TaskFiltersDispatchContext =
  createContext<React.Dispatch<TaskFiltersAction> | null>(null);

interface TaskFiltersProviderProps {
  initialFilters?: TaskFilters;
  children: React.ReactNode;
}

export const TaskFiltersProvider = ({
  initialFilters,
  children,
}: TaskFiltersProviderProps) => {
  const [filters, dispatch] = useReducer(
    taskFiltersReducer,
    createInitialState(initialFilters),
  );

  return (
    <TaskFiltersContext.Provider value={filters}>
      <TaskFiltersDispatchContext.Provider value={dispatch}>
        {children}
      </TaskFiltersDispatchContext.Provider>
    </TaskFiltersContext.Provider>
  );
};

export function useTaskFilters() {
  const context = useContext(TaskFiltersContext);
  if (context === null) {
    throw new Error("useTaskFilters must be used within a TaskFiltersProvider");
  }
  return context;
}

export function useTaskFiltersDispatch() {
  const context = useContext(TaskFiltersDispatchContext);
  if (context === null) {
    throw new Error(
      "useTaskFiltersDispatch must be used within a TaskFiltersProvider",
    );
  }
  return context;
}

// Project filters reducer, action and state

type TaskFiltersAction =
  | { type: "changeOnlyMyTasks"; payload: boolean }
  | { type: "changeDeadlineFrom"; payload: CalendarDate | null }
  | { type: "changeDeadlineTo"; payload: CalendarDate | null }
  | { type: "setStatus"; payload: ProjectStatus[] }
  | { type: "setAssignee"; payload: string[] }
  | { type: "setCategory"; payload: string[] }
  | { type: "setProject"; payload: string[] }
  | { type: "resetFilters" };

interface TaskFiltersState {
  onlyMyTasks: boolean;
  deadlineFrom: CalendarDate | null;
  deadlineTo: CalendarDate | null;
  status: ProjectStatus[];
  assignee: string[];
  category: string[];
  project: string[];
}

function createInitialState(initialFilters?: TaskFilters): TaskFiltersState {
  return {
    onlyMyTasks: initialFilters?.onlyMyTasks ?? false,
    deadlineFrom: initialFilters?.deadlineFrom
      ? parseDate(initialFilters.deadlineFrom)
      : null,
    deadlineTo: initialFilters?.deadlineTo
      ? parseDate(initialFilters.deadlineTo)
      : null,
    status: initialFilters?.status ?? [],
    assignee: initialFilters?.assignee ?? [],
    category: initialFilters?.category?.map((id) => id.toString()) ?? [],
    project: initialFilters?.project?.map((id) => id.toString()) ?? [],
  };
}

export function taskFiltersReducer(
  state: TaskFiltersState,
  action: TaskFiltersAction,
) {
  switch (action.type) {
    case "changeOnlyMyTasks":
      return { ...state, onlyMyTasks: action.payload };
    case "changeDeadlineFrom":
      return { ...state, deadlineFrom: action.payload };
    case "changeDeadlineTo":
      return { ...state, deadlineTo: action.payload };
    case "setStatus":
      return { ...state, status: action.payload };
    case "setAssignee":
      return { ...state, assignee: action.payload };
    case "setCategory":
      return { ...state, category: action.payload };
    case "setProject":
      return { ...state, project: action.payload };
    case "resetFilters":
      return {
        onlyMyTasks: false,
        deadlineFrom: null,
        deadlineTo: null,
        status: [],
        assignee: [],
        category: [],
        project: [],
      };
    default:
      return state;
  }
}
