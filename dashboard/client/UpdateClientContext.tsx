"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateClientContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateClient() {
  const context = useContext(UpdateClientContext);
  if (!context) {
    throw new Error(
      "useUpdateClient must be used within a UpdateClientContext.Provider",
    );
  }
  return context;
}
