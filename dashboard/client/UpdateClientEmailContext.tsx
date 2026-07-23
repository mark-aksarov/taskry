"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateClientEmailContext =
  createContext<ActionContextType | null>(null);

export function useUpdateClientEmail() {
  const context = useContext(UpdateClientEmailContext);
  if (!context) {
    throw new Error(
      "useUpdateClientEmail must be used within a UpdateClientEmailContext.Provider",
    );
  }
  return context;
}
