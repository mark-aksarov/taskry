"use client";

import {
  DeleteEntitiesContextType,
  useDeleteEntitiesContextValue,
} from "@/lib/hooks/useDeleteEntitiesContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";

const DeleteCustomersContext = createContext<DeleteEntitiesContextType | null>(
  null,
);

interface DeleteCustomersProviderProps {
  deleteCustomers: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteCustomersProvider({
  deleteCustomers,
  children,
}: DeleteCustomersProviderProps) {
  const contextValue = useDeleteEntitiesContextValue(deleteCustomers);

  const { state } = contextValue;
  useToastOnActionError(state);

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
