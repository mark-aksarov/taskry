"use client";

import {
  CreateEntityContextType,
  useCreateEntityContextValue,
} from "@/lib/hooks/useCreateEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionSuccess } from "@/lib/hooks/useToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useToastOnActionErrorWhenModalClosed";

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
  useToastOnActionSuccess(state);
  useToastOnActionErrorWhenModalClosed(state, isModalOpen);
  useCloseModalOnActionSuccess(state, onModalOpenChange);

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
