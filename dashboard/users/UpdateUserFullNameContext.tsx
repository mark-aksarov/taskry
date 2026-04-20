"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateUserFullNameContext =
  createContext<ActionContextType | null>(null);

export function useUpdateUserFullName() {
  const context = useContext(UpdateUserFullNameContext);
  if (!context) {
    throw new Error(
      "useUpdateUserFullName must be used within a UpdateUserFullNameContext.Provider",
    );
  }
  return context;
}
