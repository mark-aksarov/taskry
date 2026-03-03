"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { useContext, createContext, useActionState, useMemo } from "react";
import { useRefreshCommentsOnActionSuccess } from "@/lib/hooks/useRefreshCommentsOnActionSuccess";
import { useCommentFormResetOnActionSuccess } from "@/lib/hooks/useCommentFormResetOnActionSuccess";

export const initialState: ActionState = {
  status: null,
};

export interface SendCommentContextType {
  state: ActionState;
  action: (payload: FormData) => void;
  isPending: boolean;
}

const SendCommentContext = createContext<SendCommentContextType | null>(null);

interface SendCommentProviderProps {
  sendComment: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function SendCommentProvider({
  sendComment,
  children,
}: SendCommentProviderProps) {
  const [state, action, isPending] = useActionState(sendComment, initialState);

  useActionErrorToast(state);
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
