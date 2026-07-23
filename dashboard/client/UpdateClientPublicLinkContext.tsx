"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateClientPublicLinkContext =
  createContext<ActionContextType | null>(null);

export function useUpdateClientPublicLink() {
  const context = useContext(UpdateClientPublicLinkContext);
  if (!context) {
    throw new Error(
      "useUpdateClientPublicLink must be used within a UpdateClientPublicLinkContext.Provider",
    );
  }
  return context;
}
