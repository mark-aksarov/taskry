"use client";

import {
  useMemo,
  useState,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteCustomersContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  customerIds: number[];
  setCustomerIds: (customerIds: number[]) => void;
}

const DeleteCustomersContext = createContext<DeleteCustomersContextType | null>(
  null,
);

interface DeleteCustomersProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomersProvider({
  children,
}: DeleteCustomersProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [customerIds, setCustomerIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
      customerIds,
      setCustomerIds,
    }),
    [isPending, customerIds],
  );

  return (
    <DeleteCustomersContext.Provider value={contextValue}>
      {children}
    </DeleteCustomersContext.Provider>
  );
}

export function useDeleteCustomers() {
  const context = useContext(DeleteCustomersContext);
  if (!context) {
    throw new Error(
      "useDeleteCustomers must be used within a DeleteCustomersProvider",
    );
  }
  return context;
}
