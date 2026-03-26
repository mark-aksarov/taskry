"use client";

import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";

export const DeleteTaskCategoriesContext =
  createContext<DeleteEntitiesContextType | null>(null);

export function useDeleteTaskCategories() {
  const context = useContext(DeleteTaskCategoriesContext);
  if (!context)
    throw new Error(
      "useDeleteTaskCategories must be used within a DeleteTaskCategoriesProvider",
    );
  return context;
}
