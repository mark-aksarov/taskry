"use client";

import { ActionContextType } from "@/lib/actions/types";
import { useContext, createContext } from "react";

export const DeleteTaskCategoryContext =
  createContext<ActionContextType<number> | null>(null);

export function useDeleteTaskCategory() {
  const context = useContext(DeleteTaskCategoryContext);
  if (!context)
    throw new Error(
      "useDeleteTaskCategory must be used within DeleteTaskCategoryProvider",
    );
  return context;
}
