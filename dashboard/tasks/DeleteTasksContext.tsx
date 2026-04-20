"use client";

import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";

export const DeleteTasksContext =
  createContext<DeleteEntitiesContextType | null>(null);

export function useDeleteTasks() {
  const context = useContext(DeleteTasksContext);
  if (!context)
    throw new Error(
      "useDeleteTasks must be used within a DeleteTasksContext.Provider",
    );
  return context;
}
