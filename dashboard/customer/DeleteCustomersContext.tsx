"use client";

import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";

export const DeleteCustomersContext =
  createContext<DeleteEntitiesContextType | null>(null);

export function useDeleteCustomers() {
  const context = useContext(DeleteCustomersContext);
  if (!context)
    throw new Error(
      "useDeleteCustomers must be used within a DeleteCustomersContext.Provider",
    );
  return context;
}
