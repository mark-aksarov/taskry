"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useRefreshTaskDetailOnActionSuccess } from "@/lib/hooks/useRefreshTaskDetailOnActionSuccess";

const DeleteSubtaskContext =
  createContext<DeleteEntityContextType<number> | null>(null);

interface DeleteSubtaskProviderProps {
  taskId: number;
  deleteSubtask: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeleteSubtaskProvider({
  taskId,
  deleteSubtask,
  children,
}: DeleteSubtaskProviderProps) {
  const contextValue = useDeleteEntityContextValue(deleteSubtask);

  const { state } = contextValue;
  useToastOnActionError(state);
  useRefreshTaskDetailOnActionSuccess(state, taskId);

  return (
    <DeleteSubtaskContext.Provider value={contextValue}>
      {children}
    </DeleteSubtaskContext.Provider>
  );
}

export function useDeleteSubtask() {
  const context = useContext(DeleteSubtaskContext);
  if (!context)
    throw new Error(
      "useDeleteSubtask must be used within DeleteSubtaskProvider",
    );
  return context;
}
