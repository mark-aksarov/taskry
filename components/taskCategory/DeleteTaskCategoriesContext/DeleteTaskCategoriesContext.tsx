"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useRefreshTaskCategoriesOnActionSuccess } from "@/lib/hooks/useRefreshTaskCategoriesOnActionSuccess";

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
  // Refresh users after successful deletion, since side effects outside the reducerAction may fail
  const contextValue = useDeleteEntitiesContextValue(deleteTaskCategories);

  const { state } = contextValue;
  useToastOnActionError(state);
  useRefreshTaskCategoriesOnActionSuccess(state);

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
