"use client";

import { useTranslations } from "next-intl";
import { useMemo, useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteActionState } from "@/lib/hooks/useDeleteActionState";

interface DeleteSubtaskContextType {
  action: (payload: number) => void;
  isPending: boolean;
}

const DeleteSubtaskContext = createContext<DeleteSubtaskContextType | null>(
  null,
);

interface DeleteSubtaskProviderProps {
  deleteSubtask: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeleteSubtaskProvider({
  deleteSubtask,
  children,
}: DeleteSubtaskProviderProps) {
  const t = useTranslations("subtasks.DeleteSubtaskProvider");

  const [, action, isPending] = useDeleteActionState({
    deleteEntity: deleteSubtask,
    successMessage: t("successMessage"),
  });

  const contextValue = useMemo(
    () => ({ action, isPending }),
    [action, isPending],
  );

  return (
    <DeleteSubtaskContext.Provider value={contextValue}>
      {children}
    </DeleteSubtaskContext.Provider>
  );
}

export function useDeleteSubtaskContext() {
  const context = useContext(DeleteSubtaskContext);
  if (!context) {
    throw new Error(
      "useDeleteSubtaskContext must be used within a DeleteSubtaskProvider",
    );
  }
  return context;
}
