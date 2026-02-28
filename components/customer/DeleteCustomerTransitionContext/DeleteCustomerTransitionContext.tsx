"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteCustomerTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteCustomerTransitionContext =
  createContext<DeleteCustomerTransitionContextType | null>(null);

interface DeleteCustomerTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteCustomerTransitionProvider({
  children,
}: DeleteCustomerTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteCustomerTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteCustomerTransitionContext.Provider>
  );
}

export function useDeleteCustomerTransition() {
  const context = useContext(DeleteCustomerTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteCustomerTransition must be used within a DeleteCustomerTransitionProvider",
    );
  }
  return context;
}
