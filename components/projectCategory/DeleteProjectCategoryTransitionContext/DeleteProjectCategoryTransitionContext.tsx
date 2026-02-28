"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteProjectCategoryTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteProjectCategoryTransitionContext =
  createContext<DeleteProjectCategoryTransitionContextType | null>(null);

interface DeleteProjectCategoryTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectCategoryTransitionProvider({
  children,
}: DeleteProjectCategoryTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteProjectCategoryTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteProjectCategoryTransitionContext.Provider>
  );
}

export function useDeleteProjectCategoryTransition() {
  const context = useContext(DeleteProjectCategoryTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteProjectCategoryTransition must be used within a DeleteProjectCategoryTransitionProvider",
    );
  }
  return context;
}
