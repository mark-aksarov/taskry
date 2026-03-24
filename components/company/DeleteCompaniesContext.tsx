"use client";

import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";

export const DeleteCompaniesContext =
  createContext<DeleteEntitiesContextType<number> | null>(null);

export function useDeleteCompanies() {
  const context = useContext(DeleteCompaniesContext);
  if (!context)
    throw new Error(
      "useDeleteCompanies must be used within a DeleteCompaniesContext.Provider",
    );
  return context;
}
