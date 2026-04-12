"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateProjectCustomerContext =
  createContext<ActionContextType | null>(null);

export function useUpdateProjectCustomer() {
  const context = useContext(UpdateProjectCustomerContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCustomer must be used within a UpdateProjectCustomerContext.Provider",
    );
  }
  return context;
}
