"use client";

import { useContext, createContext } from "react";
import { ActionContextType, DeleteCustomerPayload } from "@/lib/actions/types";

export const DeleteCustomerContext =
  createContext<ActionContextType<DeleteCustomerPayload> | null>(null);

export function useDeleteCustomer() {
  const context = useContext(DeleteCustomerContext);
  if (!context)
    throw new Error(
      "useDeleteCustomer must be used within DeleteCustomerContext.Provider",
    );
  return context;
}
