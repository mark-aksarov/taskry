"use client";

import { useContext, createContext } from "react";
import { UpdateEntityContextType } from "@/lib/hooks/useUpdateEntityContextValue";

export const UpdateCustomerContext =
  createContext<UpdateEntityContextType | null>(null);

export function useUpdateCustomer() {
  const context = useContext(UpdateCustomerContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomer must be used within a UpdateCustomerContext.Provider",
    );
  }
  return context;
}
