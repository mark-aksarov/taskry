"use client";

import { ActionContextType } from "@/lib/actions/types";
import { useContext, createContext } from "react";

export const CreateClientContext = createContext<ActionContextType | null>(
  null,
);

export function useCreateClient() {
  const context = useContext(CreateClientContext);
  if (!context)
    throw new Error(
      "useCreateClient must be used within CreateClientContext.Provider",
    );
  return context;
}
