"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteClientContext } from "../DeleteClientContext";
import { deleteClient } from "@/lib/actions/client/deleteClient";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteClientProviderProps {
  children: React.ReactNode;
}

export function DeleteClientProvider({
  children,
}: DeleteClientProviderProps) {
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
