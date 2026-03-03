"use client";

import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";

import {
  useDeleteEntityState,
  DeleteEntityContextType,
} from "@/lib/hooks/useDeleteEntityState";

import { useContext, createContext } from "react";

const DeleteUserContext =
  createContext<DeleteEntityContextType<DeleteUserPayload> | null>(null);

export function DeleteUserProvider({
  deleteUser,
  children,
}: {
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntityState(deleteUser);

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
