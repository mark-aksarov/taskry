"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const UpdateUserPublicLinkContext =
  createContext<ActionContextType | null>(null);

export function useUpdateUserPublicLink() {
  const context = useContext(UpdateUserPublicLinkContext);
  if (!context) {
    throw new Error(
      "useUpdateUserPublicLink must be used within a UpdateUserPublicLinkContext.Provider",
    );
  }
  return context;
}
