"use client";

import {
  UpdateTaskStatusProviderProps,
  BaseUpdateTaskStatusContextType,
  useBaseUpdateTaskStatusContextState,
} from "./BaseUpdateTaskStatusContext";

import { createContext, useContext } from "react";

const UpdateTaskStatusesContext =
  createContext<BaseUpdateTaskStatusContextType | null>(null);

export function UpdateTaskStatusesProvider({
  updateTaskStatus,
  children,
}: UpdateTaskStatusProviderProps) {
  const value = useBaseUpdateTaskStatusContextState(updateTaskStatus);

  return (
    <UpdateTaskStatusesContext.Provider value={value}>
      {children}
    </UpdateTaskStatusesContext.Provider>
  );
}

export function useUpdateTaskStatusesContext() {
  const context = useContext(UpdateTaskStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatusesContext must be used within a UpdateTaskStatusesProvider",
    );
  }
  return context;
}
