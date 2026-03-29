"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskContext = createContext<ActionContextType | null>(null);

export function useUpdateTask() {
  const context = useContext(UpdateTaskContext);
  if (!context) {
    throw new Error(
      "useUpdateTask must be used within a UpdateTaskContext.Provider",
    );
  }
  return context;
}
