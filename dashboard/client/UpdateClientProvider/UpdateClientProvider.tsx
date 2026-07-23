"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateClientContext } from "../UpdateClientContext";
import { updateClient } from "@/lib/actions/client/updateClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateClientProviderProps {
  children: React.ReactNode;
}

export function UpdateClientProvider({
  children,
}: UpdateClientProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClient");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClient");

  return (
    <UpdateClientContext.Provider value={contextValue}>
      {children}
    </UpdateClientContext.Provider>
  );
}
