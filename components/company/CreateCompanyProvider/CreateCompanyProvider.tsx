"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateCompanyContext } from "../CreateCompanyContext";
import { createCompany } from "@/lib/actions/company/createCompany";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateCompanyProviderProps {
  children: React.ReactNode;
}

export function CreateCompanyProvider({
  children,
}: CreateCompanyProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createCompany, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createCompany",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createCompany",
  );
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createCompany");

  return (
    <CreateCompanyContext.Provider value={contextValue}>
      {children}
    </CreateCompanyContext.Provider>
  );
}
