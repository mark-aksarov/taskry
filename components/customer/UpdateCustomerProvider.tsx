"use client";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { UpdateCustomerContext } from "./UpdateCustomerContext";
import { useUpdateEntityContextValue } from "@/lib/hooks/useUpdateEntityContextValue";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerProviderProps {
  updateCustomer: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateCustomerProvider({
  updateCustomer,
  children,
}: UpdateCustomerProviderProps) {
  const pathname = usePathname();

  const contextValue = useUpdateEntityContextValue(updateCustomer);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish
  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/customers") {
      throw new Error(state.message, { cause: "customerNotFound" });
    }

    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  return (
    <UpdateCustomerContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerContext.Provider>
  );
}
