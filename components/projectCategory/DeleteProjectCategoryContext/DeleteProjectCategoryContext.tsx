"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

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
  const contextValue = useDeleteEntityContextValue(deleteProjectCategory);

  const { state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionError(state);

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
