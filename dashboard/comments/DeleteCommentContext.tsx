"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

export const DeleteCommentContext =
  createContext<ActionContextType<number> | null>(null);

interface DeleteCommentProviderProps {
  children: React.ReactNode;
}

export function DeleteCommentProvider({
  children,
}: DeleteCommentProviderProps) {
  const router = useRouter();
  const refreshComments = useRefreshComments();

  const contextValue = useActionStateWithCallbacks(deleteComment, {
    onSuccess: async () => {
      // The following line help keep the UI in sync when refreshing comments.
      await refreshComments();

      // router.refresh only updates the CommentButton label (comment count) after refresh
      router.refresh();
    },
  });

  // wait for transition to finish
  useShowToastOnActionError(contextValue.state);

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
