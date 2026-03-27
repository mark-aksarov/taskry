"use client";

import { useContext, createContext } from "react";
import { ActionContextType, DeleteUserPayload } from "@/lib/actions/types";

export const DeleteUserContext =
  createContext<ActionContextType<DeleteUserPayload> | null>(null);

export function useDeleteUser() {
  const context = useContext(DeleteUserContext);
  if (!context)
    throw new Error("useDeleteUser must be used within DeleteUserProvider");
  return context;
}
