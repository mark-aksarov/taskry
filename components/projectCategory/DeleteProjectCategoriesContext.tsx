"use client";

import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";

export const DeleteProjectCategoriesContext =
  createContext<DeleteEntitiesContextType | null>(null);

export function useDeleteProjectCategories() {
  const context = useContext(DeleteProjectCategoriesContext);
  if (!context)
    throw new Error(
      "useDeleteProjectCategories must be used within a DeleteProjectCategoriesContext.Provider",
    );
  return context;
}
