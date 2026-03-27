"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const CreateUserContext = createContext<ActionContextType | null>(null);

export function useCreateUser() {
  const context = useContext(CreateUserContext);
  if (!context)
    throw new Error("useCreateUser must be used within CreateUserProvider");
  return context;
}
