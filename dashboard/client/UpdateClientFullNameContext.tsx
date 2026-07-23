"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateClientFullNameContext =
  createContext<ActionContextType | null>(null);

export function useUpdateClientFullName() {
  const context = useContext(UpdateClientFullNameContext);
  if (!context) {
    throw new Error(
      "useUpdateClientFullName must be used within a UpdateClientFullNameContext.Provider",
    );
  }
  return context;
}
