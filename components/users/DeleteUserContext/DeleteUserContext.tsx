"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";

const DeleteUserContext =
  createContext<DeleteEntityContextType<DeleteUserPayload> | null>(null);

interface DeleteUserProviderProps {
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
  children: React.ReactNode;
}

export function DeleteUserProvider({
  deleteUser,
  children,
}: DeleteUserProviderProps) {
  const contextValue = useDeleteEntityContextValue(deleteUser);

  const { state } = contextValue;
  useToastOnActionError(state);

  return (
    <DeleteUserContext.Provider value={contextValue}>
      {children}
    </DeleteUserContext.Provider>
  );
}

export function useDeleteUser() {
  const context = useContext(DeleteUserContext);
  if (!context)
    throw new Error("useDeleteUser must be used within DeleteUserProvider");
  return context;
}
