"use client";

import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";

export const DeletePositionsContext =
  createContext<DeleteEntitiesContextType<number> | null>(null);

export function useDeletePositions() {
  const context = useContext(DeletePositionsContext);
  if (!context)
    throw new Error(
      "useDeletePositions must be used within a DeletePositionsContext.Provider",
    );
  return context;
}
