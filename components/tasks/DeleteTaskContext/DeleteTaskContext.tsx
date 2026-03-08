"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState, DeleteTaskPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const DeleteTaskContext =
  createContext<DeleteEntityContextType<DeleteTaskPayload> | null>(null);

interface DeleteTaskProviderProps {
  deleteTask: ActionFn<ActionState, DeleteTaskPayload>;
  children: React.ReactNode;
}

export function DeleteTaskProvider({
  deleteTask,
  children,
}: DeleteTaskProviderProps) {
  const contextValue = useDeleteEntityContextValue(deleteTask);

  const { state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionError(state);

  return (
    <DeleteTaskContext.Provider value={contextValue}>
      {children}
    </DeleteTaskContext.Provider>
  );
}

export function useDeleteTask() {
  const context = useContext(DeleteTaskContext);
  if (!context)
    throw new Error("useDeleteTask must be used within DeleteTaskProvider");
  return context;
}
