"use client";

import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { useMemo, useContext, createContext } from "react";
import { useDeleteActionState } from "@/lib/hooks/useDeleteActionState";

interface DeleteTaskContextType {
  action: (payload: DeleteTasksPayload) => void;
  isPending: boolean;
}

const DeleteTaskContext = createContext<DeleteTaskContextType | null>(null);

interface DeleteTaskProviderProps {
  deleteTask: ActionFn<ActionState, DeleteTasksPayload>;
  children: React.ReactNode;
}

export function DeleteTaskProvider({
  deleteTask,
  children,
}: DeleteTaskProviderProps) {
  const t = useTranslations("tasks.DeleteTaskProvider");

  const [, action, isPending] = useDeleteActionState({
    deleteEntity: deleteTask,
    successMessage: t("successMessage"),
  });

  const contextValue = useMemo(
    () => ({ action, isPending }),
    [action, isPending],
  );

  return (
    <DeleteTaskContext.Provider value={contextValue}>
      {children}
    </DeleteTaskContext.Provider>
  );
}

export function useDeleteTaskContext() {
  const context = useContext(DeleteTaskContext);
  if (!context) {
    throw new Error(
      "useDeleteTaskContext must be used within a DeleteTaskProvider",
    );
  }
  return context;
}
