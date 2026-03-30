"use client";

import { useMemo, useState } from "react";
import { DeleteCustomersContext } from "../DeleteCustomersContext";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteCustomersProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomersProvider({
  children,
}: DeleteCustomersProviderProps) {
  // store IDs to track customers being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const { action, state, isPending } =
    useActionStateWithRouteRefresh(deleteCustomers);
  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending, ids, setIds }),
    [state, action, isPending, ids],
  );

  return (
    <DeleteCustomersContext.Provider value={contextValue}>
      {children}
    </DeleteCustomersContext.Provider>
  );
}
