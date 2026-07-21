"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ImportPositionsContext = createContext<ActionContextType | null>(
  null,
);

export function useImportPositions() {
  const context = useContext(ImportPositionsContext);
  if (!context)
    throw new Error(
      "useImport must be used within ImportPositionsContext.Provider",
    );
  return context;
}
