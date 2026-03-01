"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateTaskTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateTaskTransitionContext =
  createContext<UpdateTaskTransitionContextType | null>(null);

interface UpdateTaskTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskTransitionProvider({
  children,
}: UpdateTaskTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateTaskTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateTaskTransitionContext.Provider>
  );
}

export function useUpdateTaskTransition() {
  const context = useContext(UpdateTaskTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskTransition must be used within a UpdateTaskTransitionProvider",
    );
  }
  return context;
}
