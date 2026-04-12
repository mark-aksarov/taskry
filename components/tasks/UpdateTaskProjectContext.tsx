"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskProjectContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateTaskProject() {
  const context = useContext(UpdateTaskProjectContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskProject must be used within a UpdateTaskProjectContext.Provider",
    );
  }
  return context;
}
