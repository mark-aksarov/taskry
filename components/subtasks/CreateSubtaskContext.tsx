"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const CreateSubtaskContext = createContext<ActionContextType | null>(
  null,
);

export function useCreateSubtask() {
  const context = useContext(CreateSubtaskContext);
  if (!context)
    throw new Error(
      "useCreateSubtask must be used within CreateSubtaskContext.Provider",
    );
  return context;
}
