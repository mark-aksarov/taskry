"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";

const DeleteProjectCategoriesContext =
  createContext<DeleteEntitiesContextType | null>(null);

interface DeleteProjectCategoriesProviderProps {
  deleteProjectCategories: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteProjectCategoriesProvider({
  deleteProjectCategories,
  children,
}: DeleteProjectCategoriesProviderProps) {
  const contextValue = useDeleteEntitiesContextValue(deleteProjectCategories);

  const { state } = contextValue;
  useToastOnActionError(state);

  return (
    <DeleteProjectCategoriesContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoriesContext.Provider>
  );
}

export function useDeleteProjectCategories() {
  const context = useContext(DeleteProjectCategoriesContext);
  if (!context)
    throw new Error(
      "useDeleteProjectCategories must be used within a DeleteProjectCategoriesProvider",
    );
  return context;
}
