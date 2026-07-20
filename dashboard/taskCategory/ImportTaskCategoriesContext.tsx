"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ImportTaskCategoriesContext =
  createContext<ActionContextType | null>(null);

export function useImportTaskCategories() {
  const context = useContext(ImportTaskCategoriesContext);
  if (!context)
    throw new Error(
      "useImport must be used within ImportTaskCategoriesContext.Provider",
    );
  return context;
}
