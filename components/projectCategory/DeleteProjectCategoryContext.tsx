"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const DeleteProjectCategoryContext =
  createContext<ActionContextType<number> | null>(null);

export function useDeleteProjectCategory() {
  const context = useContext(DeleteProjectCategoryContext);
  if (!context)
    throw new Error(
      "useDeleteProjectCategory must be used within DeleteProjectCategoryContext.Provider",
    );
  return context;
}
