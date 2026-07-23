"use client";

import { useRouter } from "@/i18n/navigation";
import { updateClient } from "@/lib/actions/client/updateClient";
import { UpdateClientEmailContext } from "../UpdateClientEmailContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateClientEmailProviderProps {
  children: React.ReactNode;
}

export function UpdateClientEmailProvider({
  children,
}: UpdateClientEmailProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientEmail");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientEmail");

  return (
    <UpdateClientEmailContext.Provider value={contextValue}>
      {children}
    </UpdateClientEmailContext.Provider>
  );
}
