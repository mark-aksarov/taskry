"use client";

import { createContext, useContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateSubtaskContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateSubtask() {
  const context = useContext(UpdateSubtaskContext);
  if (!context) {
    throw new Error(
      "useUpdateSubtask must be used within a UpdateSubtaskContext.Provider",
    );
  }
  return context;
}
