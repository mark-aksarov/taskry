"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCustomerEmailContext =
  createContext<ActionContextType | null>(null);

export function useUpdateCustomerEmail() {
  const context = useContext(UpdateCustomerEmailContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerEmail must be used within a UpdateCustomerEmailContext.Provider",
    );
  }
  return context;
}
