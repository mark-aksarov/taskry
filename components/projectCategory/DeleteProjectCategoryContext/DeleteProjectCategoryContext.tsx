"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useRefreshProjectCategories } from "@/lib/hooks/useRefreshProjectCategories";

const DeleteProjectCategoryContext =
  createContext<DeleteEntityContextType<number> | null>(null);

interface DeleteProjectCategoryProviderProps {
  deleteProjectCategory: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeleteProjectCategoryProvider({
  deleteProjectCategory,
  children,
}: DeleteProjectCategoryProviderProps) {
  const refreshProjectCategories = useRefreshProjectCategories();

  // Refresh inside reducerAction after successful deletion
  const contextValue = useDeleteEntityContextValue(
    deleteProjectCategory,
    refreshProjectCategories,
  );

  const { state } = contextValue;
  useToastOnActionError(state);

  // Can't call this hook here — provider unmounts after successful deletion
  // useRefreshProjectCategoriesOnActionSuccess(state);

  return (
    <DeleteProjectCategoryContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoryContext.Provider>
  );
}

export function useDeleteProjectCategory() {
  const context = useContext(DeleteProjectCategoryContext);
  if (!context)
    throw new Error(
      "useDeleteProjectCategory must be used within DeleteProjectCategoryProvider",
    );
  return context;
}
