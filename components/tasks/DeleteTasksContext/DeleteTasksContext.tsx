"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const DeleteTasksContext = createContext<DeleteEntitiesContextType | null>(
  null,
);

interface DeleteTasksProviderProps {
  deleteTasks: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteTasksProvider({
  deleteTasks,
  children,
}: DeleteTasksProviderProps) {
  const contextValue = useDeleteEntitiesContextValue(deleteTasks);

  const { state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionError(state);

  return (
    <DeleteTasksContext.Provider value={contextValue}>
      {children}
    </DeleteTasksContext.Provider>
  );
}

export function useDeleteTasks() {
  const context = useContext(DeleteTasksContext);
  if (!context)
    throw new Error("useDeleteTasks must be used within a DeleteTasksProvider");
  return context;
}
