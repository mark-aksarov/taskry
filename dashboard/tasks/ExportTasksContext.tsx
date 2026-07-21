"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ExportTasksContext = createContext<ActionContextType | null>(null);

export function useExportTasks() {
  const context = useContext(ExportTasksContext);
  if (!context)
    throw new Error(
      "useExport must be used within ExportTasksContext.Provider",
    );
  return context;
}
