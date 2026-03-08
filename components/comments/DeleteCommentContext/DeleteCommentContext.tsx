"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { useContext, createContext, useEffect } from "react";
import { useRefreshComments } from "@/lib/swr/hooks/useRefreshComments";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const DeleteCommentContext =
  createContext<DeleteEntityContextType<number> | null>(null);

interface DeleteCommentProviderProps {
  deleteComment: ActionFn<ActionState, number>;
  children: React.ReactNode;
}

export function DeleteCommentProvider({
  deleteComment,
  children,
}: DeleteCommentProviderProps) {
  const refreshComments = useRefreshComments();

  const contextValue = useDeleteEntityContextValue(deleteComment);

  const { state } = contextValue;

  useEffect(() => {
    refreshComments();
  }, [state, refreshComments]);

  useShowToastOnActionError(state);

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
