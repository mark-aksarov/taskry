"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { usePathname } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { notFound, useParams } from "next/navigation";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

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
  const pathname = usePathname();
  const params = useParams();
  const contextValue = useDeleteEntityContextValue(deleteUser);

  const { state } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    if (
      (pathname.startsWith("/team") && params.id) ||
      pathname.startsWith("/profile")
    ) {
      notFound();
    }
    throw new Error(state.message, { cause: "userNotFound" });
  }

  useShowToastOnActionError(state);

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
