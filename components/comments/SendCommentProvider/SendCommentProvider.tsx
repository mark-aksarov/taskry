"use client";

import { useRouter } from "@/i18n/navigation";
import { SendCommentContext } from "../SendCommentContext";
import { useCommentFormContext } from "../CommentFormContext";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithOnSuccess } from "@/lib/hooks/useActionStateWithOnSuccess";

interface SendCommentProviderProps {
  children: React.ReactNode;
}

export function SendCommentProvider({ children }: SendCommentProviderProps) {
  const router = useRouter();

  const refreshComments = useRefreshComments();
  const { setCommentContent } = useCommentFormContext();

  const contextValue = useActionStateWithOnSuccess(sendComment, async () => {
    // The following lines help keep the UI in sync when refreshing comments.
    await refreshComments();
    setCommentContent("");

    // router.refresh only updates the CommentButton label (comment count) after refresh
    router.refresh();
  });

  useShowToastOnActionError(contextValue.state);

  return (
    <SendCommentContext.Provider value={contextValue}>
      {children}
    </SendCommentContext.Provider>
  );
}
