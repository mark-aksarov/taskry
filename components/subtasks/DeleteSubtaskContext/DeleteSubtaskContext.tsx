"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { useContext, createContext, useEffect } from "react";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

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
  const refreshTaskDetail = useRefreshTaskDetail(taskId);
  const contextValue = useDeleteEntityContextValue(deleteSubtask);
  const { state } = contextValue;

  useEffect(() => {
    refreshTaskDetail();
  }, [state, refreshTaskDetail]);

  useShowToastOnActionError(state);

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
