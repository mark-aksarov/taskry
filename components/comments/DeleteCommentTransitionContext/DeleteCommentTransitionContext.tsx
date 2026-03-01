"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface DeleteCommentTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const DeleteCommentTransitionContext =
  createContext<DeleteCommentTransitionContextType | null>(null);

interface DeleteCommentTransitionProviderProps {
  children: React.ReactNode;
}

export function DeleteCommentTransitionProvider({
  children,
}: DeleteCommentTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <DeleteCommentTransitionContext.Provider value={contextValue}>
      {children}
    </DeleteCommentTransitionContext.Provider>
  );
}

export function useDeleteCommentTransition() {
  const context = useContext(DeleteCommentTransitionContext);
  if (!context) {
    throw new Error(
      "useDeleteCommentTransition must be used within a DeleteCommentTransitionProvider",
    );
  }
  return context;
}
