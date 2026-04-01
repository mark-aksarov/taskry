"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateCompanyContext } from "../UpdateCompanyContext";
import { updateCompany } from "@/lib/actions/company/updateCompany";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  // if the company was not found (e.g. deleted by another user)
  if (state.status === "error" && state.errorCode === "notFound") {
    throw new Error(state.message, { cause: "companyNotFound" });
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updateCompany");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCompany");
  useShowToastWhenModalClosedOnActionError(state, "updateCompany");

  return (
    <UpdateCompanyContext.Provider value={contextValue}>
      {children}
    </UpdateCompanyContext.Provider>
  );
}
