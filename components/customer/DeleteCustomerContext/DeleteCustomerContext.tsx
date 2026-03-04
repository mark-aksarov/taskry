"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomerPayload,
} from "@/lib/actions/types";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";

const DeleteCustomerContext =
  createContext<DeleteEntityContextType<DeleteCustomerPayload> | null>(null);

interface DeleteCustomerProviderProps {
  deleteCustomer: ActionFn<ActionState, DeleteCustomerPayload>;
  children: React.ReactNode;
}

export function DeleteCustomerProvider({
  deleteCustomer,
  children,
}: DeleteCustomerProviderProps) {
  const contextValue = useDeleteEntityContextValue(deleteCustomer);

  const { state } = contextValue;
  useToastOnActionError(state);

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
