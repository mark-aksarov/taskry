"use client";

import { useCommentFormContext } from "../CommentFormContext";
import { UpdateCommentContext } from "../UpdateCommentContext";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithOnSuccess } from "@/lib/hooks/useActionStateWithOnSuccess";

interface UpdateCommentProviderProps {
  children: React.ReactNode;
}

export function UpdateCommentProvider({
  children,
}: UpdateCommentProviderProps) {
  const refreshComments = useRefreshComments();
  const { setCommentContent, setEditCommentId } = useCommentFormContext();

  const contextValue = useActionStateWithOnSuccess(updateComment, async () => {
    // The following lines help keep the UI in sync when refreshing comments.
    await refreshComments();
    setCommentContent("");
    setEditCommentId(undefined);
  });

  useShowToastOnActionError(contextValue.state);

  return (
    <UpdateCommentContext.Provider value={contextValue}>
      {children}
    </UpdateCommentContext.Provider>
  );
}
