"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ImportTasksContext = createContext<ActionContextType | null>(null);

export function useImportTasks() {
  const context = useContext(ImportTasksContext);
  if (!context)
    throw new Error(
      "useImport must be used within ImportTasksContext.Provider",
    );
  return context;
}
