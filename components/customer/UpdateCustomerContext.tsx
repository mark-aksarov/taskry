"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCustomerContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateCustomer() {
  const context = useContext(UpdateCustomerContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomer must be used within a UpdateCustomerContext.Provider",
    );
  }
  return context;
}
