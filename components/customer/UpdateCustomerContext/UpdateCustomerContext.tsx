"use client";

import {
  useUpdateEntityState,
  UpdateEntityContextType,
} from "@/lib/hooks/useUpdateEntityState";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";

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
  const contextValue = useUpdateEntityState(updateCustomer);

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
