"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateProjectCategoryTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateProjectCategoryTransitionContext =
  createContext<UpdateProjectCategoryTransitionContextType | null>(null);

interface UpdateProjectCategoryTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectCategoryTransitionProvider({
  children,
}: UpdateProjectCategoryTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateProjectCategoryTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCategoryTransitionContext.Provider>
  );
}

export function useUpdateProjectCategoryTransition() {
  const context = useContext(UpdateProjectCategoryTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectCategoryTransition must be used within a UpdateProjectCategoryTransitionProvider",
    );
  }
  return context;
}
