"use client";

import {
  useMemo,
  useEffect,
  useContext,
  createContext,
  useActionState,
} from "react";

import { useRouter } from "@/i18n/navigation";
import { useCommentFormContext } from "../CommentFormContext";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
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
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await updateComment(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  const refreshComments = useRefreshComments();
  const { setCommentContent, setEditCommentId } = useCommentFormContext();

  useEffect(() => {
    refreshComments();
  }, [state, refreshComments]);

  // Reset comment form
  useEffect(() => {
    setCommentContent("");
    setEditCommentId(undefined);
  }, [state, setCommentContent, setEditCommentId]);

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
