"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectCategoryRelContext =
  createContext<ActionContextType | null>(null);

export function useUpdateProjectCategoryRel() {
  const context = useContext(UpdateProjectCategoryRelContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCategoryRel must be used within a UpdateProjectCategoryRelContext.Provider",
    );
  }
  return context;
}
