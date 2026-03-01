"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateTaskStatusTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateTaskStatusTransitionContext =
  createContext<UpdateTaskStatusTransitionContextType | null>(null);

interface UpdateTaskStatusTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusTransitionProvider({
  children,
}: UpdateTaskStatusTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateTaskStatusTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusTransitionContext.Provider>
  );
}

export function useUpdateTaskStatusTransition() {
  const context = useContext(UpdateTaskStatusTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateTaskStatusTransition must be used within a UpdateTaskStatusTransitionProvider",
    );
  }
  return context;
}
