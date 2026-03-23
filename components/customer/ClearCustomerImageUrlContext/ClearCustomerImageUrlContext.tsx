"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export const ClearCustomerImageUrlContext =
  createContext<ActionContextType<number> | null>(null);

export function useClearCustomerImageUrl() {
  const context = useContext(ClearCustomerImageUrlContext);
  if (!context)
    throw new Error(
      "useClearImageUrl must be used within ClearCustomerImageUrlContext.Provider",
    );
  return context;
}
