"use client";

import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";

export const DeleteProjectsContext =
  createContext<DeleteEntitiesContextType | null>(null);

export function useDeleteProjects() {
  const context = useContext(DeleteProjectsContext);
  if (!context)
    throw new Error(
      "useDeleteProjects must be used within a DeleteProjectsContext.Provider",
    );
  return context;
}
