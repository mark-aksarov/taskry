"use client";

import {
  useDeleteEntitiesState,
  DeleteEntitiesContextType,
} from "@/lib/hooks/useDeleteEntitiesState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const DeleteProjectCategoriesContext = createContext<DeleteEntitiesContextType<
  number[]
> | null>(null);

export function DeleteProjectCategoriesProvider({
  deleteProjectCategories,
  children,
}: {
  deleteProjectCategories: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntitiesState(deleteProjectCategories);
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
