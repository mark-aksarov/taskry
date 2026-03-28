"use client";

import { notFound } from "next/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UpdateCustomerContext } from "../UpdateCustomerContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface UpdateCustomerProviderProps {
  customerId: number;
  children: React.ReactNode;
}

export function UpdateCustomerProvider({
  customerId,
  children,
}: UpdateCustomerProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await updateCustomer(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show created customer
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/customers") {
      throw new Error(state.message, { cause: "customerNotFound" });
    }

    notFound();
  }

  // we need to track UpdateCustomerModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useModal("updateCustomer");

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
    <UpdateCustomerContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerContext.Provider>
  );
}
