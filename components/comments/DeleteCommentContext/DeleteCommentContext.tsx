"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { DeleteEntityContextType } from "@/lib/hooks/useDeleteEntityState";
import { useMemo, useContext, createContext, useActionState } from "react";
import { useRefreshCommentsOnActionSuccess } from "@/lib/hooks/useRefreshCommentsOnActionSuccess";

export const initialState: ActionState = {
  status: null,
};

const DeleteCommentContext =
  createContext<DeleteEntityContextType<number> | null>(null);

interface DeleteCommentProviderProps {
  deleteComment: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeleteCommentProvider({
  deleteComment,
  children,
}: DeleteCommentProviderProps) {
  const [state, action, isPending] = useActionState(
    deleteComment,
    initialState,
  );

  useActionErrorToast(state);
  useRefreshCommentsOnActionSuccess(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return (
    <DeleteCommentContext.Provider value={contextValue}>
      {children}
    </DeleteCommentContext.Provider>
  );
}

export function useDeleteComment() {
  const context = useContext(DeleteCommentContext);
  if (!context)
    throw new Error(
      "useDeleteComment must be used within DeleteCommentProvider",
    );
  return context;
}
