"use client";

import {
  useDeleteEntitiesState,
  DeleteEntitiesContextType,
} from "@/lib/hooks/useDeleteEntitiesState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const DeleteTaskCategoriesContext = createContext<DeleteEntitiesContextType<
  number[]
> | null>(null);

export function DeleteTaskCategoriesProvider({
  deleteTaskCategories,
  children,
}: {
  deleteTaskCategories: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntitiesState(deleteTaskCategories);
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
