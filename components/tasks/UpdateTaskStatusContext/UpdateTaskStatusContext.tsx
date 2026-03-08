"use client";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusPayload,
} from "@/lib/actions/types";

import {
  UpdateEntityStatusContextType,
  useUpdateEntityStatusContextValue,
} from "@/lib/hooks/useUpdateEntityStatusContextValue";

import { useContext, createContext } from "react";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const UpdateTaskStatusContext =
  createContext<UpdateEntityStatusContextType | null>(null);

interface UpdateTaskStatusProviderProps {
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusPayload>;
  children: React.ReactNode;
}

export function UpdateTaskStatusProvider({
  updateTaskStatus,
  children,
}: UpdateTaskStatusProviderProps) {
  const contextValue = useUpdateEntityStatusContextValue(updateTaskStatus);

  const { state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionError(state);

  return (
    <UpdateTaskStatusContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusContext.Provider>
  );
}

export function useUpdateTaskStatus() {
  const context = useContext(UpdateTaskStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatus must be used within a UpdateTaskStatusProvider",
    );
  }
  return context;
}
