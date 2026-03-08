"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const DeleteTaskCategoriesContext =
  createContext<DeleteEntitiesContextType | null>(null);

interface DeleteTaskCategoriesProviderProps {
  deleteTaskCategories: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteTaskCategoriesProvider({
  deleteTaskCategories,
  children,
}: DeleteTaskCategoriesProviderProps) {
  const contextValue = useDeleteEntitiesContextValue(deleteTaskCategories);

  const { state } = contextValue;

  // wait for transition to finish
  useShowToastOnActionError(state);

  return (
    <DeleteTaskCategoriesContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoriesContext.Provider>
  );
}

export function useDeleteTaskCategories() {
  const context = useContext(DeleteTaskCategoriesContext);
  if (!context)
    throw new Error(
      "useDeleteTaskCategories must be used within a DeleteTaskCategoriesProvider",
    );
  return context;
}
