"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteTaskCategoryTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteTaskCategoryTransitionContext =
  createContext<DeleteTaskCategoryTransitionContextType | null>(null);

interface DeleteTaskCategoryTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteTaskCategoryTransitionProvider({
  children,
}: DeleteTaskCategoryTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteTaskCategoryTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteTaskCategoryTransitionContext.Provider>
  );
}

export function useDeleteTaskCategoryTransition() {
  const context = useContext(DeleteTaskCategoryTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteTaskCategoryTransition must be used within a DeleteTaskCategoryTransitionProvider",
    );
  }
  return context;
}
