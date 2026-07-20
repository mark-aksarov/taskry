"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ImportCustomersContext = createContext<ActionContextType | null>(
  null,
);

export function useImportCustomers() {
  const context = useContext(ImportCustomersContext);
  if (!context)
    throw new Error(
      "useImport must be used within ImportCustomersContext.Provider",
    );
  return context;
}
