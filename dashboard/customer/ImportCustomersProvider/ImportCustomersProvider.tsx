"use client";

import { useRouter } from "@/i18n/navigation";
import { ImportCustomersContext } from "../ImportCustomersContext";
import { importCustomers } from "@/lib/actions/customer/importCustomers";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ImportCustomersProviderProps {
  children: React.ReactNode;
}

export function ImportCustomersProvider({
  children,
}: ImportCustomersProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importCustomers, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "importCustomers");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "importCustomers",
  );

  return (
    <ImportCustomersContext.Provider value={contextValue}>
      {children}
    </ImportCustomersContext.Provider>
  );
}
