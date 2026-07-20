"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ImportProjectsContext = createContext<ActionContextType | null>(
  null,
);

export function useImportProjects() {
  const context = useContext(ImportProjectsContext);
  if (!context)
    throw new Error(
      "useImport must be used within ImportProjectsContext.Provider",
    );
  return context;
}
