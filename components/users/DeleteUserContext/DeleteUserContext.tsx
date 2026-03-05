"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { useRefreshUsers } from "@/lib/hooks/useRefreshUsers";
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
  const refreshUsers = useRefreshUsers();

  // Refresh inside reducerAction after successful deletion
  const contextValue = useDeleteEntityContextValue(deleteUser, refreshUsers);

  const { state } = contextValue;
  useToastOnActionError(state);

  // Can't call this hook here — provider unmounts after successful deletion
  // useRefreshUsersOnActionSuccess(state);

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
