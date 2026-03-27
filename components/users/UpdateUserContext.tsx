"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateUserContext = createContext<ActionContextType | null>(null);

export function useUpdateUser() {
  const context = useContext(UpdateUserContext);
  if (!context) {
    throw new Error("useUpdateUser must be used within a UpdateUserProvider");
  }
  return context;
}
