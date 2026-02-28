"use client";

import { useTranslations } from "next-intl";
import { useMemo, useContext, createContext } from "react";
import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";
import { useDeleteActionState } from "@/lib/hooks/useDeleteActionState";

interface DeleteUserContextType {
  action: (payload: DeleteUserPayload) => void;
  isPending: boolean;
}

const DeleteUserContext = createContext<DeleteUserContextType | null>(null);

interface DeleteUserProviderProps {
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
  children: React.ReactNode;
}

export function DeleteUserProvider({
  deleteUser,
  children,
}: DeleteUserProviderProps) {
  const t = useTranslations("users.DeleteUserProvider");

  const [, action, isPending] = useDeleteActionState({
    deleteEntity: deleteUser,
    successMessage: t("successMessage"),
  });

  const contextValue = useMemo(
    () => ({ action, isPending }),
    [action, isPending],
  );

  return (
    <DeleteUserContext.Provider value={contextValue}>
      {children}
    </DeleteUserContext.Provider>
  );
}

export function useDeleteUserContext() {
  const context = useContext(DeleteUserContext);
  if (!context) {
    throw new Error(
      "useDeleteUserContext must be used within a DeleteUserProvider",
    );
  }
  return context;
}
