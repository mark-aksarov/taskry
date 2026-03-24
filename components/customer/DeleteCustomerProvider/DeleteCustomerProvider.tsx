"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { DeleteCustomerContext } from "../DeleteCustomerContext";
import { deleteCustomer } from "@/lib/actions/customer/deleteCustomer";
import { ActionState, DeleteCustomerPayload } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

export const initialState: ActionState = {
  status: null,
};

interface DeleteCustomerProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomerProvider({
  children,
}: DeleteCustomerProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: DeleteCustomerPayload) => {
      const newState = await deleteCustomer(payload);

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
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <DeleteCustomerContext.Provider value={contextValue}>
      {children}
    </DeleteCustomerContext.Provider>
  );
}
