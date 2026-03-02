"use client";

import {
  useCreateEntityState,
  CreateEntityContextType,
} from "@/lib/hooks/useCreateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

const CreateCustomerContext = createContext<CreateEntityContextType | null>(
  null,
);

export function CreateCustomerProvider({
  createCustomer,
  children,
}: {
  createCustomer: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}) {
  const contextValue = useCreateEntityState(createCustomer);

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
