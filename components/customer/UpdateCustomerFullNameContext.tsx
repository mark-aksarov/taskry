"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCustomerFullNameContext =
  createContext<ActionContextType | null>(null);

export function useUpdateCustomerFullName() {
  const context = useContext(UpdateCustomerFullNameContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerFullName must be used within a UpdateCustomerFullNameContext.Provider",
    );
  }
  return context;
}
