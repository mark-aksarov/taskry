"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateClientPhoneNumberContext =
  createContext<ActionContextType | null>(null);

export function useUpdateClientPhoneNumber() {
  const context = useContext(UpdateClientPhoneNumberContext);
  if (!context) {
    throw new Error(
      "useUpdateClientPhoneNumber must be used within a UpdateClientPhoneNumberContext.Provider",
    );
  }
  return context;
}
