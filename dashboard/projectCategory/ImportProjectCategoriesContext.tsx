"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ImportProjectCategoriesContext =
  createContext<ActionContextType | null>(null);

export function useImportProjectCategories() {
  const context = useContext(ImportProjectCategoriesContext);
  if (!context)
    throw new Error(
      "useImport must be used within ImportProjectCategoriesContext.Provider",
    );
  return context;
}
