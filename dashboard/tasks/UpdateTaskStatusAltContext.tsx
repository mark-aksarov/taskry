"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskStatusAltContext =
  createContext<ActionContextType | null>(null);

export function useUpdateTaskStatusAlt() {
  const context = useContext(UpdateTaskStatusAltContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatusAlt must be used within a UpdateTaskStatusAltContext.Provider",
    );
  }
  return context;
}
