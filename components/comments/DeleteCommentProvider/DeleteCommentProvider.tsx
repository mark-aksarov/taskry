"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteCommentContext } from "../DeleteCommentContext";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithOnSuccess } from "@/lib/hooks/useActionStateWithOnSuccess";

interface DeleteCommentProviderProps {
  children: React.ReactNode;
}

export function DeleteCommentProvider({
  children,
}: DeleteCommentProviderProps) {
  const router = useRouter();
  const refreshComments = useRefreshComments();

  const contextValue = useActionStateWithOnSuccess(deleteComment, async () => {
    // The following line help keep the UI in sync when refreshing comments.
    await refreshComments();

    // router.refresh only updates the CommentButton label (comment count) after refresh
    router.refresh();
  });

  // wait for transition to finish
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteCommentContext.Provider value={contextValue}>
      {children}
    </DeleteCommentContext.Provider>
  );
}
