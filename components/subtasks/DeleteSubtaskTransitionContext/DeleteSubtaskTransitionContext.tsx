"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteSubtaskTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteSubtaskTransitionContext =
  createContext<DeleteSubtaskTransitionContextType | null>(null);

interface DeleteSubtaskTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteSubtaskTransitionProvider({
  children,
}: DeleteSubtaskTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteSubtaskTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteSubtaskTransitionContext.Provider>
  );
}

export function useDeleteSubtaskTransition() {
  const context = useContext(DeleteSubtaskTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteSubtaskTransition must be used within a DeleteSubtaskTransitionProvider",
    );
  }
  return context;
}
