"use client";

import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { DeleteCustomersContext } from "../DeleteCustomersContext";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteCustomersProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomersProvider({
  children,
}: DeleteCustomersProviderProps) {
  // store IDs to track customers being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    deleteCustomers,
    {
      onSuccess: () => router.refresh(),
      onError: () => setIds([]),
    },
  );
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
