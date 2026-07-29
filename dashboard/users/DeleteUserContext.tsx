"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { ActionContextType, DeleteUserPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const DeleteUserContext =
  createContext<ActionContextType<DeleteUserPayload> | null>(null);

interface DeleteUserProviderProps {
  children: React.ReactNode;
}

export function DeleteUserProvider({ children }: DeleteUserProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteUser, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

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
    throw new Error(
      "useDeleteUser must be used within DeleteUserContext.Provider",
    );
  return context;
}
