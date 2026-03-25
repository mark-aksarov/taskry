"use client";

import { useContext, createContext } from "react";
import { ActionContextType, DeleteProjectPayload } from "@/lib/actions/types";

export const DeleteProjectContext =
  createContext<ActionContextType<DeleteProjectPayload> | null>(null);

export function useDeleteProject() {
  const context = useContext(DeleteProjectContext);
  if (!context)
    throw new Error(
      "useDeleteProject must be used within DeleteProjectContext.Provider",
    );
  return context;
}
