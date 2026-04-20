"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskCategoryRelContext =
  createContext<ActionContextType | null>(null);

export function useUpdateTaskCategoryRel() {
  const context = useContext(UpdateTaskCategoryRelContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategoryRel must be used within a UpdateTaskCategoryRelContext.Provider",
    );
  }
  return context;
}
