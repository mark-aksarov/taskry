"use client";

import { createContext, useContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ChangePasswordContext = createContext<ActionContextType | null>(
  null,
);

export function useChangePassword() {
  const context = useContext(ChangePasswordContext);
  if (!context) {
    throw new Error(
      "useChangePassword must be used within a ChangePasswordContext.Provider",
    );
  }
  return context;
}
