"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateTaskTitleContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateTaskTitle() {
  const context = useContext(UpdateTaskTitleContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskTitle must be used within a UpdateTaskTitleContext.Provider",
    );
  }
  return context;
}
