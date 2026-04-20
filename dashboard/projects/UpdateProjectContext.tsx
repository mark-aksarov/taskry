"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateProject() {
  const context = useContext(UpdateProjectContext);
  if (!context) {
    throw new Error(
      "useUpdateProject must be used within a UpdateProjectContext.Provider",
    );
  }
  return context;
}
