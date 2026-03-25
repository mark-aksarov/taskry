"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const CreateProjectContext = createContext<ActionContextType | null>(
  null,
);

export function useCreateProject() {
  const context = useContext(CreateProjectContext);
  if (!context)
    throw new Error(
      "useCreateProject must be used within CreateProjectContext.Provider",
    );
  return context;
}
