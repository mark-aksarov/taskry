"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateUserAddressContext = createContext<ActionContextType | null>(
  null,
);

export function useUpdateUserAddress() {
  const context = useContext(UpdateUserAddressContext);
  if (!context) {
    throw new Error(
      "useUpdateUserAddress must be used within a UpdateUserAddressContext.Provider",
    );
  }
  return context;
}
