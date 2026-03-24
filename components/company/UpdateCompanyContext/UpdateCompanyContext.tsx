"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCompanyContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateCompany() {
  const context = useContext(UpdateCompanyContext);
  if (!context) {
    throw new Error(
      "useUpdateCompany must be used within a UpdateCompanyContext.Provider",
    );
  }
  return context;
}
