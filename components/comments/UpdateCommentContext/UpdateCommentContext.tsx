"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { useContext, createContext, useActionState, useMemo } from "react";
import { useRefreshCommentsOnActionSuccess } from "@/lib/hooks/useRefreshCommentsOnActionSuccess";
import { useCommentFormResetOnActionSuccess } from "@/lib/hooks/useCommentFormResetOnActionSuccess";
import { useClearEditCommentIdOnActionSuccess } from "@/lib/hooks/useClearEditCommentIdOnActionSuccess";

export const initialState: ActionState = {
  status: null,
};

export interface UpdateCommentContextType {
  state: ActionState;
  action: (payload: FormData) => void;
  isPending: boolean;
}

const UpdateCommentContext = createContext<UpdateCommentContextType | null>(
  null,
);

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

  useActionErrorToast(state);
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
