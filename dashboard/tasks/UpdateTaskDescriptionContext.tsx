"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskDescriptionContext =
  createContext<ActionContextType | null>(null);

export function useUpdateTaskDescription() {
  const context = useContext(UpdateTaskDescriptionContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskDescription must be used within a UpdateTaskDescriptionContext.Provider",
    );
  }
  return context;
}
