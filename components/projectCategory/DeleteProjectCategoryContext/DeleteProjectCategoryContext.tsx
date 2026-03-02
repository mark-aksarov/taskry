"use client";

import {
  useDeleteEntityState,
  DeleteEntityContextType,
} from "@/lib/hooks/useDeleteEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const DeleteProjectCategoryContext = createContext<DeleteEntityContextType<
  number[]
> | null>(null);

export function DeleteProjectCategoryProvider({
  deleteProjectCategory,
  children,
}: {
  deleteProjectCategory: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntityState(deleteProjectCategory);

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
