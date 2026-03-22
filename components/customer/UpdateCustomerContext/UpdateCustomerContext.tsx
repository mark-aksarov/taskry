"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const UpdateCustomerContext = createContext<UpdateEntityContextType | null>(
  null,
);

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

export function useUpdateCustomer() {
  const context = useContext(UpdateCustomerContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomer must be used within a UpdateCustomerProvider",
    );
  }
  return context;
}
