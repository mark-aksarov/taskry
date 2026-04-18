"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateCompanyContext } from "../UpdateCompanyContext";
import { updateCompany } from "@/lib/actions/company/updateCompany";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateCompanyProviderProps {
  children: React.ReactNode;
}

export function UpdateCompanyProvider({
  children,
}: UpdateCompanyProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateCompany, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateCompany");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateCompany");

  return (
    <UpdateCompanyContext.Provider value={contextValue}>
      {children}
    </UpdateCompanyContext.Provider>
  );
}
