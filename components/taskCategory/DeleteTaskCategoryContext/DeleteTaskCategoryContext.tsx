"use client";

import {
  useDeleteEntityState,
  DeleteEntityContextType,
} from "@/lib/hooks/useDeleteEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const DeleteTaskCategoryContext = createContext<DeleteEntityContextType<
  number[]
> | null>(null);

export function DeleteTaskCategoryProvider({
  deleteTaskCategory,
  children,
}: {
  deleteTaskCategory: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntityState(deleteTaskCategory);

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
