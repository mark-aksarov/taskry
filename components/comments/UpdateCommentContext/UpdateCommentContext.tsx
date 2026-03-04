"use client";

import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useContext, createContext, useActionState, useMemo } from "react";
import { ActionContextType, ActionFn, ActionState } from "@/lib/actions/types";
import { useRefreshCommentsOnActionSuccess } from "@/lib/hooks/useRefreshCommentsOnActionSuccess";
import { useCommentFormResetOnActionSuccess } from "@/lib/hooks/useCommentFormResetOnActionSuccess";
import { useClearEditCommentIdOnActionSuccess } from "@/lib/hooks/useClearEditCommentIdOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

const UpdateCommentContext = createContext<ActionContextType | null>(null);

interface UpdateCommentProviderProps {
  updateComment: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function UpdateCommentProvider({
  updateComment,
  children,
}: UpdateCommentProviderProps) {
  const [state, action, isPending] = useActionState(
    updateComment,
    initialState,
  );

  useToastOnActionError(state);
  useRefreshCommentsOnActionSuccess(state);
  useCommentFormResetOnActionSuccess(state);
  useClearEditCommentIdOnActionSuccess(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return (
    <UpdateCommentContext.Provider value={contextValue}>
      {children}
    </UpdateCommentContext.Provider>
  );
}

export function useUpdateComment() {
  const context = useContext(UpdateCommentContext);
  if (!context) {
    throw new Error(
      "useUpdateComment must be used within a UpdateCommentProvider",
    );
  }
  return context;
}
