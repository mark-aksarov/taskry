"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const DeleteCompanyContext =
  createContext<ActionContextType<number> | null>(null);

export function useDeleteCompany() {
  const context = useContext(DeleteCompanyContext);
  if (!context)
    throw new Error(
      "useDeleteCompany must be used within DeleteCompanyContext.Provider",
    );
  return context;
}
