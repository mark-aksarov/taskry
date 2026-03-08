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

const SendCommentContext = createContext<ActionContextType | null>(null);

interface SendCommentProviderProps {
  sendComment: ActionFn<ActionState, FormData>;
  children: React.ReactNode;
}

export function SendCommentProvider({
  sendComment,
  children,
}: SendCommentProviderProps) {
  const router = useRouter();

  const refreshComments = useRefreshComments();
  const { setCommentContent } = useCommentFormContext();

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: FormData) => {
      const newState = await sendComment(state, payload);

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  useEffect(() => {
    refreshComments();
  }, [state, refreshComments]);

  useEffect(() => {
    setCommentContent("");
  }, [state, setCommentContent]);

  useShowToastOnActionError(state);

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
