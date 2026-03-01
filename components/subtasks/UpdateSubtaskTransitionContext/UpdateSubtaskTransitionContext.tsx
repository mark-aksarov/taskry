"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateSubtaskTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateSubtaskTransitionContext =
  createContext<UpdateSubtaskTransitionContextType | null>(null);

interface UpdateSubtaskTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateSubtaskTransitionProvider({
  children,
}: UpdateSubtaskTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateSubtaskTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskTransitionContext.Provider>
  );
}

export function useUpdateSubtaskTransition() {
  const context = useContext(UpdateSubtaskTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateSubtaskTransition must be used within a UpdateSubtaskTransitionProvider",
    );
  }
  return context;
}
