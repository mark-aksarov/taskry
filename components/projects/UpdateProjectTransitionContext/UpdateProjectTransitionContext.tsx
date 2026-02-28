"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateProjectTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateProjectTransitionContext =
  createContext<UpdateProjectTransitionContextType | null>(null);

interface UpdateProjectTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectTransitionProvider({
  children,
}: UpdateProjectTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateProjectTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateProjectTransitionContext.Provider>
  );
}

export function useUpdateProjectTransition() {
  const context = useContext(UpdateProjectTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectTransition must be used within a UpdateProjectTransitionProvider",
    );
  }
  return context;
}
