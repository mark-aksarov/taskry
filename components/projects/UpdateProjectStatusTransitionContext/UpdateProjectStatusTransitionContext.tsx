"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface UpdateProjectStatusTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const UpdateProjectStatusTransitionContext =
  createContext<UpdateProjectStatusTransitionContextType | null>(null);

interface UpdateProjectStatusTransitionProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusTransitionProvider({
  children,
}: UpdateProjectStatusTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <UpdateProjectStatusTransitionContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusTransitionContext.Provider>
  );
}

export function useUpdateProjectStatusTransition() {
  const context = useContext(UpdateProjectStatusTransitionContext);
  if (!context) {
    throw new Error(
      "useUpdateProjectStatusTransition must be used within a UpdateProjectStatusTransitionProvider",
    );
  }
  return context;
}
