"use client";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";
import { createContext, useActionState, useContext, useMemo } from "react";

interface UpdateTaskStatusContextType {
  updateTaskStatusState: ActionState;
  updateTaskStatusAction: (payload: UpdateTaskStatusesPayload) => void;
  isUpdateTaskStatusPending: boolean;
}

const UpdateTaskStatusContext =
  createContext<UpdateTaskStatusContextType | null>(null);

interface UpdateTaskStatusProviderProps {
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
  children: React.ReactNode;
}

const initialState: ActionState = {
  status: null,
};

export function UpdateTaskStatusProvider({
  updateTaskStatus,
  children,
}: UpdateTaskStatusProviderProps) {
  const [
    updateTaskStatusState,
    updateTaskStatusAction,
    isUpdateTaskStatusPending,
  ] = useActionState(updateTaskStatus, initialState);

  const contextValue = useMemo(
    () => ({
      updateTaskStatusState,
      updateTaskStatusAction,
      isUpdateTaskStatusPending,
    }),
    [updateTaskStatusState, updateTaskStatusAction, isUpdateTaskStatusPending],
  );

  return (
    <UpdateTaskStatusContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusContext.Provider>
  );
}

export function useUpdateTaskStatusContext() {
  const context = useContext(UpdateTaskStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatusContext must be used within a UpdateTaskStatusProvider",
    );
  }
  return context;
}
