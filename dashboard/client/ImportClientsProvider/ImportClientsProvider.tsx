"use client";

import { useRouter } from "@/i18n/navigation";
import { ImportClientsContext } from "../ImportClientsContext";
import { importClients } from "@/lib/actions/client/importClients";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ImportClientsProviderProps {
  children: React.ReactNode;
}

export function ImportClientsProvider({
  children,
}: ImportClientsProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importClients, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "importClients");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "importClients",
  );

  return (
    <ImportClientsContext.Provider value={contextValue}>
      {children}
    </ImportClientsContext.Provider>
  );
}
