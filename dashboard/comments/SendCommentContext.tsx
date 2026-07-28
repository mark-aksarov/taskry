"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { useCommentFormContext } from "./CommentFormContext";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const SendCommentContext = createContext<ActionContextType | null>(null);

interface SendCommentProviderProps {
  children: React.ReactNode;
}

export function SendCommentProvider({ children }: SendCommentProviderProps) {
  const router = useRouter();

  const refreshComments = useRefreshComments();
  const { setCommentContent } = useCommentFormContext();

  const contextValue = useActionStateWithCallbacks(sendComment, {
    onSuccess: async () => {
      // The following lines help keep the UI in sync when refreshing comments.
      await refreshComments();
      setCommentContent("");

      // router.refresh only updates the CommentButton label (comment count) after refresh
      router.refresh();
    },
  });

  useShowToastOnActionError(contextValue.state);

  return (
    <SendCommentContext.Provider value={contextValue}>
      {children}
    </SendCommentContext.Provider>
  );
}

export function useSendComment() {
  const context = useContext(SendCommentContext);
  if (!context) {
    throw new Error(
      "useSendComment must be used within a SendCommentContext.Provider",
    );
  }
  return context;
}
