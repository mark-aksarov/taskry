"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskCategoryForTaskContext =
  createContext<ActionContextType | null>(null);

export function useUpdateTaskCategoryForTask() {
  const context = useContext(UpdateTaskCategoryForTaskContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategoryForTask must be used within a UpdateTaskCategoryForTaskContext.Provider",
    );
  }
  return context;
}
