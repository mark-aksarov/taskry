"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateCompanyTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateCompanyTransitionContext =
  createContext<UpdateCompanyTransitionContextType | null>(null);

interface UpdateCompanyTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateCompanyTransitionProvider({
  children,
}: UpdateCompanyTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateCompanyTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateCompanyTransitionContext.Provider>
  );
}

export function useUpdateCompanyTransition() {
  const context = useContext(UpdateCompanyTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateCompanyTransition must be used within a UpdateCompanyTransitionProvider",
    );
  }
  return context;
}
