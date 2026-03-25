"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const CreateProjectCategoryContext =
  createContext<ActionContextType | null>(null);

export function useCreateProjectCategory() {
  const context = useContext(CreateProjectCategoryContext);
  if (!context)
    throw new Error(
      "useCreateProjectCategory must be used within CreateProjectCategoryContext.Provider",
    );
  return context;
}
