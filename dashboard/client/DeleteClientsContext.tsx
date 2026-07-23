"use client";

import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";

export const DeleteClientsContext =
  createContext<DeleteEntitiesContextType | null>(null);

export function useDeleteClients() {
  const context = useContext(DeleteClientsContext);
  if (!context)
    throw new Error(
      "useDeleteClients must be used within a DeleteClientsContext.Provider",
    );
  return context;
}
