"use client";

import { useRouter } from "@/i18n/navigation";
import { updateClient } from "@/lib/actions/client/updateClient";
import { UpdateClientPublicLinkContext } from "../UpdateClientPublicLinkContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateClientPublicLinkProviderProps {
  children: React.ReactNode;
}

export function UpdateClientPublicLinkProvider({
  children,
}: UpdateClientPublicLinkProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientPublicLink");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientPublicLink");

  return (
    <UpdateClientPublicLinkContext.Provider value={contextValue}>
      {children}
    </UpdateClientPublicLinkContext.Provider>
  );
}
