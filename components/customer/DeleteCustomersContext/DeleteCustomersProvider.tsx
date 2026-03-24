"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useMemo, useState, useActionState } from "react";
import { DeleteCustomersContext } from "../DeleteCustomersContext";
import { deleteCustomers } from "@/lib/actions/customer/deleteCustomers";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface DeleteCustomersProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomersProvider({
  children,
}: DeleteCustomersProviderProps) {
  const router = useRouter();

  // store IDs to track customers being deleted for UI purposes
  const [ids, setIds] = useState<number[]>([]);

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, ids: number[]) => {
      const newState = await deleteCustomers(ids);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to update customer list
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // wait for transition to finish
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
