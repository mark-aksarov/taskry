"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import {
  useDeleteEntityState,
  DeleteEntityContextType,
} from "@/lib/hooks/useDeleteEntityState";

import { useContext, createContext } from "react";

const DeleteCustomerContext =
  createContext<DeleteEntityContextType<DeleteCustomersPayload> | null>(null);

export function DeleteCustomerProvider({
  deleteCustomer,
  children,
}: {
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntityState(deleteCustomer);

  return (
    <DeleteCustomerContext.Provider value={contextValue}>
      {children}
    </DeleteCustomerContext.Provider>
  );
}

export function useDeleteCustomer() {
  const context = useContext(DeleteCustomerContext);
  if (!context)
    throw new Error(
      "useDeleteCustomer must be used within DeleteCustomerProvider",
    );
  return context;
}
