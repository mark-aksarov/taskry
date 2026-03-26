"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const CreateTaskCategoryContext =
  createContext<ActionContextType | null>(null);

export function useCreateTaskCategory() {
  const context = useContext(CreateTaskCategoryContext);
  if (!context)
    throw new Error(
      "useCreateTaskCategory must be used within CreateTaskCategoryContext.Provider",
    );
  return context;
}
