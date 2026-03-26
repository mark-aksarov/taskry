"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const DeleteSubtaskContext =
  createContext<ActionContextType<number> | null>(null);

export function useDeleteSubtask() {
  const context = useContext(DeleteSubtaskContext);
  if (!context)
    throw new Error(
      "useDeleteSubtask must be used within DeleteSubtaskContext.Provider",
    );
  return context;
}
