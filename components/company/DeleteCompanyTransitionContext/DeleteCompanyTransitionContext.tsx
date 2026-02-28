"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteCompanyTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteCompanyTransitionContext =
  createContext<DeleteCompanyTransitionContextType | null>(null);

interface DeleteCompanyTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteCompanyTransitionProvider({
  children,
}: DeleteCompanyTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteCompanyTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteCompanyTransitionContext.Provider>
  );
}

export function useDeleteCompanyTransition() {
  const context = useContext(DeleteCompanyTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteCompanyTransition must be used within a DeleteCompanyTransitionProvider",
    );
  }
  return context;
}
