"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteUserTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteUserTransitionContext =
  createContext<DeleteUserTransitionContextType | null>(null);

interface DeleteUserTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteUserTransitionProvider({
  children,
}: DeleteUserTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteUserTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteUserTransitionContext.Provider>
  );
}

export function useDeleteUserTransition() {
  const context = useContext(DeleteUserTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteUserTransition must be used within a DeleteUserTransitionProvider",
    );
  }
  return context;
}
