"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";

const DeleteTaskCategoryContext =
  createContext<DeleteEntityContextType<number> | null>(null);

interface DeleteTaskCategoryProviderProps {
  deleteTaskCategory: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeleteTaskCategoryProvider({
  deleteTaskCategory,
  children,
}: DeleteTaskCategoryProviderProps) {
  const contextValue = useDeleteEntityContextValue(deleteTaskCategory);

  const { state } = contextValue;
  useToastOnActionError(state);

  return (
    <DeleteTaskCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoryContext.Provider>
  );
}

export function useDeleteTaskCategory() {
  const context = useContext(DeleteTaskCategoryContext);
  if (!context)
    throw new Error(
      "useDeleteTaskCategory must be used within DeleteTaskCategoryProvider",
    );
  return context;
}
