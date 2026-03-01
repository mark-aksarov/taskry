"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface ToggleSubtaskTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const ToggleSubtaskTransitionContext =
  createContext<ToggleSubtaskTransitionContextType | null>(null);

interface ToggleSubtaskTransitionProviderProps {
  children: React.ReactNode;
}

export function ToggleSubtaskTransitionProvider({
  children,
}: ToggleSubtaskTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <ToggleSubtaskTransitionContext.Provider value={contextValue}>
      {children}
    </ToggleSubtaskTransitionContext.Provider>
  );
}

export function useToggleSubtaskTransition() {
  const context = useContext(ToggleSubtaskTransitionContext);
  if (!context) {
    throw new Error(
      "useToggleSubtaskTransition must be used within a ToggleSubtaskTransitionProvider",
    );
  }
  return context;
}
