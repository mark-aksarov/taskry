"use client";

import { DeleteCompanyContext } from "../DeleteCompanyContext";
import { deleteCompany } from "@/lib/actions/company/deleteCompany";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteCompanyProviderProps {
  children: React.ReactNode;
}

export function DeleteCompanyProvider({
  children,
}: DeleteCompanyProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(deleteCompany);
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteCompanyContext.Provider value={contextValue}>
      {children}
    </DeleteCompanyContext.Provider>
  );
}
