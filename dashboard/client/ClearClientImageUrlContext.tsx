"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ClearClientImageUrlContext =
  createContext<ActionContextType<number> | null>(null);

export function useClearClientImageUrl() {
  const context = useContext(ClearClientImageUrlContext);
  if (!context)
    throw new Error(
      "useClearImageUrl must be used within ClearClientImageUrlContext.Provider",
    );
  return context;
}
