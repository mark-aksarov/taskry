"use client";

import {
  DeleteEntityContextType,
  useDeleteEntityContextValue,
} from "@/lib/hooks/useDeleteEntityContextValue";

import { useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useToastOnActionError } from "@/lib/hooks/useToastOnActionError";
import { useRefreshCommentsOnActionSuccess } from "@/lib/hooks/useRefreshCommentsOnActionSuccess";

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
  const contextValue = useDeleteEntityContextValue(deleteComment);

  const { state } = contextValue;
  useToastOnActionError(state);
  useRefreshCommentsOnActionSuccess(state);

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
