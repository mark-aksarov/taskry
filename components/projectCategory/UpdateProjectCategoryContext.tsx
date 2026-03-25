"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectCategoryContext =
  createContext<ActionContextType | null>(null);

export function useUpdateProjectCategory() {
  const context = useContext(UpdateProjectCategoryContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCategory must be used within a UpdateProjectCategoryContext.Provider",
    );
  }
  return context;
}
