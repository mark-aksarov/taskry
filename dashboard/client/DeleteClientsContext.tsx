"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { DeleteEntitiesContextType } from "@/lib/types";
import { deleteClients } from "@/lib/actions/client/deleteClients";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const DeleteClientsContext =
  createContext<DeleteEntitiesContextType | null>(null);

interface DeleteClientsProviderProps {
  children: React.ReactNode;
}

export function DeleteClientsProvider({
  children,
}: DeleteClientsProviderProps) {
  // store IDs to track clients being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    deleteClients,
    {
      onSuccess: () => router.refresh(),
      onError: () => setIds([]),
    },
  );
  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteClientsContext.Provider value={contextValue}>
      {children}
    </DeleteClientsContext.Provider>
  );
}

export function useDeleteClients() {
  const context = useContext(DeleteClientsContext);
  if (!context)
    throw new Error(
      "useDeleteClients must be used within a DeleteClientsContext.Provider",
    );
  return context;
}
