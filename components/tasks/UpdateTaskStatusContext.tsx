"use client";

import { useContext, createContext } from "react";
import { UpdateEntityStatusContextType } from "@/lib/hooks/useUpdateEntityStatusContextValue";

export const UpdateTaskStatusContext =
  createContext<UpdateEntityStatusContextType | null>(null);

export function useUpdateTaskStatus() {
  const context = useContext(UpdateTaskStatusContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatus must be used within a UpdateTaskStatusContext.Provider",
    );
  }
  return context;
}
