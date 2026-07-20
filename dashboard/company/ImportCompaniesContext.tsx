"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ImportCompaniesContext = createContext<ActionContextType | null>(
  null,
);

export function useImportCompanies() {
  const context = useContext(ImportCompaniesContext);
  if (!context)
    throw new Error(
      "useImport must be used within ImportCompaniesContext.Provider",
    );
  return context;
}
