"use client";

import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { useCreateCustomerModal } from "../CreateCustomerModal";
import { CreateCustomerContext } from "../CreateCustomerContext";
import { createCustomer } from "@/lib/actions/customer/createCustomer";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface CreateCustomerProviderProps {
  children: React.ReactNode;
}

export function CreateCustomerProvider({
  children,
}: CreateCustomerProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await createCustomer(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show created company
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // we need to track CreateCustomerModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useCreateCustomerModal();

  // hooks below wait for the transition to complete (reducerAction returns the new state)
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <CreateCustomerContext.Provider value={contextValue}>
      {children}
    </CreateCustomerContext.Provider>
  );
}
