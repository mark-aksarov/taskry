"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateCustomerTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateCustomerTransitionContext =
  createContext<UpdateCustomerTransitionContextType | null>(null);

interface UpdateCustomerTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerTransitionProvider({
  children,
}: UpdateCustomerTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateCustomerTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerTransitionContext.Provider>
  );
}

export function useUpdateCustomerTransition() {
  const context = useContext(UpdateCustomerTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerTransition must be used within a UpdateCustomerTransitionProvider",
    );
  }
  return context;
}
