"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { ActionContextType, DeleteTaskPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const DeleteTaskContext =
  createContext<ActionContextType<DeleteTaskPayload> | null>(null);

interface DeleteTaskProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskProvider({ children }: DeleteTaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

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
    throw new Error(
      "useDeleteTask must be used within DeleteTaskContext.Provider",
    );
  return context;
}
