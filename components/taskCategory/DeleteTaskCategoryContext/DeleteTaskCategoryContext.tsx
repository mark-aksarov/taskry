"use client";

import { useTranslations } from "next-intl";
import { useMemo, useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteActionState } from "@/lib/hooks/useDeleteActionState";

interface DeleteTaskCategoryContextType {
  action: (payload: number[]) => void;
  isPending: boolean;
}

const DeleteTaskCategoryContext =
  createContext<DeleteTaskCategoryContextType | null>(null);

interface DeleteTaskCategoryProviderProps {
  deleteTaskCategory: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteTaskCategoryProvider({
  deleteTaskCategory,
  children,
}: DeleteTaskCategoryProviderProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoryProvider");

  const [, action, isPending] = useDeleteActionState({
    deleteEntity: deleteTaskCategory,
    successMessage: t("successMessage"),
  });

  const contextValue = useMemo(
    () => ({ action, isPending }),
    [action, isPending],
  );

  return (
    <DeleteTaskCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoryContext.Provider>
  );
}

export function useDeleteTaskCategoryContext() {
  const context = useContext(DeleteTaskCategoryContext);
  if (!context) {
    throw new Error(
      "useDeleteTaskCategoryContext must be used within a DeleteTaskCategoryProvider",
    );
  }
  return context;
}
