"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateUserPhoneNumberContext =
  createContext<ActionContextType | null>(null);

export function useUpdateUserPhoneNumber() {
  const context = useContext(UpdateUserPhoneNumberContext);
  if (!context) {
    throw new Error(
      "useUpdateUserPhoneNumber must be used within a UpdateUserPhoneNumberContext.Provider",
    );
  }
  return context;
}
