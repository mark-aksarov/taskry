"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCustomerCompanyContext =
  createContext<ActionContextType | null>(null);

export function useUpdateCustomerCompany() {
  const context = useContext(UpdateCustomerCompanyContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerCompany must be used within a UpdateCustomerCompanyContext.Provider",
    );
  }
  return context;
}
