"use client";

import { useContext, createContext } from "react";
import { ActionContextType, DeleteTaskPayload } from "@/lib/actions/types";

export const DeleteTaskContext =
  createContext<ActionContextType<DeleteTaskPayload> | null>(null);

export function useDeleteTask() {
  const context = useContext(DeleteTaskContext);
  if (!context)
    throw new Error(
      "useDeleteTask must be used within DeleteTaskContext.Provider",
    );
  return context;
}
