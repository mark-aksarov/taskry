"use client";

import { useRouter } from "@/i18n/navigation";
import { ImportCompaniesContext } from "../ImportCompaniesContext";
import { importCompanies } from "@/lib/actions/company/importCompanies";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface ImportCompaniesProviderProps {
  children: React.ReactNode;
}

export function ImportCompaniesProvider({
  children,
}: ImportCompaniesProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(importCompanies, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "importCompanies");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "importCompanies",
  );

  return (
    <ImportCompaniesContext.Provider value={contextValue}>
      {children}
    </ImportCompaniesContext.Provider>
  );
}
