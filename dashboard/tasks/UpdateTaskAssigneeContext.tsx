"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskAssigneeContext =
  createContext<ActionContextType | null>(null);

export function useUpdateTaskAssignee() {
  const context = useContext(UpdateTaskAssigneeContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskAssignee must be used within a UpdateTaskAssigneeContext.Provider",
    );
  }
  return context;
}
