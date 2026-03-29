"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const CreateTaskContext = createContext<ActionContextType | null>(null);

export function useCreateTask() {
  const context = useContext(CreateTaskContext);
  if (!context)
    throw new Error(
      "useCreateTask must be used within CreateTaskContext.Provider",
    );
  return context;
}
