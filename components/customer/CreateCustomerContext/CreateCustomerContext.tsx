"use client";

import { ActionContextType } from "@/lib/actions/types";
import { useContext, createContext } from "react";

export const CreateCustomerContext = createContext<ActionContextType | null>(
  null,
);

export function useCreateCustomer() {
  const context = useContext(CreateCustomerContext);
  if (!context)
    throw new Error(
      "useCreateCustomer must be used within CreateCustomerContext.Provider",
    );
  return context;
}
