"use client";

import {
  UpdateEntityStatusesContextType,
  useUpdateEntityStatusesContextValue,
} from "@/lib/hooks/useUpdateEntityStatusesContextValue";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { useContext, createContext } from "react";

const UpdateTaskStatusesContext =
  createContext<UpdateEntityStatusesContextType | null>(null);

interface UpdateTaskStatusesProviderProps {
  updateTaskStatuses: ActionFn<ActionState, UpdateTaskStatusesPayload>;
  children: React.ReactNode;
}

export function UpdateTaskStatusesProvider({
  updateTaskStatuses,
  children,
}: UpdateTaskStatusesProviderProps) {
  const contextValue = useUpdateEntityStatusesContextValue(updateTaskStatuses);

  return (
    <UpdateTaskStatusesContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusesContext.Provider>
  );
}

export function useUpdateTaskStatuses() {
  const context = useContext(UpdateTaskStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatuses must be used within a UpdateTaskStatusesProvider",
    );
  }
  return context;
}
