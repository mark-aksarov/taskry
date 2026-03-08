"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

const CreateCustomerContext = createContext<CreateEntityContextType | null>(
  null,
);

interface CreateCustomerProviderProps {
  createCustomer: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function CreateCustomerProvider({
  createCustomer,
  children,
}: CreateCustomerProviderProps) {
  const contextValue = useCreateEntityContextValue(createCustomer);

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish
  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

  return (
    <CreateCustomerContext.Provider value={contextValue}>
      {children}
    </CreateCustomerContext.Provider>
  );
}

export function useCreateCustomer() {
  const context = useContext(CreateCustomerContext);
  if (!context)
    throw new Error(
      "useCreateCustomer must be used within CreateCustomerProvider",
    );
  return context;
}
