"use client";

import {
  useMemo,
  useState,
  Dispatch,
  createContext,
  SetStateAction,
  useContext,
} from "react";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { DeleteCustomerModal } from "./DeleteCustomerModal";

interface DeleteCustomerModalContextType {
  state: CustomerModalState;
  setState: Dispatch<SetStateAction<CustomerModalState>>;
}

const DeleteCustomerModalContext =
  createContext<DeleteCustomerModalContextType | null>(null);

interface CustomerModalState {
  customerId: number;
  customerFullName: string;
  isOpen: boolean;
}

interface DeleteCustomerModalProviderProps {
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
  children: React.ReactNode;
}

export function DeleteCustomerModalProvider({
  deleteCustomer,
  children,
}: DeleteCustomerModalProviderProps) {
  const [state, setState] = useState<CustomerModalState>(() => ({
    customerId: 0,
    customerFullName: "",
    isOpen: false,
  }));

  const contextValue = useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState],
  );

  return (
    <DeleteCustomerModalContext.Provider value={contextValue}>
      {children}

      <DeleteCustomerModal
        customerId={state.customerId}
        customerFullName={state.customerFullName}
        isOpen={state.isOpen}
        onOpenChange={() => setState((prev) => ({ ...prev, isOpen: false }))}
        deleteCustomer={deleteCustomer}
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
