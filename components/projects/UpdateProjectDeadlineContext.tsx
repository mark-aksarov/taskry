"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectDeadlineContext =
  createContext<ActionContextType | null>(null);

export function useUpdateProjectDeadline() {
  const context = useContext(UpdateProjectDeadlineContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectDeadline must be used within a UpdateProjectDeadlineContext.Provider",
    );
  }
  return context;
}
