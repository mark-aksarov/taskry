"use client";

import { CreateCompanyContext } from "../CreateCompanyContext";
import { createCompany } from "@/lib/actions/company/createCompany";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateCompanyProviderProps {
  children: React.ReactNode;
}

export function CreateCompanyProvider({
  children,
}: CreateCompanyProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(createCompany);

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
