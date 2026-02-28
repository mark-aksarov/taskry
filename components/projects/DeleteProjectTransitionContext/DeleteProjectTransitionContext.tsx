"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteProjectTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteProjectTransitionContext =
  createContext<DeleteProjectTransitionContextType | null>(null);

interface DeleteProjectTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectTransitionProvider({
  children,
}: DeleteProjectTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteProjectTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteProjectTransitionContext.Provider>
  );
}

export function useDeleteProjectTransition() {
  const context = useContext(DeleteProjectTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteProjectTransition must be used within a DeleteProjectTransitionProvider",
    );
  }
  return context;
}
