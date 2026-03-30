"use client";

import { UpdateCompanyContext } from "../UpdateCompanyContext";
import { updateCompany } from "@/lib/actions/company/updateCompany";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCompanyProviderProps {
  children: React.ReactNode;
}

export function UpdateCompanyProvider({
  children,
}: UpdateCompanyProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(updateCompany);

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
