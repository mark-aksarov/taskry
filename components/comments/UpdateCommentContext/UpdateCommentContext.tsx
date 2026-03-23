"use client";

import { useCommentFormContext } from "../CommentFormContext";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useMemo, useContext, createContext, useActionState } from "react";
import { ActionContextType, ActionFn, ActionState } from "@/lib/actions/types";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

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
  const refreshComments = useRefreshComments();
  const { setCommentContent, setEditCommentId } = useCommentFormContext();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await updateComment(state, payload);

      if (newState.status === "success") {
        // The following lines aren't marked as transitions
        // they help keep the UI in sync when refreshing comments.
        await refreshComments();
        setCommentContent("");
        setEditCommentId(undefined);
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
