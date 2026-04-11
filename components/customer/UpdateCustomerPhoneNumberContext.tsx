"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCustomerPhoneNumberContext =
  createContext<ActionContextType | null>(null);

export function useUpdateCustomerPhoneNumber() {
  const context = useContext(UpdateCustomerPhoneNumberContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerPhoneNumber must be used within a UpdateCustomerPhoneNumberContext.Provider",
    );
  }
  return context;
}
