"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdatePositionTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdatePositionTransitionContext =
  createContext<UpdatePositionTransitionContextType | null>(null);

interface UpdatePositionTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdatePositionTransitionProvider({
  children,
}: UpdatePositionTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdatePositionTransitionContext.Provider value={contextValue}>
      {children}
    </UpdatePositionTransitionContext.Provider>
  );
}

export function useUpdatePositionTransition() {
  const context = useContext(UpdatePositionTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdatePositionTransition must be used within a UpdatePositionTransitionProvider",
    );
  }
  return context;
}
