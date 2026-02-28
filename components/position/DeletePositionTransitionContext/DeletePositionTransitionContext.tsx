"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeletePositionTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeletePositionTransitionContext =
  createContext<DeletePositionTransitionContextType | null>(null);

interface DeletePositionTransitionProviderProps {
  children: React.ReactNode;
}

export function DeletePositionTransitionProvider({
  children,
}: DeletePositionTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeletePositionTransitionContext.Provider value={contextValue}>
      {children}
    </DeletePositionTransitionContext.Provider>
  );
}

export function useDeletePositionTransition() {
  const context = useContext(DeletePositionTransitionContext);
  if (!context) {
    throw new Error(
      "useDeletePositionTransition must be used within a DeletePositionTransitionProvider",
    );
  }
  return context;
}
