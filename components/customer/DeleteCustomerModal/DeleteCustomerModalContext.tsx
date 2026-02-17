"use client";

import {
  DeleteModalContextType,
  DeleteModalProviderProps,
  useDeleteModalContextState,
} from "@/components/common/BaseDeleteModal";

import { createContext, useContext } from "react";
import { DeleteCustomerModal } from "./DeleteCustomerModal";

const DeleteCustomerModalContext =
  createContext<DeleteModalContextType<number> | null>(null);

export function DeleteCustomerModalProvider({
  deleteEntity,
  children,
}: DeleteModalProviderProps<number[]>) {
  const contextValue = useDeleteModalContextState<number>();

  const { state, setState } = contextValue;

  return (
    <DeleteCustomerModalContext.Provider value={contextValue}>
      {children}

      <DeleteCustomerModal
        customerId={state.entityId || 0}
        customerFullName={state.entityName}
        isOpen={state.isOpen}
        onOpenChange={(isOpen) => setState((prev) => ({ ...prev, isOpen }))}
        deleteCustomer={deleteEntity}
      />
    </DeleteCustomerModalContext.Provider>
  );
}

export function useDeleteCustomerModal() {
  const context = useContext(DeleteCustomerModalContext);

  if (!context) {
    throw new Error(
      "useDeleteCustomerModal must be used within a DeleteCustomerModalProvider",
    );
  }

  return context;
}
