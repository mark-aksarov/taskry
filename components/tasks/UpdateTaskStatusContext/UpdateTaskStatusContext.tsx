"use client";

import {
  UpdateEntityStatusContextType,
  useUpdateEntityStatusContextValue,
} from "@/lib/hooks/useUpdateEntityStatusContextValue";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusPayload,
} from "@/lib/actions/types";

import { useContext, createContext } from "react";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";

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
  useToastOnActionError(state);

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
