"use client";

import { useRouter } from "@/i18n/navigation";
import { updateClient } from "@/lib/actions/client/updateClient";
import { UpdateClientCompanyContext } from "../UpdateClientCompanyContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateClientCompanyProviderProps {
  children: React.ReactNode;
}

export function UpdateClientCompanyProvider({
  children,
}: UpdateClientCompanyProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateClient, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientCompany");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientCompany");

  return (
    <UpdateClientCompanyContext.Provider value={contextValue}>
      {children}
    </UpdateClientCompanyContext.Provider>
  );
}
