"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateClientCompanyContext =
  createContext<ActionContextType | null>(null);

export function useUpdateClientCompany() {
  const context = useContext(UpdateClientCompanyContext);
  if (!context) {
    throw new Error(
      "useUpdateClientCompany must be used within a UpdateClientCompanyContext.Provider",
    );
  }
  return context;
}
