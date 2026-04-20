"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectDescriptionContext =
  createContext<ActionContextType | null>(null);

export function useUpdateProjectDescription() {
  const context = useContext(UpdateProjectDescriptionContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectDescription must be used within a UpdateProjectDescriptionContext.Provider",
    );
  }
  return context;
}
