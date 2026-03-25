"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdatePositionContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdatePosition() {
  const context = useContext(UpdatePositionContext);
  if (!context) {
    throw new Error(
      "useUpdatePosition must be used within a UpdatePositionContext.Provider",
    );
  }
  return context;
}
