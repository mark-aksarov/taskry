"use client";

import { useContext, createContext } from "react";
import { UpdateTaskStatusesContextType } from "@/lib/types";

export const UpdateTaskStatusesContext =
  createContext<UpdateTaskStatusesContextType | null>(null);

export function useUpdateTaskStatuses() {
  const context = useContext(UpdateTaskStatusesContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatuses must be used within a UpdateTaskStatusesContext.Provider",
    );
  }
  return context;
}
