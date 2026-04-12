"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectTitleContext =
  createContext<ActionContextType | null>(null);

export function useUpdateProjectTitle() {
  const context = useContext(UpdateProjectTitleContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectTitle must be used within a UpdateProjectTitleContext.Provider",
    );
  }
  return context;
}
