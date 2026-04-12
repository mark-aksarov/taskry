"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectStatusAltContext =
  createContext<ActionContextType | null>(null);

export function useUpdateProjectStatusAlt() {
  const context = useContext(UpdateProjectStatusAltContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatusAlt must be used within a UpdateProjectStatusAltContext.Provider",
    );
  }
  return context;
}
