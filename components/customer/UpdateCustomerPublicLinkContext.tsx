"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCustomerPublicLinkContext =
  createContext<ActionContextType | null>(null);

export function useUpdateCustomerPublicLink() {
  const context = useContext(UpdateCustomerPublicLinkContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerPublicLink must be used within a UpdateCustomerPublicLinkContext.Provider",
    );
  }
  return context;
}
