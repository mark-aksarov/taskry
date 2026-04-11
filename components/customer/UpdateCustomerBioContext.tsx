"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateCustomerBioContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateCustomerBio() {
  const context = useContext(UpdateCustomerBioContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerBio must be used within a UpdateCustomerBioContext.Provider",
    );
  }
  return context;
}
