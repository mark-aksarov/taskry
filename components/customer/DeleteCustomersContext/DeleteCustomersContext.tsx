"use client";

import {
  useDeleteEntitiesState,
  DeleteEntitiesContextType,
} from "@/lib/hooks/useDeleteEntitiesState";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { useContext, createContext } from "react";

const DeleteCustomersContext =
  createContext<DeleteEntitiesContextType<DeleteCustomersPayload> | null>(null);

export function DeleteCustomersProvider({
  deleteCustomers,
  children,
}: {
  deleteCustomers: ActionFn<ActionState, DeleteCustomersPayload>;
  children: React.ReactNode;
}) {
  const contextValue = useDeleteEntitiesState(deleteCustomers);
  return (
    <DeleteCustomersContext.Provider value={contextValue}>
      {children}
    </DeleteCustomersContext.Provider>
  );
}

export function useDeleteCustomers() {
  const context = useContext(DeleteCustomersContext);
  if (!context)
    throw new Error(
      "useDeleteCustomers must be used within a DeleteCustomersProvider",
    );
  return context;
}
