"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { deleteClient } from "@/lib/actions/client/deleteClient";
import { ActionContextType, DeleteClientPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const DeleteClientContext =
  createContext<ActionContextType<DeleteClientPayload> | null>(null);

interface DeleteClientProviderProps {
  children: React.ReactNode;
}

export function DeleteClientProvider({ children }: DeleteClientProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteClient, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteClientContext.Provider value={contextValue}>
      {children}
    </DeleteClientContext.Provider>
  );
}

export function useDeleteClient() {
  const context = useContext(DeleteClientContext);
  if (!context)
    throw new Error(
      "useDeleteClient must be used within DeleteClientContext.Provider",
    );
  return context;
}
