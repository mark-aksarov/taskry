"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteTaskTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteTaskTransitionContext =
  createContext<DeleteTaskTransitionContextType | null>(null);

interface DeleteTaskTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskTransitionProvider({
  children,
}: DeleteTaskTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteTaskTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteTaskTransitionContext.Provider>
  );
}

export function useDeleteTaskTransition() {
  const context = useContext(DeleteTaskTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteTaskTransition must be used within a DeleteTaskTransitionProvider",
    );
  }
  return context;
}
