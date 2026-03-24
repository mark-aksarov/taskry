"use client";

import { useContext, createContext } from "react";
import { DeleteEntityContextType } from "@/lib/hooks/useDeleteEntityContextValue";

export const DeleteCompanyContext =
  createContext<DeleteEntityContextType<number> | null>(null);

export function useDeleteCompany() {
  const context = useContext(DeleteCompanyContext);
  if (!context)
    throw new Error(
      "useDeleteCompany must be used within DeleteCompanyProvider",
    );
  return context;
}
