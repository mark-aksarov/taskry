"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateUserBirthdateContext =
  createContext<ActionContextType | null>(null);

export function useUpdateUserBirthdate() {
  const context = useContext(UpdateUserBirthdateContext);
  if (!context) {
    throw new Error(
      "useUpdateUserBirthdate must be used within a UpdateUserBirthdateContext.Provider",
    );
  }
  return context;
}
