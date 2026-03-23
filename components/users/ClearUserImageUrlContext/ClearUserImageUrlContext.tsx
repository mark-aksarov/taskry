"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ClearUserImageUrlContext =
  createContext<ActionContextType<string> | null>(null);

export function useClearUserImageUrl() {
  const context = useContext(ClearUserImageUrlContext);
  if (!context)
    throw new Error(
      "useClearImageUrl must be used within ClearImageUrlProvider",
    );
  return context;
}
