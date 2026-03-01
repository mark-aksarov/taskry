"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateTaskCategoryTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateTaskCategoryTransitionContext =
  createContext<UpdateTaskCategoryTransitionContextType | null>(null);

interface UpdateTaskCategoryTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskCategoryTransitionProvider({
  children,
}: UpdateTaskCategoryTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateTaskCategoryTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryTransitionContext.Provider>
  );
}

export function useUpdateTaskCategoryTransition() {
  const context = useContext(UpdateTaskCategoryTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskCategoryTransition must be used within a UpdateTaskCategoryTransitionProvider",
    );
  }
  return context;
}
