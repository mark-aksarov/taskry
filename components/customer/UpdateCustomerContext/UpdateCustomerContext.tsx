"use client";

import {
  UpdateEntityContextType,
  useUpdateEntityContextValue,
} from "@/lib/hooks/useUpdateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";
import { useRefreshCustomersOnActionSuccess } from "@/lib/hooks/useRefreshCustomersOnActionSuccess";

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
  const contextValue = useUpdateEntityContextValue(updateCustomer);

  const { state, isModalOpen, onModalOpenChange } = contextValue;
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useRefreshCustomersOnActionSuccess(state);

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
