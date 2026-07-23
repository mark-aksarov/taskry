"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectClientContext =
  createContext<ActionContextType | null>(null);

export function useUpdateProjectClient() {
  const context = useContext(UpdateProjectClientContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectClient must be used within a UpdateProjectClientContext.Provider",
    );
  }
  return context;
}
