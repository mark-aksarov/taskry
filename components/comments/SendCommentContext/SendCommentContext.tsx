"use client";

import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useContext, createContext, useActionState, useMemo } from "react";
import { ActionContextType, ActionFn, ActionState } from "@/lib/actions/types";
import { useRefreshCommentsOnActionSuccess } from "@/lib/hooks/useRefreshCommentsOnActionSuccess";
import { useCommentFormResetOnActionSuccess } from "@/lib/hooks/useCommentFormResetOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

const SendCommentContext = createContext<ActionContextType | null>(null);

interface SendCommentProviderProps {
  sendComment: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function SendCommentProvider({
  sendComment,
  children,
}: SendCommentProviderProps) {
  const [state, action, isPending] = useActionState(sendComment, initialState);

  useToastOnActionError(state);
  useRefreshCommentsOnActionSuccess(state);
  useCommentFormResetOnActionSuccess(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return (
    <SendCommentContext.Provider value={contextValue}>
      {children}
    </SendCommentContext.Provider>
  );
}

export function useSendComment() {
  const context = useContext(SendCommentContext);
  if (!context) {
    throw new Error("useSendComment must be used within a SendCommentProvider");
  }
  return context;
}
