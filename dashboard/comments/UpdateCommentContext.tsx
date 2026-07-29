"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { useCommentFormContext } from "./CommentFormContext";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

const UpdateCommentContext = createContext<ActionContextType | null>(null);

interface UpdateCommentProviderProps {
  children: React.ReactNode;
}

export function UpdateCommentProvider({
  children,
}: UpdateCommentProviderProps) {
  const refreshComments = useRefreshComments();
  const { setCommentContent, setEditCommentId } = useCommentFormContext();

  const contextValue = useActionStateWithCallbacks(updateComment, {
    onSuccess: async () => {
      // The following lines help keep the UI in sync when refreshing comments.
      await refreshComments();
      setCommentContent("");
      setEditCommentId(undefined);
    },
  });

  useShowToastOnActionError(contextValue.state);

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
      "useUpdateComment must be used within a UpdateCommentContext.Provider",
    );
  }
  return context;
}
