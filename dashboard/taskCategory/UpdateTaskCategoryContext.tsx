"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskCategoryContext =
  createContext<ActionContextType | null>(null);

export function useUpdateTaskCategory() {
  const context = useContext(UpdateTaskCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategory must be used within a UpdateTaskCategoryContext.Provider",
    );
  }
  return context;
}
