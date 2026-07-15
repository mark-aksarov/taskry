"use client";

import { createContext, useContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ResetPasswordContext = createContext<ActionContextType | null>(
  null,
);

export function useResetPassword() {
  const context = useContext(ResetPasswordContext);
  if (!context) {
    throw new Error(
      "useResetPassword must be used within a ResetPasswordContext.Provider",
    );
  }
  return context;
}
