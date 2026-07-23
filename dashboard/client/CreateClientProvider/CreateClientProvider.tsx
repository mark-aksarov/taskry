"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateClientContext } from "../CreateClientContext";
import { createClient } from "@/lib/actions/client/createClient";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface CreateClientProviderProps {
  children: React.ReactNode;
}

export function CreateClientProvider({
  children,
}: CreateClientProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createClient, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createClient");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createClient",
  );

  return (
    <CreateClientContext.Provider value={contextValue}>
      {children}
    </CreateClientContext.Provider>
  );
}
