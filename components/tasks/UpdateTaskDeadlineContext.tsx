"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskDeadlineContext =
  createContext<ActionContextType | null>(null);

export function useUpdateTaskDeadline() {
  const context = useContext(UpdateTaskDeadlineContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskDeadline must be used within a UpdateTaskDeadlineContext.Provider",
    );
  }
  return context;
}
