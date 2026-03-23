"use client";

import { useRouter } from "@/i18n/navigation";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useContext, createContext, useMemo, useActionState } from "react";
import { ActionContextType, ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

export const initialState: ActionState = {
  status: null,
};

const DeleteCommentContext = createContext<ActionContextType<number> | null>(
  null,
);

interface DeleteCommentProviderProps {
  deleteComment: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeleteCommentProvider({
  deleteComment,
  children,
}: DeleteCommentProviderProps) {
  const router = useRouter();
  const refreshComments = useRefreshComments();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: number) => {
      const newState = await deleteComment(state, payload);

      if (newState.status === "success") {
        // The following line isn't marked as transitions
        await refreshComments();

        // router.refresh is wrapped in startTransition internally
        // router.refresh only updates the CommentButton label (comment count) after refresh
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // wait for transition to finish
  useShowToastOnActionError(state);

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
