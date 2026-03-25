"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const DeletePositionContext =
  createContext<ActionContextType<number> | null>(null);

export function useDeletePosition() {
  const context = useContext(DeletePositionContext);
  if (!context)
    throw new Error(
      "useDeletePosition must be used within DeletePositionContext.Provider",
    );
  return context;
}
