"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface ChangePasswordTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const ChangePasswordTransitionContext =
  createContext<ChangePasswordTransitionContextType | null>(null);

interface ChangePasswordTransitionProviderProps {
  children: React.ReactNode;
}

export function ChangePasswordTransitionProvider({
  children,
}: ChangePasswordTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <ChangePasswordTransitionContext.Provider value={contextValue}>
      {children}
    </ChangePasswordTransitionContext.Provider>
  );
}

export function useChangePasswordTransition() {
  const context = useContext(ChangePasswordTransitionContext);
  if (!context) {
    throw new Error(
      "useChangePasswordTransition must be used within a ChangePasswordTransitionProvider",
    );
  }
  return context;
}
