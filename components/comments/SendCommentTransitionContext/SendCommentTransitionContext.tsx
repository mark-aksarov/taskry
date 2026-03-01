"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
} from "react";

interface SendCommentTransitionContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

const SendCommentTransitionContext =
  createContext<SendCommentTransitionContextType | null>(null);

interface SendCommentTransitionProviderProps {
  children: React.ReactNode;
}

export function SendCommentTransitionProvider({
  children,
}: SendCommentTransitionProviderProps) {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <SendCommentTransitionContext.Provider value={contextValue}>
      {children}
    </SendCommentTransitionContext.Provider>
  );
}

export function useSendCommentTransition() {
  const context = useContext(SendCommentTransitionContext);
  if (!context) {
    throw new Error(
      "useSendCommentTransition must be used within a SendCommentTransitionProvider",
    );
  }
  return context;
}
