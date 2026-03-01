"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateUserTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateUserTransitionContext =
  createContext<UpdateUserTransitionContextType | null>(null);

interface UpdateUserTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateUserTransitionProvider({
  children,
}: UpdateUserTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateUserTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateUserTransitionContext.Provider>
  );
}

export function useUpdateUserTransition() {
  const context = useContext(UpdateUserTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateUserTransition must be used within a UpdateUserTransitionProvider",
    );
  }
  return context;
}
