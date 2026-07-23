"use client";

import { useRouter } from "@/i18n/navigation";
import { updateClient } from "@/lib/actions/client/updateClient";
import { UpdateClientPhoneNumberContext } from "../UpdateClientPhoneNumberContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateClientPhoneNumberProviderProps {
  children: React.ReactNode;
}

export function UpdateClientPhoneNumberProvider({
  children,
}: UpdateClientPhoneNumberProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientPhoneNumber");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientPhoneNumber");

  return (
    <UpdateClientPhoneNumberContext.Provider value={contextValue}>
      {children}
    </UpdateClientPhoneNumberContext.Provider>
  );
}
