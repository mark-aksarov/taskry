"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateUserPositionContext =
  createContext<ActionContextType | null>(null);

export function useUpdateUserPosition() {
  const context = useContext(UpdateUserPositionContext);
  if (!context) {
    throw new Error(
      "useUpdateUserPosition must be used within a UpdateUserPositionContext.Provider",
    );
  }
  return context;
}
