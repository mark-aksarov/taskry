"use client";

import { useContext, createContext } from "react";
import { ActionContextType, DeleteClientPayload } from "@/lib/actions/types";

export const DeleteClientContext =
  createContext<ActionContextType<DeleteClientPayload> | null>(null);

export function useDeleteClient() {
  const context = useContext(DeleteClientContext);
  if (!context)
    throw new Error(
      "useDeleteClient must be used within DeleteClientContext.Provider",
    );
  return context;
}
