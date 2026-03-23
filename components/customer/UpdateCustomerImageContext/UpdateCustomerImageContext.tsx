"use client";

import { useContext, createContext } from "react";
import { UpdatePersonImageContextType } from "@/lib/hooks/useUpdatePersonImageContextValue";

export const UpdateCustomerImageContext =
  createContext<UpdatePersonImageContextType<number> | null>(null);

export function useUpdateCustomerImage() {
  const context = useContext(UpdateCustomerImageContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerImage must be used within a UpdateCustomerImageContext.Provider",
    );
  }
  return context;
}
