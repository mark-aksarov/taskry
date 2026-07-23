"use client";

import { useRouter } from "@/i18n/navigation";
import { updateClient } from "@/lib/actions/client/updateClient";
import { UpdateClientFullNameContext } from "../UpdateClientFullNameContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateClientFullNameProviderProps {
  children: React.ReactNode;
}

export function UpdateClientFullNameProvider({
  children,
}: UpdateClientFullNameProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientFullName");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientFullName");

  return (
    <UpdateClientFullNameContext.Provider value={contextValue}>
      {children}
    </UpdateClientFullNameContext.Provider>
  );
}
