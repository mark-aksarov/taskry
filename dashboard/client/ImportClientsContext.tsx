"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ImportClientsContext = createContext<ActionContextType | null>(
  null,
);

export function useImportClients() {
  const context = useContext(ImportClientsContext);
  if (!context)
    throw new Error(
      "useImport must be used within ImportClientsContext.Provider",
    );
  return context;
}
