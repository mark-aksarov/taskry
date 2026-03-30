"use client";

import { useMemo, useState } from "react";
import { DeleteCompaniesContext } from "../DeleteCompaniesContext";
import { deleteCompanies } from "@/lib/actions/company/deleteCompanies";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteCompaniesProviderProps {
  children: React.ReactNode;
}

export function DeleteCompaniesProvider({
  children,
}: DeleteCompaniesProviderProps) {
  // store IDs to track companies being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const { state, action, isPending } =
    useActionStateWithRouteRefresh(deleteCompanies);

  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteCompaniesContext.Provider value={contextValue}>
      {children}
    </DeleteCompaniesContext.Provider>
  );
}
